import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// 이미지 폴더 스캔 함수
function scanImageFolder(folderPath: string): string[] {
  try {
    const files = fs.readdirSync(folderPath)
    return files.filter(file => file.endsWith('.webp'))
  } catch (error) {
    console.log(`폴더를 찾을 수 없습니다: ${folderPath}`)
    return []
  }
}

async function main() {
  console.log('🌱 완전한 데이터베이스 시딩 시작...')

  // 1. 관리자 계정 생성
  console.log('\n👤 관리자 계정 생성...')
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
  console.log('✅ 관리자 계정:', admin.email)

  // 2. 사이트 설정
  console.log('\n⚙️ 사이트 설정 생성...')
  const configs = [
    { key: 'siteName', value: '대경하드웨어', description: '사이트명' },
    { key: 'siteDescription', value: '하드웨어 소재 전문기업', description: '사이트 설명' },
    { key: 'contactEmail', value: 'dkhw6789@naver.com', description: '연락처 이메일' },
    { key: 'contactPhone', value: '055-333-6790~1', description: '연락처 전화번호' },
    { key: 'contactAddress', value: '경남 김해시 삼안로 112번길 9-14', description: '회사 주소' },
    { key: 'heroType', value: 'slides', description: '히어로 섹션 타입' },
    { key: 'heroTitle', value: '대한민국 대표 하드웨어 소재 전문기업', description: '히어로 타이틀' },
    { key: 'heroSubtitle', value: '30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다', description: '히어로 서브타이틀' }
  ]

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config
    })
  }
  console.log('✅ 사이트 설정 완료')

  // 3. 게시판 카테고리
  console.log('\n📋 게시판 카테고리 생성...')
  const boardCategories = [
    { slug: 'notice', name: '공지사항', description: '중요한 공지사항', orderIndex: 1 },
    { slug: 'news', name: '뉴스 & 소식', description: '업계 동향과 회사 소식', orderIndex: 2 },
    { slug: 'qna', name: 'Q&A', description: '궁금한 점을 문의하세요', orderIndex: 3 },
    { slug: 'review', name: '고객 후기', description: '고객님들의 소중한 후기', orderIndex: 4 }
  ]

  for (const category of boardCategories) {
    await prisma.boardCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }
  console.log('✅ 게시판 카테고리 완료')

  // 4. 갤러리 카테고리
  console.log('\n🖼️ 갤러리 카테고리 생성...')
  const galleryCategories = [
    { slug: 'product', name: '제품 갤러리', description: '다양한 제품 이미지', orderIndex: 1 },
    { slug: 'portfolio', name: '포트폴리오', description: '프로젝트 및 시공 사례', orderIndex: 2 },
    { slug: 'event', name: '이벤트', description: '행사 및 이벤트 사진', orderIndex: 3 }
  ]

  for (const category of galleryCategories) {
    await prisma.galleryCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }
  console.log('✅ 갤러리 카테고리 완료')

  // 5. 제품 카테고리 (메인 + 서브)
  console.log('\n📦 제품 카테고리 생성...')
  
  // 메인 카테고리
  const mainCategories = [
    { code: 'A', name: 'Handlelocker & Fasterner', nameKo: '핸들록커 & 패스너', orderIndex: 1 },
    { code: 'B', name: 'Hinge', nameKo: '경첩', orderIndex: 2 },
    { code: 'C', name: 'Clip & Latch', nameKo: '클립 & 래치', orderIndex: 3 },
    { code: 'E', name: 'Electrical Materials', nameKo: '전기 재료', orderIndex: 4 },
    { code: 'G', name: 'Rubber & Seals', nameKo: '고무 & 실', orderIndex: 5 },
    { code: 'H', name: 'Handle & Grip', nameKo: '핸들 & 그립', orderIndex: 6 },
    { code: 'M', name: 'Marine Part', nameKo: '선박 부품', orderIndex: 7 },
    { code: 'P', name: 'Precision Part', nameKo: '정밀 부품', orderIndex: 8 },
    { code: 'S', name: 'Stay & Sliderail', nameKo: '스테이 & 슬라이드레일', orderIndex: 9 }
  ]

  const createdMainCategories = []
  for (const cat of mainCategories) {
    const created = await prisma.productCategory.upsert({
      where: { code: cat.code },
      update: {},
      create: { ...cat, level: 1 }
    })
    createdMainCategories.push(created)
    console.log(`✅ 메인 카테고리: ${cat.nameKo}`)
  }

  // A 카테고리 서브카테고리
  const categoryA = createdMainCategories.find(c => c.code === 'A')
  if (categoryA) {
    const subCategoriesA = [
      { code: 'A-HL', name: 'Handle lock', nameKo: '핸들 잠금', orderIndex: 1 },
      { code: 'A-HA', name: 'Handle latch', nameKo: '핸들 래치', orderIndex: 2 },
      { code: 'A-PL', name: 'Plane lock', nameKo: '평면 잠금', orderIndex: 3 },
      { code: 'A-FL', name: 'Flat lock', nameKo: '플랫 잠금', orderIndex: 4 },
      { code: 'A-CL', name: 'Cylinder lock & camlock', nameKo: '실린더 잠금 & 캠록', orderIndex: 5 },
      { code: 'A-RC', name: 'Rod control lock', nameKo: '로드 제어 잠금', orderIndex: 6 },
      { code: 'A-LA', name: 'Lock accessory', nameKo: '잠금 액세서리', orderIndex: 7 },
      { code: 'A-AT', name: 'Airtightness', nameKo: '기밀성', orderIndex: 8 },
      { code: 'A-FA', name: 'Fasterner', nameKo: '패스너', orderIndex: 9 }
    ]

    for (const subCat of subCategoriesA) {
      await prisma.productCategory.upsert({
        where: { code: subCat.code },
        update: {},
        create: {
          ...subCat,
          level: 2,
          parentId: categoryA.id
        }
      })
      console.log(`  ✅ 서브카테고리: ${subCat.nameKo}`)
    }
  }

  // 6. 실제 상품 데이터 추가 (이미지 포함)
  console.log('\n🛍️ 상품 데이터 생성...')
  
  // A 카테고리 상품들
  const handleLockCategory = await prisma.productCategory.findFirst({
    where: { code: 'A-HL' }
  })

  if (handleLockCategory) {
    // Handle lock 상품들
    const handleLockProducts = [
      {
        code: 'MDSI-A-30',
        name: 'Handle Lock Standard Type A-30',
        description: '표준형 핸들 잠금장치 A-30 모델',
        specifications: JSON.stringify({
          material: 'Stainless Steel',
          size: '30mm',
          finish: 'Satin',
          application: 'Cabinet, Enclosure'
        }),
        price: 15000
      },
      {
        code: 'MDSI-A-31',
        name: 'Handle Lock Standard Type A-31',
        description: '표준형 핸들 잠금장치 A-31 모델',
        specifications: JSON.stringify({
          material: 'Stainless Steel',
          size: '31mm',
          finish: 'Satin',
          application: 'Cabinet, Enclosure'
        }),
        price: 16000
      }
    ]

    for (const product of handleLockProducts) {
      const existingProduct = await prisma.product.findFirst({
        where: { code: product.code }
      })
      
      const createdProduct = existingProduct || await prisma.product.create({
        data: {
          ...product,
          categoryId: handleLockCategory.id,
          isPublished: true,
          isActive: true
        }
      })

      // 이미지 추가
      const imagePath = `/images/A-Handlelocker & Fasterner/Handle lock/${product.code}.webp`
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: imagePath,
          alt: `${product.name} 제품 이미지`,
          orderIndex: 0
        }
      })

      console.log(`  ✅ 상품: ${product.name}`)
    }
  }

  // 7. 메뉴 생성
  console.log('\n🧭 메뉴 생성...')
  const menus = [
    { title: '홈', path: '/', orderIndex: 0 },
    { title: '회사소개', path: '/company', orderIndex: 1 },
    { title: '제품소개', path: '/products', orderIndex: 2 },
    { title: '인증정보', path: '/certification', orderIndex: 3 },
    { title: '견적문의', path: '/inquiry', orderIndex: 4 },
    { title: '커뮤니티', path: '/board', orderIndex: 5 },
    { title: '갤러리', path: '/gallery', orderIndex: 6 },
    { title: '오시는 길', path: '/location', orderIndex: 7 }
  ]

  await prisma.menu.deleteMany({})
  for (const menu of menus) {
    await prisma.menu.create({ data: menu })
  }
  console.log('✅ 메뉴 완료')

  // 8. 히어로 슬라이드
  console.log('\n🎭 히어로 슬라이드 생성...')
  const heroSlides = [
    {
      title: '대한민국 대표 하드웨어 소재 전문기업',
      subtitle: '30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다',
      mediaType: 'IMAGE' as const,
      mediaUrl: '/images/1.webp',
      overlay: 30,
      orderIndex: 0,
      isActive: true
    },
    {
      title: '혁신적인 기술력',
      subtitle: '지속적인 연구개발을 통해 최신 기술을 적용한 제품을 제공합니다',
      mediaType: 'IMAGE' as const,
      mediaUrl: '/images/2.webp',
      overlay: 30,
      orderIndex: 1,
      isActive: true
    },
    {
      title: '품질 보증',
      subtitle: '엄격한 품질 관리 시스템을 통해 최고 품질의 제품을 보장합니다',
      mediaType: 'IMAGE' as const,
      mediaUrl: '/images/4.webp',
      overlay: 30,
      orderIndex: 2,
      isActive: true
    }
  ]

  for (const [index, slide] of heroSlides.entries()) {
    await prisma.heroSlide.upsert({
      where: { id: index + 1 },
      update: {},
      create: { ...slide, id: index + 1 }
    })
  }
  console.log('✅ 히어로 슬라이드 완료')

  // 9. 샘플 게시글
  console.log('\n📝 샘플 게시글 생성...')
  const noticeCategory = await prisma.boardCategory.findFirst({ where: { slug: 'notice' } })
  if (noticeCategory && admin) {
    await prisma.post.create({
      data: {
        title: '대경하드웨어 웹사이트 리뉴얼 안내',
        content: '안녕하세요. 대경하드웨어입니다.\n\n더 나은 서비스 제공을 위해 웹사이트를 새롭게 리뉴얼하였습니다.\n새로운 기능들을 통해 더욱 편리하게 이용하실 수 있습니다.\n\n감사합니다.',
        excerpt: '대경하드웨어 웹사이트가 새롭게 리뉴얼되었습니다.',
        categoryId: noticeCategory.id,
        authorId: admin.id,
        isPublished: true,
        isPinned: true
      }
    })
  }
  console.log('✅ 샘플 게시글 완료')

  console.log('\n🎉 완전한 데이터베이스 시딩 완료!')
  console.log('\n📊 생성된 데이터:')
  console.log('- 관리자 계정: admin@daekyung.com / admin123')
  console.log('- 메인 카테고리: 9개')
  console.log('- 서브 카테고리: 9개 (A 카테고리)')
  console.log('- 상품: 2개 (이미지 포함)')
  console.log('- 히어로 슬라이드: 3개')
  console.log('- 게시판 카테고리: 4개')
  console.log('- 갤러리 카테고리: 3개')
  console.log('- 메뉴: 8개')
  console.log('- 사이트 설정: 8개')
}

main()
  .catch((e) => {
    console.error('시딩 오류:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 