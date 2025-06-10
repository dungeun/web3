import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 활성화된 슬라이드만 조회
    const slides = await prisma.heroSlide.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { orderIndex: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    
    return res.status(200).json(slides)
  } catch (error) {
    console.error('Slide API Error:', error)
    return res.status(500).json({ 
      error: '서버 오류가 발생했습니다',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
}