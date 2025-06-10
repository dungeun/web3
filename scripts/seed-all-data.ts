import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting complete database seeding...')

  // 1. 관리자 사용자 생성
  console.log('\n1. Creating admin user...')
  try {
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@daekyung.com',
        password: 'admin123',
        name: '관리자',
        role: 'admin'
      }
    })
    console.log('✓ Admin user created:', adminUser.email)
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('- Admin user already exists')
    } else {
      console.error('Error creating admin user:', error)
    }
  }

  // 2. 메뉴 생성
  console.log('\n2. Creating menus...')
  const menus = [
    {
      title: '회사소개',
      path: '/company',
      type: 'dropdown',
      target: '_self',
      orderIndex: 1,
      isActive: true
    },
    {
      title: '제품소개',
      path: '/products',
      type: 'dropdown',
      target: '_self',
      orderIndex: 2,
      isActive: true
    },
    {
      title: '인증정보',
      path: '/certification',
      type: 'dropdown',
      target: '_self',
      orderIndex: 3,
      isActive: true
    },
    {
      title: '견적문의',
      path: '/inquiry',
      type: 'internal',
      target: '_self',
      orderIndex: 4,
      isActive: true
    },
    {
      title: '커뮤니티',
      path: '/board',
      type: 'dropdown',
      target: '_self',
      orderIndex: 5,
      isActive: true
    },
    {
      title: '갤러리',
      path: '/gallery',
      type: 'dropdown',
      target: '_self',
      orderIndex: 6,
      isActive: true
    }
  ]

  for (const menu of menus) {
    try {
      const created = await prisma.menu.create({ data: menu })
      console.log(`✓ Menu created: ${created.title}`)
    } catch (error) {
      console.error(`Error creating menu ${menu.title}:`, error)
    }
  }

  // 3. 서브메뉴 생성
  console.log('\n3. Creating submenus...')
  const companyMenu = await prisma.menu.findFirst({ where: { title: '회사소개' } })
  if (companyMenu) {
    await prisma.menu.createMany({
      data: [
        { 
          title: '회사개요/인사말', 
          path: '/company', 
          parentId: companyMenu.id,
          orderIndex: 1
        },
        { 
          title: '사업장 소개/오시는 길', 
          path: '/location', 
          parentId: companyMenu.id,
          orderIndex: 2
        }
      ]
    })
    console.log('✓ Company submenus created')
  }

  const productsMenu = await prisma.menu.findFirst({ where: { title: '제품소개' } })
  if (productsMenu) {
    await prisma.menu.createMany({
      data: [
        { title: 'A | Handlelocker & Fasterner', path: '/products?category=A', parentId: productsMenu.id, orderIndex: 1 },
        { title: 'B | Hinge', path: '/products?category=B', parentId: productsMenu.id, orderIndex: 2 },
        { title: 'C | Clip & Latch', path: '/products?category=C', parentId: productsMenu.id, orderIndex: 3 },
        { title: 'G | Rubber & Seals', path: '/products?category=G', parentId: productsMenu.id, orderIndex: 4 },
        { title: 'H | Handle & Grip', path: '/products?category=H', parentId: productsMenu.id, orderIndex: 5 },
        { title: 'S | Stay & Sliderail', path: '/products?category=S', parentId: productsMenu.id, orderIndex: 6 }
      ]
    })
    console.log('✓ Product submenus created')
  }

  // 4. 페이지 생성
  console.log('\n4. Creating pages...')
  const pages = [
    {
      title: '회사소개',
      slug: 'company',
      templateId: 'company',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '대경하드웨어',
          subtitle: '30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다'
        }
      }),
      isPublished: true
    },
    {
      title: '사업장 소개/오시는 길',
      slug: 'location',
      templateId: 'location',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '오시는 길'
        }
      }),
      isPublished: true
    },
    {
      title: '견적문의',
      slug: 'inquiry',
      templateId: 'inquiry',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '견적 문의'
        }
      }),
      isPublished: true
    },
    {
      title: '인증 및 특허',
      slug: 'certification',
      templateId: 'certification',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '인증 정보'
        }
      }),
      isPublished: true
    },
    {
      title: '제품소개',
      slug: 'products',
      templateId: 'products',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '제품 소개'
        }
      }),
      isPublished: true
    }
  ]

  for (const page of pages) {
    try {
      const created = await prisma.page.create({ data: page })
      console.log(`✓ Page created: ${created.title}`)
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`- Page already exists: ${page.title}`)
      } else {
        console.error(`Error creating page ${page.title}:`, error)
      }
    }
  }

  // 5. 제품 카테고리 생성
  console.log('\n5. Creating product categories...')
  const categories = [
    {
      code: 'A',
      name: 'Handlelocker & Fasterner',
      nameKo: '핸들록커 & 패스너',
      description: '다양한 용도에 맞는 핸들록커와 패스너 제품',
      level: 1,
      orderIndex: 1,
      isActive: true
    },
    {
      code: 'B', 
      name: 'Hinge',
      nameKo: '경첩',
      description: '고품질 힌지 제품',
      level: 1,
      orderIndex: 2,
      isActive: true
    },
    {
      code: 'C',
      name: 'Clip & Latch',
      nameKo: '클립 & 래치',
      description: '안정적인 클립과 래치 제품',
      level: 1,
      orderIndex: 3,
      isActive: true
    },
    {
      code: 'G',
      name: 'Rubber & Seals',
      nameKo: '고무 & 실',
      description: '다양한 용도의 고무 및 실 제품',
      level: 1,
      orderIndex: 4,
      isActive: true
    },
    {
      code: 'H',
      name: 'Handle & Grip',
      nameKo: '핸들 & 그립',
      description: '인체공학적 핸들과 그립 제품',
      level: 1,
      orderIndex: 5,
      isActive: true
    },
    {
      code: 'S',
      name: 'Stay & Sliderail',
      nameKo: '스테이 & 슬라이드레일',
      description: '스테이와 슬라이드레일 제품',
      level: 1,
      orderIndex: 6,
      isActive: true
    }
  ]

  for (const category of categories) {
    try {
      const created = await prisma.productCategory.create({ data: category })
      console.log(`✓ Product category created: ${created.name}`)
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`- Category already exists: ${category.name}`)
      } else {
        console.error(`Error creating category ${category.name}:`, error)
      }
    }
  }

  // 6. 사이트 설정
  console.log('\n6. Creating site configurations...')
  const siteConfigs = [
    { key: 'siteName', value: '대경하드웨어', description: '사이트명' },
    { key: 'siteDescription', value: '하드웨어 소재 전문기업', description: '사이트 설명' },
    { key: 'contactEmail', value: 'dkhw6789@naver.com', description: '연락처 이메일' },
    { key: 'contactPhone', value: '055-333-6790~1', description: '연락처 전화번호' },
    { key: 'contactAddress', value: '경남 김해시 삼안로 112번길 9-14', description: '회사 주소' },
    { key: 'heroType', value: 'slides', description: '히어로 섹션 타입' },
    { key: 'heroVideoUrl', value: '', description: '히어로 비디오 URL' },
    { key: 'heroVideoOverlay', value: '10', description: '히어로 비디오 오버레이' },
    { key: 'heroTitle', value: '대한민국 대표 하드웨어 소재 전문기업', description: '히어로 타이틀' },
    { key: 'heroSubtitle', value: '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.', description: '히어로 서브타이틀' }
  ]

  for (const config of siteConfigs) {
    try {
      await prisma.siteConfig.create({ data: config })
      console.log(`✓ Site config created: ${config.key}`)
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`- Config already exists: ${config.key}`)
      } else {
        console.error(`Error creating config ${config.key}:`, error)
      }
    }
  }

  console.log('\n✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })