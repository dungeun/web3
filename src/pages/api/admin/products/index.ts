import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// 상품 목록 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId, search, page = 1, limit = 20 } = req.query

  try {
    const skip = (Number(page) - 1) * Number(limit)
    
    const where: any = {}
    
    if (categoryId) {
      where.categoryId = Number(categoryId)
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { description: { contains: search as string } },
        { code: { contains: search as string } }
      ]
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { orderIndex: 'asc' }
          }
        },
        orderBy: [
          { category: { code: 'asc' } },
          { code: 'asc' }
        ],
        skip,
        take: Number(limit)
      }),
      prisma.product.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / Number(limit))

    res.status(200).json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 상품 생성
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { code, name, description, categoryId, specifications, price, images } = req.body

  try {
    const product = await prisma.product.create({
      data: {
        code,
        name,
        description,
        categoryId: Number(categoryId),
        specifications: specifications ? JSON.stringify(specifications) : null,
        price: price ? Number(price) : null
      },
      include: {
        category: true
      }
    })

    // 이미지가 있으면 생성
    if (images && images.length > 0) {
      const imageData = images.map((image: any) => ({
        productId: product.id,
        url: image.url,
        alt: image.alt || product.name,
        orderIndex: image.orderIndex || 0
      }))

      await prisma.productImage.createMany({
        data: imageData
      })
    }

    res.status(201).json(product)
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}