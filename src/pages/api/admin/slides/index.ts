import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        // 슬라이드 목록 조회
        const slides = await prisma.heroSlide.findMany({
          orderBy: [
            { orderIndex: 'asc' },
            { createdAt: 'desc' }
          ]
        })
        return res.status(200).json(slides)

      case 'POST':
        // 새 슬라이드 생성
        const { title, subtitle, buttonText, buttonUrl, mediaType, mediaUrl, overlay, orderIndex, isActive } = req.body

        // 필수 필드 검증
        if (!title || !mediaUrl || !mediaType) {
          return res.status(400).json({ 
            error: '필수 필드가 누락되었습니다' 
          })
        }

        const newSlide = await prisma.heroSlide.create({
          data: {
            title,
            subtitle: subtitle || null,
            buttonText: buttonText || null,
            buttonUrl: buttonUrl || null,
            mediaType,
            mediaUrl,
            overlay: overlay || 10,
            orderIndex: orderIndex || 0,
            isActive: isActive !== undefined ? isActive : true
          }
        })

        return res.status(201).json(newSlide)

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({ error: 'Method not allowed' })
    }
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