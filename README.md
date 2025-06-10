# 대경하드웨어 React 홈페이지

## 개요
기존 PHP 기반 대경하드웨어 웹사이트를 React/Next.js로 리팩토링한 프로젝트입니다.

## 기술 스택
- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: React Bootstrap
- **Styling**: CSS, Bootstrap 5
- **Icons**: Font Awesome
- **Animation**: AOS (Animate On Scroll)

## 프로젝트 구조
```
home/
├── public/
│   └── images/         # 이미지 파일
├── src/
│   ├── components/     # React 컴포넌트
│   │   └── Layout/    # 레이아웃 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── styles/        # 스타일 파일
│   ├── utils/         # 유틸리티 함수
│   ├── hooks/         # 커스텀 훅
│   ├── contexts/      # Context API
│   └── types/         # TypeScript 타입 정의
├── package.json
├── tsconfig.json
└── next.config.js
```

## 설치 및 실행

### 설치
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

### 프로덕션 빌드
```bash
npm run build
npm run start
```

## 주요 기능
- 반응형 디자인
- 다국어 지원 준비
- SEO 최적화
- 이미지 최적화
- 모듈 기반 아키텍처

## 페이지 구성
- **홈** (`/`): 메인 페이지
- **회사소개** (`/company`): 회사 개요 및 인사말
- **제품소개** (`/products`): 제품 카테고리 및 상세
- **인증정보** (`/certification`): 인증 및 특허 정보
- **견적문의** (`/inquiry`): 문의 및 견적 요청
- **오시는 길** (`/location`): 위치 및 연락처

## 모듈 통합 (예정)
- `customer-reviews`: 게시판/리뷰 시스템
- `ui-carousel`: 이미지 슬라이더
- `ui-tables`: 데이터 테이블
- `product-grid`: 제품 그리드
- `slide-banner`: 배너 관리
- `product-image-auto`: 이미지 자동 관리

## 개발 가이드

### 새 페이지 추가
1. `src/pages/` 디렉토리에 새 파일 생성
2. Layout 컴포넌트로 감싸서 일관된 레이아웃 유지
3. 필요한 경우 PageHeader 표시

### 컴포넌트 작성 규칙
- TypeScript 사용
- 함수형 컴포넌트 사용
- Props 타입 정의
- 컴포넌트 단위 테스트 작성 권장

## 배포
Next.js 애플리케이션은 Vercel, Netlify, AWS Amplify 등 다양한 플랫폼에 배포 가능합니다.

## 라이선스
Copyright © 2024 대경하드웨어. All rights reserved.