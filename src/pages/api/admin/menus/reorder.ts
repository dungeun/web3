import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { updates } = req.body

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({ error: 'Invalid updates data' })
  }

  try {
    // 트랜잭션으로 모든 메뉴 순서 업데이트
    await prisma.$transaction(
      updates.map(update => 
        prisma.menu.update({
          where: { id: update.id },
          data: { orderIndex: update.orderIndex }
        })
      )
    )

    res.status(200).json({ message: 'Menu order updated successfully' })
  } catch (error) {
    console.error('Error updating menu order:', error)
    res.status(500).json({ error: 'Failed to update menu order' })
  }
}