import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: '유효하지 않은 ID입니다' })
  }

  try {
    switch (req.method) {
      case 'GET':
        // 특정 슬라이드 조회
        const slide = await prisma.heroSlide.findUnique({
          where: { id: parseInt(id) }
        })

        if (!slide) {
          return res.status(404).json({ error: '슬라이드를 찾을 수 없습니다' })
        }

        return res.status(200).json(slide)

      case 'PUT':
        // 슬라이드 수정
        const { title, subtitle, buttonText, buttonUrl, mediaType, mediaUrl, overlay, orderIndex, isActive } = req.body

        // 필수 필드 검증
        if (!title || !mediaUrl || !mediaType) {
          return res.status(400).json({ 
            error: '필수 필드가 누락되었습니다' 
          })
        }

        const updatedSlide = await prisma.heroSlide.update({
          where: { id: parseInt(id) },
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

        return res.status(200).json(updatedSlide)

      case 'DELETE':
        // 슬라이드 삭제
        await prisma.heroSlide.delete({
          where: { id: parseInt(id) }
        })

        return res.status(200).json({ message: '슬라이드가 삭제되었습니다' })

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Slide API Error:', error)
    
    // Prisma 에러 처리
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return res.status(404).json({ error: '슬라이드를 찾을 수 없습니다' })
    }
    
    return res.status(500).json({ 
      error: '서버 오류가 발생했습니다',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    await prisma.$disconnect()
  }
}