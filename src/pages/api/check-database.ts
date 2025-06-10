import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 전체 데이터 통계
    const stats = {
      users: await prisma.user.count(),
      siteConfigs: await prisma.siteConfig.count(),
      menus: await prisma.menu.count(),
      heroSlides: await prisma.heroSlide.count(),
      productCategories: {
        total: await prisma.productCategory.count(),
        main: await prisma.productCategory.count({ where: { level: 1 } }),
        sub: await prisma.productCategory.count({ where: { level: 2 } })
      },
      products: {
        total: await prisma.product.count(),
        published: await prisma.product.count({ where: { isPublished: true } }),
        active: await prisma.product.count({ where: { isActive: true } })
      },
      productImages: await prisma.productImage.count(),
      boardCategories: await prisma.boardCategory.count(),
      posts: await prisma.post.count(),
      galleryCategories: await prisma.galleryCategory.count()
    }

    // 카테고리별 상품 수
    const categoryStats = await prisma.productCategory.findMany({
      where: { level: 2 },
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { code: 'asc' }
    })

    // 최근 추가된 상품 5개
    const recentProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: true
      }
    })

    // 사이트 설정
    const siteConfigs = await prisma.siteConfig.findMany({
      orderBy: { key: 'asc' }
    })

    // 메뉴 구조
    const menus = await prisma.menu.findMany({
      orderBy: { orderIndex: 'asc' }
    })

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      stats,
      categoryStats: categoryStats.map(cat => ({
        code: cat.code,
        name: cat.name,
        nameKo: cat.nameKo,
        productCount: cat._count.products
      })),
      recentProducts: recentProducts.map(product => ({
        id: product.id,
        code: product.code,
        name: product.name,
        category: product.category?.name,
        price: product.price,
        imageCount: product.images.length,
        createdAt: product.createdAt
      })),
      siteConfigs: siteConfigs.map(config => ({
        key: config.key,
        value: config.value,
        description: config.description
      })),
      menus: menus.map(menu => ({
        title: menu.title,
        path: menu.path,
        orderIndex: menu.orderIndex
      }))
    })

  } catch (error) {
    console.error('데이터베이스 확인 오류:', error)
    res.status(500).json({ 
      success: false, 
      error: '데이터베이스 확인 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    })
  }
} 