import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const menus = await prisma.menu.findMany({
      where: { isActive: true },
      orderBy: [
        { parentId: 'asc' },
        { orderIndex: 'asc' }
      ],
      include: {
        children: {
          where: { isActive: true },
          orderBy: { orderIndex: 'asc' }
        }
      }
    })

    // 계층 구조로 정리
    const menuTree = menus
      .filter(menu => !menu.parentId)
      .map(parent => ({
        ...parent,
        children: menus.filter(child => child.parentId === parent.id)
      }))

    res.status(200).json(menuTree)
  } catch (error) {
    console.error('Get menus error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}