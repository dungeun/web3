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

// 메뉴 목록 조회 (플랫 구조로 반환)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: [
        { parentId: 'asc' },
        { orderIndex: 'asc' }
      ]
    })

    res.status(200).json(menus)
  } catch (error) {
    console.error('Get menus error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 메뉴 생성
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, path, type, target, parentId, orderIndex } = req.body

  try {
    const menu = await prisma.menu.create({
      data: {
        title,
        path,
        type: type || 'internal',
        target: target || '_self',
        parentId: parentId ? Number(parentId) : null,
        orderIndex: orderIndex || 0
      }
    })

    res.status(201).json(menu)
  } catch (error) {
    console.error('Create menu error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}