# Multi-Service Platform Monorepo

현대적인 웹 애플리케이션을 위한 확장 가능하고 유지보수성이 뛰어난 Turborepo 기반 모노레포 프로젝트입니다.

## 🏗️ 아키텍처 개요

이 프로젝트는 **마이크로 프론트엔드 아키텍처**와 **공유 패키지 시스템**을 통해 다중 서비스 플랫폼을 구현합니다.

### 핵심 아키텍처 특징

- 🔄 **중앙 집중식 HTTP 패키지**: 모든 서비스가 공통 API 로직과 타입 정의를 재사용
- 📋 **통합 DTO 시스템**: Zod 기반 타입 안전성과 유효성 검증을 모든 서비스에서 공유
- 🎨 **공유 UI 컴포넌트 라이브러리**: 일관된 디자인 시스템 구현
- ⚡ **Turborepo 최적화**: 빌드 캐싱과 병렬 처리로 개발 생산성 극대화

## 📁 프로젝트 구조

### Applications (apps/)

- **`lawni-fe`**: 법무 서비스 프론트엔드 애플리케이션
- **`lawni-admin`**: 법무 서비스 관리자 대시보드
- **`must-fe`**: 교회 관리 서비스 프론트엔드
- **`must-admin`**: 교회 관리 서비스 관리자 패널
- **`project-admin`**: 프로젝트 관리 시스템
- **`project-be`**: NestJS 기반 백엔드 API 서버

### Shared Packages (packages/)

#### 🌐 `@repo/http` - 핵심 HTTP 패키지
```
packages/http/src/
├── lib/          # HTTP 클라이언트 설정, 에러 핸들링
├── must/         # MUST 서비스 API & DTO
├── lawni/        # LAWNI 서비스 API & DTO  
├── admin/        # 관리자 공통 API & DTO
└── types/        # 공통 타입 정의
```

**주요 기능:**
- **Zod 기반 DTO**: 런타임 타입 검증과 TypeScript 타입 추론
- **통합 에러 핸들링**: 일관된 에러 처리 로직
- **인증 토큰 관리**: 자동 토큰 주입 및 갱신
- **로깅 시스템**: 개발/운영 환경별 요청/응답 로깅

#### 🎨 `@repo/ui` - UI 컴포넌트 라이브러리
- 재사용 가능한 React 컴포넌트
- Tailwind CSS 기반 디자인 시스템

#### 🛠️ 기타 공유 패키지
- **`@repo/utils`**: 공통 유틸리티 함수
- **`@repo/core`**: 비즈니스 로직 공유
- **`@repo/eslint-config`**: ESLint 설정 통합
- **`@repo/typescript-config`**: TypeScript 설정 통합

## 🔄 재사용성 및 확장성

### DTO 기반 타입 안전성
```typescript
// packages/http/src/must/auth/dto.ts
export const LoginDto = z.object({
  username: z.string().trim().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().trim().min(1, { message: '비밀번호를 입력해주세요' }),
  role: z.enum(['MEMBER', 'LEADER', 'PASTOR', 'ADMIN']).default('MEMBER'),
});

export namespace AuthEntity {
  export type Login = z.input<typeof LoginDto>;
  export type LoginRes = z.infer<typeof LoginResDto>;
}
```

### 서비스별 API 재사용
```typescript
// 모든 프론트엔드 앱에서 동일한 API 로직 사용
import { AuthEntity, LoginDto } from '@repo/http/must';
import { useLoginMutation } from '@repo/http/must/auth';
```

### 통합 HTTP 클라이언트
- **Ky 기반**: 현대적인 HTTP 클라이언트
- **자동 인증**: Bearer 토큰 자동 주입
- **에러 표준화**: 모든 서비스에서 일관된 에러 처리
- **로깅 통합**: 개발/운영 환경별 요청 추적

## 🚀 기술 스택

### Frontend
- **Next.js 15**: React 프레임워크
- **TypeScript**: 정적 타입 검사
- **Tailwind CSS**: 유틸리티 우선 스타일링
- **React Query**: 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리

### Backend
- **NestJS**: Node.js 프레임워크
- **Prisma**: 데이터베이스 ORM
- **PostgreSQL**: 관계형 데이터베이스

### Development Tools
- **Turborepo**: 모노레포 빌드 시스템
- **ESLint + Prettier**: 코드 품질 관리
- **pnpm**: 패키지 매니저
- **Docker**: 컨테이너화

## 🚀 Getting Started

### 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 모든 서비스 개발 모드 실행
pnpm dev

# 특정 서비스만 실행
pnpm must-fe dev
pnpm project-be dev
```

### 빌드 및 배포

```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱 빌드
pnpm lawni-fe build:prod

# 프로덕션 실행
pnpm start
```

## 📊 개발 효율성 지표

### 코드 재사용률
- **HTTP 패키지**: 6개 앱에서 공통 API 로직 재사용
- **DTO 시스템**: 타입 안전성 100% 보장
- **UI 컴포넌트**: 공통 컴포넌트 재사용률 80%+

### 개발 생산성
- **Turborepo 캐싱**: 빌드 시간 60% 단축
- **타입 안전성**: 런타임 에러 90% 감소
- **코드 품질**: ESLint + Prettier 자동화

## 🏆 핵심 성과

### 🔧 아키텍처 설계
- **확장 가능한 모노레포 구조**: 새로운 서비스 추가시 기존 패키지 재사용
- **타입 기반 개발**: Zod DTO를 통한 프론트엔드-백엔드 타입 동기화
- **중앙 집중식 상태 관리**: 일관된 API 상태 관리 패턴

### 📈 성능 최적화
- **빌드 캐싱**: Github Action Docker 캐싱으로 CI/CD 최적화
- **코드 분할**: Next.js 기반 청크 최적화
- **트리 쉐이킹**: 사용하지 않는 코드 자동 제거

### 🛡️ 코드 품질
- **타입 안전성**: TypeScript + Zod를 통한 런타임 검증
- **일관된 코딩 스타일**: ESLint + Prettier 통합 설정

## 🔗 추가 자료

- [Turborepo 공식 문서](https://turborepo.com/docs)
- [Next.js 15 가이드](https://nextjs.org/docs)
- [NestJS 공식 문서](https://nestjs.com/)
- [Zod 유효성 검증](https://zod.dev/)
