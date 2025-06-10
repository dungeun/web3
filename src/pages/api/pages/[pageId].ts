import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pageId } = req.query
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res, pageId as string)
    case 'PUT':
      return handlePut(req, res, pageId as string)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// 페이지 콘텐츠 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse, pageId: string) {
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { pageId }
    })

    if (!pageContent) {
      return res.status(404).json({ message: '페이지를 찾을 수 없습니다.' })
    }

    res.status(200).json({
      ...pageContent,
      content: pageContent.content ? JSON.parse(pageContent.content) : null,
      metadata: pageContent.metadata ? JSON.parse(pageContent.metadata) : null
    })
  } catch (error) {
    console.error('Get page content error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 페이지 콘텐츠 수정
async function handlePut(req: NextApiRequest, res: NextApiResponse, pageId: string) {
  const { title, content, metadata } = req.body

  try {
    const pageContent = await prisma.pageContent.upsert({
      where: { pageId },
      update: {
        title,
        content: JSON.stringify(content),
        metadata: JSON.stringify(metadata)
      },
      create: {
        pageId,
        title,
        content: JSON.stringify(content),
        metadata: JSON.stringify(metadata)
      }
    })

    res.status(200).json({
      ...pageContent,
      content: JSON.parse(pageContent.content || '{}'),
      metadata: JSON.parse(pageContent.metadata || '{}')
    })
  } catch (error) {
    console.error('Update page content error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}