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

// 카테고리 목록 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 모든 카테고리 조회
    const allCategories = await prisma.productCategory.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    // 계층 구조로 변환
    const categoryMap = new Map()
    const rootCategories: any[] = []

    // 먼저 모든 카테고리를 맵에 저장
    allCategories.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] })
    })

    // 부모-자식 관계 구성
    allCategories.forEach(category => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId)
        if (parent) {
          parent.children.push(categoryMap.get(category.id))
        }
      } else {
        rootCategories.push(categoryMap.get(category.id))
      }
    })

    res.status(200).json(rootCategories)
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 카테고리 생성
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { code, name, description, orderIndex } = req.body

  try {
    const category = await prisma.productCategory.create({
      data: {
        code,
        name,
        description,
        orderIndex: orderIndex || 0
      }
    })

    res.status(201).json(category)
  } catch (error) {
    console.error('Create category error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}