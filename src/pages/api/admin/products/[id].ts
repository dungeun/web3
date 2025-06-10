import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, Number(id))
    case 'PUT':
      return handlePut(req, res, Number(id))
    case 'DELETE':
      return handleDelete(req, res, Number(id))
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// 상품 상세 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    })

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 상품 수정
async function handlePut(req: NextApiRequest, res: NextApiResponse, id: number) {
  const { code, name, description, categoryId, specifications, price, images, isActive } = req.body

  try {
    // 기존 이미지 삭제
    await prisma.productImage.deleteMany({
      where: { productId: id }
    })

    // 상품 정보 업데이트
    const product = await prisma.product.update({
      where: { id },
      data: {
        code,
        name,
        description,
        categoryId: Number(categoryId),
        specifications: specifications ? JSON.stringify(specifications) : null,
        price: price ? Number(price) : null,
        isActive: isActive !== undefined ? isActive : true
      },
      include: {
        category: true,
        images: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    })

    // 새 이미지 생성
    if (images && images.length > 0) {
      const imageData = images.map((image: any) => ({
        productId: id,
        url: image.url,
        alt: image.alt || product.name,
        orderIndex: image.orderIndex || 0
      }))

      await prisma.productImage.createMany({
        data: imageData
      })
    }

    // 업데이트된 상품 정보를 이미지와 함께 반환
    const updatedProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    })

    res.status(200).json(updatedProduct)
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 상품 삭제
async function handleDelete(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    // 이미지 먼저 삭제
    await prisma.productImage.deleteMany({
      where: { productId: id }
    })

    // 상품 삭제
    await prisma.product.delete({
      where: { id }
    })

    res.status(200).json({ message: '상품이 삭제되었습니다.' })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}