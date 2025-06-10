# 대경하드웨어 웹사이트 배포 가이드

## 🚀 빠른 시작

### 1. 프로젝트 클론
```bash
git clone <YOUR_REPOSITORY_URL>
cd home
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 값들을 설정하세요
```

### 4. 데이터베이스 설정
```bash
npx prisma generate
npx prisma db push
npm run seed
```

### 5. 개발 서버 실행
```bash
npm run dev
```

## 🏗️ 프로덕션 빌드

### 로컬에서 프로덕션 빌드 테스트
```bash
npm run build
npm start
```

## 🌐 배포 옵션

### Option 1: Vercel 배포 (추천)
1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에 접속
3. "New Project" → GitHub 리포지토리 선택
4. 환경 변수 설정:
   - `DATABASE_URL`: `file:./prod.db`
   - `NEXTAUTH_SECRET`: 랜덤 문자열
   - `NEXTAUTH_URL`: 배포된 도메인 URL

### Option 2: Netlify 배포
1. GitHub에 코드 푸시
2. [Netlify](https://netlify.com)에 접속
3. "New site from Git" → GitHub 리포지토리 선택
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: 자체 서버 배포
```bash
# 서버에서 실행
git clone <YOUR_REPOSITORY_URL>
cd home
npm install
npm run build

# PM2로 프로세스 관리
npm install -g pm2
pm2 start npm --name "daekyung-web" -- start
pm2 save
pm2 startup
```

## 🔧 환경 변수

프로덕션 환경에서 설정해야 할 환경 변수:

```env
DATABASE_URL="file:./prod.db"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

## 📁 프로젝트 구조

```
home/
├── prisma/              # 데이터베이스 스키마 및 마이그레이션
├── public/              # 정적 파일 (이미지, 아이콘 등)
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트
│   ├── pages/          # Next.js 페이지
│   ├── styles/         # CSS 스타일
│   └── lib/           # 유틸리티 함수
├── scripts/           # 데이터베이스 시드 스크립트
└── package.json      # 프로젝트 설정
```

## 🔑 관리자 기능

### 기본 관리자 계정
- 이메일: `admin@daekyung.com`
- 비밀번호: `admin123`

### 관리자 페이지
- `/admin/login` - 관리자 로그인
- `/admin` - 대시보드
- `/admin/menus` - 메뉴 관리
- `/admin/products` - 상품 관리
- `/admin/products/categories` - 카테고리 관리
- `/admin/pages` - 페이지 관리
- `/admin/board/qna` - QnA 관리
- `/admin/board/manage` - 게시판 관리
- `/admin/settings/hero` - 히어로 섹션 설정

## 🎨 주요 기능

### 사용자 페이지
- **홈페이지** (`/`) - 메인 페이지
- **회사소개** (`/company`) - 회사 정보
- **제품소개** (`/products`) - 제품 카탈로그
- **찾아오는길** (`/location`) - 위치 정보
- **인증서** (`/certification`) - 인증서 목록
- **문의하기** (`/inquiry`) - 문의 폼

### 관리 기능
- 드래그 앤 드롭 메뉴 관리
- 계층구조 상품 카테고리
- 히어로 섹션 배경 이미지 변경
- QnA 답변 관리
- 게시판 관리 (공지사항, 뉴스, 이벤트)

## 🗃️ 데이터베이스

SQLite 데이터베이스를 사용하며 다음 테이블을 포함:
- `User` - 사용자 정보
- `Menu` - 메뉴 구조
- `Page` - 페이지 내용
- `ProductCategory` - 상품 카테고리
- `Product` - 상품 정보
- `HeroSlide` - 히어로 슬라이드
- `SiteConfig` - 사이트 설정

## 🛠️ 개발 명령어

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run seed         # 데이터베이스 시드 데이터 삽입
npx prisma studio    # 데이터베이스 GUI 도구
npx prisma generate  # Prisma 클라이언트 생성
```

## 🔒 보안 고려사항

1. **프로덕션 배포 전 체크리스트:**
   - [ ] 관리자 비밀번호 변경
   - [ ] `NEXTAUTH_SECRET` 환경 변수 설정
   - [ ] HTTPS 설정
   - [ ] 데이터베이스 백업 계획
   - [ ] 로그 모니터링 설정

2. **권장사항:**
   - 정기적인 데이터베이스 백업
   - SSL 인증서 설정
   - CDN 사용 (이미지 최적화)
   - 모니터링 도구 설정

## 🐛 문제 해결

### 빌드 오류 해결
```bash
# TypeScript 오류 확인
npm run build

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 데이터베이스 오류 해결
```bash
# 데이터베이스 재생성
rm prisma/dev.db
npx prisma db push
npm run seed
```

## 📞 지원

문제가 발생하거나 도움이 필요한 경우:
1. GitHub Issues 생성
2. 개발 문서 확인
3. 로그 파일 검토

---

**개발자:** Claude Code Assistant  
**프로젝트:** 대경하드웨어 웹사이트  
**기술스택:** Next.js, TypeScript, Prisma, SQLite, Bootstrap