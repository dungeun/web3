import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // 보안을 위해 특정 키가 있을 때만 실행
  const { secretKey } = req.body
  if (secretKey !== 'seed-database-2024') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    console.log('Starting database seed...')

    // 1. 사용자 생성
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@daekyung.com' },
      update: {},
      create: {
        email: 'admin@daekyung.com',
        password: hashedPassword,
        name: '관리자',
        role: 'admin'
      }
    })

    // 2. 페이지 생성
    const pages = await Promise.all([
      prisma.page.upsert({
        where: { slug: 'company' },
        update: {},
        create: {
          title: '회사소개',
          slug: 'company',
          content: '대경하드웨어는 1985년 설립된 산업용 하드웨어 전문 제조업체입니다.',
          isActive: true
        }
      }),
      prisma.page.upsert({
        where: { slug: 'products' },
        update: {},
        create: {
          title: '제품소개',
          slug: 'products',
          content: '다양한 산업용 하드웨어를 제조 및 공급합니다.',
          isActive: true
        }
      }),
      prisma.page.upsert({
        where: { slug: 'certification' },
        update: {},
        create: {
          title: '인증현황',
          slug: 'certification',
          content: 'ISO 9001, ISO 14001 등 다양한 인증을 보유하고 있습니다.',
          isActive: true
        }
      }),
      prisma.page.upsert({
        where: { slug: 'location' },
        update: {},
        create: {
          title: '오시는길',
          slug: 'location',
          content: '경기도 시흥시 공단1대로 237',
          isActive: true
        }
      }),
      prisma.page.upsert({
        where: { slug: 'inquiry' },
        update: {},
        create: {
          title: '제품문의',
          slug: 'inquiry',
          content: '제품에 대한 문의사항을 남겨주세요.',
          isActive: true
        }
      })
    ])

    // 3. 메뉴 생성
    const menuData = [
      { title: '회사소개', slug: '/company', orderIndex: 1, parentId: null },
      { title: '제품소개', slug: '/products', orderIndex: 2, parentId: null },
      { title: '인증현황', slug: '/certification', orderIndex: 3, parentId: null },
      { title: '오시는길', slug: '/location', orderIndex: 4, parentId: null },
      { title: '제품문의', slug: '/inquiry', orderIndex: 5, parentId: null }
    ]

    for (const menu of menuData) {
      await prisma.menuItem.upsert({
        where: { slug: menu.slug },
        update: {},
        create: {
          title: menu.title,
          slug: menu.slug,
          orderIndex: menu.orderIndex,
          isActive: true
        }
      })
    }

    // 4. 제품 카테고리 생성
    const categories = [
      // 메인 카테고리
      { code: 'A', name: 'Handle lock & Fastener', nameKo: '핸들 로커 & 파스너', parentId: null, level: 1, orderIndex: 1 },
      { code: 'B', name: 'Hinge', nameKo: '경첩', parentId: null, level: 1, orderIndex: 2 },
      { code: 'C', name: 'Clip & Latch', nameKo: '클립 & 래치', parentId: null, level: 1, orderIndex: 3 },
      { code: 'E', name: 'Electrical Materials', nameKo: '전기 재료', parentId: null, level: 1, orderIndex: 4 },
      { code: 'G', name: 'Rubber & Seals', nameKo: '고무 & 씰', parentId: null, level: 1, orderIndex: 5 },
      { code: 'H', name: 'Handle & Grip', nameKo: '핸들 & 그립', parentId: null, level: 1, orderIndex: 6 },
      { code: 'M', name: 'Marine Part', nameKo: '선박 부품', parentId: null, level: 1, orderIndex: 7 },
      { code: 'P', name: 'Precision Part', nameKo: '정밀 부품', parentId: null, level: 1, orderIndex: 8 },
      { code: 'S', name: 'Stay & Sliderail', nameKo: '스테이 & 슬라이드레일', parentId: null, level: 1, orderIndex: 9 }
    ]

    const createdCategories = []
    for (const cat of categories) {
      const created = await prisma.productCategory.upsert({
        where: { code: cat.code },
        update: {},
        create: cat
      })
      createdCategories.push(created)
    }

    // 서브 카테고리
    const handleCategory = createdCategories.find(c => c.code === 'A')
    if (handleCategory) {
      const subCategories = [
        { code: 'A-HL', name: 'Handle lock', nameKo: '핸들 잠금', parentId: handleCategory.id, level: 2, orderIndex: 1 },
        { code: 'A-HA', name: 'Handle latch', nameKo: '핸들 래치', parentId: handleCategory.id, level: 2, orderIndex: 2 },
        { code: 'A-PL', name: 'Plane lock', nameKo: '평면 잠금', parentId: handleCategory.id, level: 2, orderIndex: 3 },
        { code: 'A-FL', name: 'Flat lock', nameKo: '플랫 잠금', parentId: handleCategory.id, level: 2, orderIndex: 4 },
        { code: 'A-CL', name: 'Cylinder lock & camlock', nameKo: '실린더 잠금 & 캠록', parentId: handleCategory.id, level: 2, orderIndex: 5 },
        { code: 'A-RC', name: 'Rod control lock', nameKo: '로드 제어 잠금', parentId: handleCategory.id, level: 2, orderIndex: 6 },
        { code: 'A-LA', name: 'Lock accessory', nameKo: '잠금 액세서리', parentId: handleCategory.id, level: 2, orderIndex: 7 },
        { code: 'A-AT', name: 'Airtightness', nameKo: '기밀성', parentId: handleCategory.id, level: 2, orderIndex: 8 },
        { code: 'A-FA', name: 'Fastener', nameKo: '파스너', parentId: handleCategory.id, level: 2, orderIndex: 9 }
      ]

      for (const subCat of subCategories) {
        await prisma.productCategory.upsert({
          where: { code: subCat.code },
          update: {},
          create: subCat
        })
      }
    }

    // 5. 샘플 제품 생성
    const sampleProducts = [
      {
        code: 'A-610',
        name: 'Flat Lock Standard Type',
        description: '표준형 플랫 잠금장치',
        categoryCode: 'A-FL',
        price: 15000
      },
      {
        code: 'B-100',
        name: 'Welding Hinge Standard',
        description: '표준 용접 힌지',
        categoryCode: 'B',
        price: 8000
      },
      {
        code: 'C-026',
        name: 'Catch Clip Type A',
        description: '캐치 클립 타입 A',
        categoryCode: 'C',
        price: 3500
      }
    ]

    for (const product of sampleProducts) {
      const category = await prisma.productCategory.findFirst({
        where: { code: product.categoryCode }
      })

      if (category) {
        await prisma.product.upsert({
          where: { code: product.code },
          update: {},
          create: {
            code: product.code,
            name: product.name,
            description: product.description,
            categoryId: category.id,
            price: product.price,
            isActive: true
          }
        })
      }
    }

    // 6. QnA 샘플 데이터
    await prisma.qna.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: '제품 견적 문의',
        content: 'A-610 제품 1000개 구매 시 견적 부탁드립니다.',
        author: '김철수',
        email: 'kim@example.com',
        phone: '010-1234-5678',
        isAnswered: false
      }
    })

    res.status(200).json({ 
      message: 'Database seeded successfully!',
      results: {
        user: adminUser.email,
        pages: pages.length,
        categories: createdCategories.length
      }
    })
  } catch (error) {
    console.error('Seed error:', error)
    res.status(500).json({ 
      message: 'Error seeding database', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}