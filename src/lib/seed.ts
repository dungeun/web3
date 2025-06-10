import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 관리자 계정 생성
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@daekyung.com' },
    update: {},
    create: {
      email: 'admin@daekyung.com',
      password: hashedPassword,
      name: '관리자',
      role: 'admin'
    }
  })

  // 게시판 카테고리 생성
  const boardCategories = [
    { slug: 'notice', name: '공지사항', description: '대경하드웨어의 중요한 공지사항입니다.' },
    { slug: 'news', name: '뉴스 & 소식', description: '업계 동향과 회사 소식을 전해드립니다.' },
    { slug: 'qna', name: 'Q&A', description: '궁금한 점을 문의하고 답변을 받아보세요.' },
    { slug: 'review', name: '고객 후기', description: '고객님들의 소중한 후기입니다.' }
  ]

  for (const category of boardCategories) {
    await prisma.boardCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  // 갤러리 카테고리 생성
  const galleryCategories = [
    { slug: 'product', name: '제품 갤러리', description: '대경하드웨어의 다양한 제품 이미지' },
    { slug: 'portfolio', name: '포트폴리오', description: '프로젝트 및 시공 사례' },
    { slug: 'event', name: '이벤트 갤러리', description: '행사 및 이벤트 사진' }
  ]

  for (const category of galleryCategories) {
    await prisma.galleryCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  // 사이트 설정 초기값
  const siteConfigs = [
    { key: 'site_name', value: '대경하드웨어', description: '사이트 이름' },
    { key: 'site_description', value: '하드웨어 소재 전문기업', description: '사이트 설명' },
    { key: 'contact_email', value: 'dkhw6789@naver.com', description: '대표 이메일' },
    { key: 'contact_phone', value: '055-333-6790~1', description: '대표 전화번호' },
    { key: 'contact_address', value: '경남 김해시 삼안로 112번길 9-14', description: '회사 주소' }
  ]

  for (const config of siteConfigs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config
    })
  }

  // 페이지 콘텐츠 초기값
  const homePageContent = {
    heroTitle: '대한민국 대표 하드웨어 소재 전문기업',
    heroSubtitle: '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.',
    aboutTitle: '대경하드웨어 소개',
    aboutContent: `대경하드웨어는 1990년 설립 이래 30년 이상의 역사를 가진 하드웨어 소재 전문기업으로, 
다양한 산업 분야에 고품질의 하드웨어 소재를 공급하고 있습니다.

우리 회사는 지속적인 연구개발과 품질 향상을 통해 국내외 시장에서 인정받는 기업으로 성장했으며,
다양한 인증과 특허를 보유하고 있습니다.`,
    productsTitle: '제품 카테고리',
    productsSubtitle: '대경하드웨어는 다양한 산업 분야에 적용 가능한 고품질 하드웨어 소재를 제공합니다.',
    ctaTitle: '하드웨어 소재에 관한 문의가 있으신가요?',
    ctaSubtitle: '대경하드웨어의 전문가들이 고객님에게 최적화된 하드웨어 소재를 제안해 드립니다.'
  }

  await prisma.pageContent.upsert({
    where: { pageId: 'home' },
    update: {},
    create: {
      pageId: 'home',
      title: '홈페이지',
      content: JSON.stringify(homePageContent),
      metadata: JSON.stringify({
        title: '대경하드웨어 - 하드웨어 소재 전문기업',
        description: '30년 전통의 하드웨어 소재 전문기업 대경하드웨어',
        keywords: '하드웨어, 힌지, 핸들, 락커, 패스너'
      })
    }
  })

  // 상품 카테고리 생성
  const productCategories = [
    { code: 'A', name: 'Handlelocker & Fasterner', description: '다양한 용도에 맞는 핸들록커와 패스너 제품' },
    { code: 'B', name: 'Hinge', description: '고품질 힌지 제품으로 내구성과 안정성을 갖춤' },
    { code: 'C', name: 'Clip & Latch', description: '안정적인 클립과 래치 제품' },
    { code: 'G', name: 'Rubber & Seals', description: '다양한 용도에 맞는 고무 및 실 제품' },
    { code: 'H', name: 'Handle & Grip', description: '인체공학적 디자인의 핸들과 그립' },
    { code: 'S', name: 'Stay & Sliderail', description: '스테이와 슬라이드레일 제품' }
  ]

  for (const [index, category] of productCategories.entries()) {
    await prisma.productCategory.upsert({
      where: { code: category.code },
      update: {},
      create: {
        ...category,
        orderIndex: index
      }
    })
  }

  // 기본 메뉴 생성
  const menus = [
    { title: '홈', path: '/', orderIndex: 0 },
    { title: '회사소개', path: '/company', orderIndex: 1 },
    { title: '제품소개', path: '/products', orderIndex: 2 },
    { title: '인증정보', path: '/certification', orderIndex: 3 },
    { title: '견적문의', path: '/inquiry', orderIndex: 4 },
    { title: '커뮤니티', path: '/board', orderIndex: 5 },
    { title: '갤러리', path: '/gallery', orderIndex: 6 }
  ]

  // 먼저 기존 메뉴를 삭제
  await prisma.menu.deleteMany({})
  
  // 새로운 메뉴 생성
  for (const menu of menus) {
    await prisma.menu.create({
      data: menu
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })