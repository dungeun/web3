const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('기본 데이터 생성 시작...')

  try {
    // 기본 메뉴 생성
    const menus = [
      { title: '회사소개', path: '/company', orderIndex: 1 },
      { title: '제품소개', path: '/products', orderIndex: 2 },
      { title: '제품인증', path: '/certification', orderIndex: 3 },
      { title: '문의하기', path: '/inquiry', orderIndex: 4 },
      { title: '오시는길', path: '/location', orderIndex: 5 }
    ]

    console.log('📋 메뉴 생성 중...')
    // 기존 메뉴 삭제
    await prisma.menu.deleteMany({})
    
    for (const menu of menus) {
      await prisma.menu.create({
        data: menu
      })
      console.log(`  ✅ ${menu.title} 메뉴 생성`)
    }

    // 게시판 카테고리 생성
    const boardCategories = [
      { slug: 'notice', name: '공지사항', orderIndex: 1 },
      { slug: 'news', name: '뉴스', orderIndex: 2 },
      { slug: 'qna', name: 'Q&A', orderIndex: 3 },
      { slug: 'review', name: '고객후기', orderIndex: 4 }
    ]

    console.log('\n📋 게시판 카테고리 생성 중...')
    for (const category of boardCategories) {
      await prisma.boardCategory.upsert({
        where: { slug: category.slug },
        update: category,
        create: category
      })
      console.log(`  ✅ ${category.name} 카테고리 생성`)
    }

    // 갤러리 카테고리 생성
    const galleryCategories = [
      { slug: 'product', name: '제품 갤러리', orderIndex: 1 },
      { slug: 'event', name: '이벤트', orderIndex: 2 }
    ]

    console.log('\n📋 갤러리 카테고리 생성 중...')
    for (const category of galleryCategories) {
      await prisma.galleryCategory.upsert({
        where: { slug: category.slug },
        update: category,
        create: category
      })
      console.log(`  ✅ ${category.name} 카테고리 생성`)
    }

    // 기본 관리자 계정 생성
    console.log('\n👤 관리자 계정 생성 중...')
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@daekyung.com' },
      update: {},
      create: {
        email: 'admin@daekyung.com',
        password: 'admin123', // 실제로는 해시해야 함
        name: '관리자',
        role: 'admin'
      }
    })
    console.log('  ✅ 관리자 계정 생성: admin@daekyung.com / admin123')

    // 통계 확인
    const menuCount = await prisma.menu.count()
    const boardCategoryCount = await prisma.boardCategory.count()
    const galleryCategoryCount = await prisma.galleryCategory.count()
    const categoryCount = await prisma.productCategory.count()
    const productCount = await prisma.product.count()

    console.log('\n📊 데이터베이스 현황:')
    console.log(`- 메뉴: ${menuCount}개`)
    console.log(`- 게시판 카테고리: ${boardCategoryCount}개`)
    console.log(`- 갤러리 카테고리: ${galleryCategoryCount}개`)
    console.log(`- 상품 카테고리: ${categoryCount}개`)
    console.log(`- 상품: ${productCount}개`)

    console.log('\n✅ 기본 데이터 생성 완료!')

  } catch (error) {
    console.error('❌ 오류:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()