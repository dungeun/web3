const { PrismaClient } = require('./src/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function quickSeed() {
  try {
    console.log('🌱 Starting quick database seed...')

    // 1. 관리자 계정 생성
    console.log('👤 Creating admin user...')
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
    console.log('✅ Admin user created:', admin.email)

    // 2. 사이트 설정
    console.log('⚙️ Creating site config...')
    const configs = [
      { key: 'siteName', value: '대경하드웨어', description: '사이트명' },
      { key: 'siteDescription', value: '하드웨어 소재 전문기업', description: '사이트 설명' },
      { key: 'contactEmail', value: 'dkhw6789@naver.com', description: '연락처 이메일' },
      { key: 'contactPhone', value: '055-333-6790~1', description: '연락처 전화번호' },
      { key: 'contactAddress', value: '경남 김해시 삼안로 112번길 9-14', description: '회사 주소' }
    ]

    for (const config of configs) {
      await prisma.siteConfig.upsert({
        where: { key: config.key },
        update: { value: config.value },
        create: config
      })
    }
    console.log('✅ Site config created')

    // 3. 제품 카테고리
    console.log('📦 Creating product categories...')
    const categories = [
      { code: 'A', name: 'Handlelocker & Fasterner', nameKo: '핸들록커 & 패스너', orderIndex: 1 },
      { code: 'B', name: 'Hinge', nameKo: '경첩', orderIndex: 2 },
      { code: 'C', name: 'Clip & Latch', nameKo: '클립 & 래치', orderIndex: 3 },
      { code: 'G', name: 'Rubber & Seals', nameKo: '고무 & 실', orderIndex: 4 },
      { code: 'H', name: 'Handle & Grip', nameKo: '핸들 & 그립', orderIndex: 5 },
      { code: 'S', name: 'Stay & Sliderail', nameKo: '스테이 & 슬라이드레일', orderIndex: 6 }
    ]

    for (const cat of categories) {
      await prisma.productCategory.upsert({
        where: { code: cat.code },
        update: {},
        create: cat
      })
    }
    console.log('✅ Product categories created')

    // 4. 기본 메뉴
    console.log('🧭 Creating menus...')
    const menus = [
      { title: '홈', path: '/', orderIndex: 0 },
      { title: '회사소개', path: '/company', orderIndex: 1 },
      { title: '제품소개', path: '/products', orderIndex: 2 },
      { title: '인증정보', path: '/certification', orderIndex: 3 },
      { title: '견적문의', path: '/inquiry', orderIndex: 4 },
      { title: '오시는 길', path: '/location', orderIndex: 5 }
    ]

    // 기존 메뉴 삭제 후 새로 생성
    await prisma.menu.deleteMany({})
    
    for (const menu of menus) {
      await prisma.menu.create({ data: menu })
    }
    console.log('✅ Menus created')

    // 5. 히어로 슬라이드 (기본)
    console.log('🎭 Creating hero slide...')
    await prisma.heroSlide.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: '대한민국 대표 하드웨어 소재 전문기업',
        subtitle: '30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다',
        mediaType: 'IMAGE',
        mediaUrl: '/images/hero-bg.jpg',
        overlay: 30,
        orderIndex: 0,
        isActive: true
      }
    })
    console.log('✅ Hero slide created')

    console.log('\n🎉 Quick seed completed successfully!')
    console.log('📧 Admin login: admin@daekyung.com')
    console.log('🔑 Admin password: admin123')

  } catch (error) {
    console.error('❌ Seed error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

quickSeed() 