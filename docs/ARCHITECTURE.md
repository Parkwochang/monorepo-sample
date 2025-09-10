# Next.js Monorepo Architecture Guide

## 목차

- [폴더 구조](#폴더-구조)
- [도메인 중심 설계](#도메인-중심-설계)
- [패키지 구성](#패키지-구성)
- [Server Actions 관리](#server-actions-관리)
- [개발 가이드라인](#개발-가이드라인)

## 폴더 구조

```typescript
selling-fe/
├── apps/
│   ├── must-fe/                    // 사용자용 웹 앱
│   │   ├── src/
│   │   │   ├── app/               // Next.js 라우팅
│   │   │   ├── domains/          // 도메인별 로직
│   │   │   ├── shared/           // 앱 내 공유 로직
│   │   │   └── providers/        // 앱 레벨 프로바이더
│   │   ├── public/
│   │   └── package.json
│   └── must-admin/               // 관리자용 웹 앱
│
├── packages/
│   ├── core/                     // 핵심 공통 모듈
│   │   ├── src/
│   │   │   ├── config/          // 공통 설정
│   │   │   ├── schema/         // 공통 타입/인터페이스
│   │   │   └── lib/           // 유틸리티 함수
│   │   └── package.json
│   │
│   ├── ui/                     // 공통 UI 컴포넌트
│   │   ├── src/
│   │   │   ├── components/    // 순수 UI 컴포넌트
│   │   │   ├── hooks/        // UI 관련 훅
│   │   │   └── styles/       // 공통 스타일
│   │   └── package.json
│   │
│   ├── http/                  // API 통신 모듈
│   │   ├── src/
│   │   │   ├── apis/         // 도메인별 API
│   │   │   └── lib/         // HTTP 클라이언트 설정
│   │   └── package.json
│   │
│   ├── utils/                // 순수 유틸리티
│   │   ├── src/
│   │   │   ├── format/      // 포맷팅 유틸
│   │   │   ├── storage/     // 스토리지 유틸
│   │   │   └── log/         // 로깅 유틸
│   │   └── package.json
│   │
│   └── date/                // 날짜 관련 유틸리티
│       ├── src/
│       │   ├── format.ts
│       │   └── utils.ts
│       └── package.json
```

## 도메인 중심 설계

### 도메인 구조

```typescript
src/domains/mission/
├── components/              // UI 컴포넌트
│   ├── screens/            // 페이지 레벨 컴포넌트
│   ├── mission-form/       // 개별 컴포넌트
│   └── mission-list/
├── hooks/                  // 상태 관리 훅
├── services/              // 비즈니스 로직
│   ├── mission.server.ts  // 서버 사이드 로직
│   └── mission.client.ts  // 클라이언트 사이드 로직
└── types/                // 타입 정의
```

### 컴포넌트 구성 예시

```typescript
// domains/mission/components/screens/mission-screen.tsx
export function MissionScreen() {
  return (
    <div className="mission-screen">
      <h1>미션 관리</h1>
      <MissionForm />
      <MissionList />
    </div>
  );
}

// app/mission/page.tsx
import { MissionScreen } from '@/domains/mission/components/screens';

export default function MissionPage() {
  return <MissionScreen />;
}
```

## 패키지 구성

### Core 패키지

- 공통 설정
- 타입 정의
- 유틸리티 함수

### UI 패키지

- 순수 UI 컴포넌트
- UI 관련 훅
- 스타일 시스템

### HTTP 패키지

- API 클라이언트
- API 엔드포인트 정의
- 응답 타입 정의

### Utils 패키지

- 순수 유틸리티 함수
- 포맷팅
- 로깅

## Server Actions 관리

### 구조

```typescript
src/
├── app/
│   └── mission/
│       ├── actions.ts     // Server Actions 정의
│       └── page.tsx
│
├── domains/
│   └── mission/
│       ├── services/
│       │   ├── mission.server.ts   // 서버 사이드 로직
│       │   └── mission.client.ts   // 클라이언트 사이드 로직
│       └── components/
```

### 구현 예시

```typescript
// app/mission/actions.ts
'use server';

import { missionService } from '@/domains/mission/services/mission.server';

export async function createMission(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const result = await missionService.createMission({ title });
    revalidatePath('/mission');
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## 개발 가이드라인

### 1. 도메인 분리 원칙

- 각 도메인은 독립적으로 동작
- 도메인 간 의존성 최소화
- 공통 로직은 shared 폴더로 분리

### 2. 컴포넌트 설계

- Screens: 페이지 레벨 컴포넌트
- Features: 도메인별 기능 컴포넌트
- UI: 순수 UI 컴포넌트

### 3. 상태 관리

- 서버 상태: React Query
- 클라이언트 상태: 로컬 상태 또는 Context
- 도메인별 상태 격리

### 4. 테스트 전략

```typescript
domains/mission/
├── __tests__/
│   ├── components/
│   ├── services/
│   └── hooks/
└── ...
```

### 5. 성능 최적화

- 컴포넌트 분할
- 서버 컴포넌트 활용
- 적절한 캐싱 전략

## 결론

이 아키텍처는 다음과 같은 이점을 제공합니다:

1. **확장성**

   - 새로운 도메인/기능 추가가 용이
   - 패키지 단위의 독립적인 버전 관리

2. **유지보수성**

   - 명확한 코드 구조
   - 도메인별 독립적인 개발
   - 테스트 용이성

3. **개발 생산성**
   - 직관적인 폴더 구조
   - 코드 재사용성
   - 명확한 책임 분리
