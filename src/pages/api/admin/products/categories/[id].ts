import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  switch (req.method) {
    case 'PUT':
      return handlePut(req, res, Number(id))
    case 'DELETE':
      return handleDelete(req, res, Number(id))
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// 카테고리 수정
async function handlePut(req: NextApiRequest, res: NextApiResponse, id: number) {
  const { code, name, description, orderIndex, isActive } = req.body

  try {
    const category = await prisma.productCategory.update({
      where: { id },
      data: {
        code,
        name,
        description,
        orderIndex: orderIndex || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    res.status(200).json(category)
  } catch (error) {
    console.error('Update category error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 카테고리 삭제
async function handleDelete(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    // 해당 카테고리의 상품 수 확인
    const productCount = await prisma.product.count({
      where: { categoryId: id }
    })

    if (productCount > 0) {
      return res.status(400).json({ 
        message: `이 카테고리에 ${productCount}개의 상품이 있습니다. 먼저 상품을 삭제하거나 다른 카테고리로 이동시켜주세요.` 
      })
    }

    // 카테고리 삭제
    await prisma.productCategory.delete({
      where: { id }
    })

    res.status(200).json({ message: '카테고리가 삭제되었습니다.' })
  } catch (error) {
    console.error('Delete category error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}