# 쿠버네티스 배포 관리 가이드

## 1. 배포 도구 비교

### 1.1 Portainer

- **장점**:
  - 간단한 UI
  - 쉬운 설정
  - 직관적인 컨테이너 관리
  - 이미지 태그 선택 가능
- **단점**:
  - GitOps 기능 제한적
  - 배포 이력 관리 제한적
  - 롤백이 상대적으로 불편
  - 실행 중인 파드의 이미지 태그 변경 기능 없음

### 1.2 Rancher

- **장점**:
  - 강력한 UI
  - 다양한 클러스터 관리 기능
  - 이미지 레지스트리 통합
  - 권한 관리 기능
  - 실행 중인 워크로드의 이미지 태그 변경 가능
- **단점**:
  - 상대적으로 무거움
  - 학습 곡선이 있음

### 1.3 ArgoCD

- **장점**:
  - GitOps 기반 관리
  - 배포 이력 관리
  - 롤백 용이
  - 자동화된 이미지 업데이트
  - 환경별 설정 관리
- **단점**:
  - 초기 설정이 복잡
  - Git 레포지토리 필요
  - 학습 곡선이 있음

## 2. 클러스터 내부 통신

### 2.1 서비스 접근 방법

1. **서비스 이름을 사용한 DNS 방식 (권장)**:

   - 형식: `<서비스이름>.<네임스페이스>.svc.cluster.local`
   - 예시: `must-be.dev.svc.cluster.local`

2. **ClusterIP 직접 사용**:
   - 예시: `10.100.68.235:8080`

### 2.2 장점

- IP 주소가 변경되어도 서비스 이름은 유지
- 쿠버네티스의 자동 DNS 해결 기능 활용
- 가독성이 좋고 관리가 쉬움

## 3. ArgoCD 설정 가이드

### 3.1 프로젝트 구조

```
k8s-manifests/
├── argocd/                      # ArgoCD 관련 설정
│   ├── applications/            # 애플리케이션 정의
│   │   └── must-fe.yaml        # must-fe 애플리케이션 설정
│   └── projects/               # ArgoCD 프로젝트 설정
│       └── must.yaml
├── base/                        # 기본 k8s 리소스
│   └── must-fe/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── ingress.yaml
└── overlays/                    # 환경별 설정
    ├── dev/
    │   └── must-fe/
    │       └── kustomization.yaml
    └── prod/
        └── must-fe/
            └── kustomization.yaml
```

### 3.2 기본 매니페스트 설정

#### Deployment (base/must-fe/deployment.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: must-fe
  namespace: dev
  labels:
    app: must-fe
spec:
  replicas: 2
  selector:
    matchLabels:
      app: must-fe
  template:
    metadata:
      labels:
        app: must-fe
    spec:
      containers:
        - name: must-fe
          image: harbor.woostack.dev/must/fe:latest
          ports:
            - containerPort: 3000
```

#### Service (base/must-fe/service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: must-fe-service
  namespace: dev
  labels:
    app: must-fe
spec:
  type: ClusterIP
  ports:
    - port: 3000
      targetPort: 3000
      protocol: TCP
  selector:
    app: must-fe
```

#### Ingress (base/must-fe/ingress.yaml)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: must-ingress
  namespace: dev
  annotations:
    kubernetes.io/ingress.class: 'nginx'
    cert-manager.io/cluster-issuer: 'letsencrypt-prod'
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
spec:
  rules:
    - host: must.woostack.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: must-fe-service
                port:
                  number: 3000
  tls:
    - hosts:
        - must.woostack.dev
      secretName: must-tls-secret
```

### 3.3 ArgoCD 설치 및 설정

#### 설치

```bash
# ArgoCD 네임스페이스 생성
kubectl create namespace argocd

# ArgoCD 설치
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Image Updater 설치
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml
```

#### Harbor 레지스트리 인증 설정 (argocd/secret.yaml)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: harbor-credentials
  namespace: argocd
type: Opaque
data:
  username: <base64_encoded_username>
  password: <base64_encoded_password>
```

#### Application 설정 (argocd/applications/must-fe.yaml)

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: must-fe
  namespace: argocd
  annotations:
    argocd-image-updater.argoproj.io/image-list: must-fe=harbor.woostack.dev/must/fe
    argocd-image-updater.argoproj.io/must-fe.allow-tags: regexp:^v\d+\.\d+\.\d+$
    argocd-image-updater.argoproj.io/must-fe.update-strategy: semver
    argocd-image-updater.argoproj.io/must-fe.pull-secret: harbor-credentials
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/k8s-manifests.git
    path: overlays/dev/must-fe
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    namespace: dev
```

### 3.4 이미지 업데이트 설정

#### 태그 필터링

```yaml
# 시맨틱 버전 태그 (v1.2.3)
argocd-image-updater.argoproj.io/must-fe.allow-tags: regexp:^v\d+\.\d+\.\d+$

# 날짜 기반 태그 (20240314)
argocd-image-updater.argoproj.io/must-fe.allow-tags: regexp:^\d{8}$

# 특정 접두사
argocd-image-updater.argoproj.io/must-fe.allow-tags: regexp:^prod-.*
```

#### 업데이트 전략

```yaml
# 시맨틱 버전
argocd-image-updater.argoproj.io/must-fe.update-strategy: semver

# 알파벳/숫자 순서
argocd-image-updater.argoproj.io/must-fe.update-strategy: alphabetical

# 타임스탬프
argocd-image-updater.argoproj.io/must-fe.update-strategy: newest
```

## 4. 주의사항 및 팁

1. 태그 필터링 규칙을 신중하게 설정
2. 테스트 환경에서 먼저 검증
3. 중요 환경에서는 수동 승인 단계 추가 고려
4. 정기적인 백업 설정
5. 접근 권한 관리 설정
6. Git 레포지토리 관리 전략 수립

## 5. 참고 사항

- ArgoCD UI: `https://argocd.your-domain.com`
- 기본 계정: admin
- 초기 비밀번호 확인:
  ```bash
  kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
  ```

## 6. 문제 해결

1. **이미지 업데이트 안 될 때**:

   - 레지스트리 인증 확인
   - 태그 필터링 규칙 확인
   - 로그 확인: `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater`

2. **배포 실패 시**:
   - ArgoCD UI에서 상태 확인
   - 애플리케이션 로그 확인
   - Git 레포지토리 상태 확인
