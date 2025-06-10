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

// 페이지 목록 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pages = await prisma.page.findMany({
      include: {
        menu: {
          select: {
            id: true,
            title: true,
            path: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    res.status(200).json(pages)
  } catch (error) {
    console.error('Get pages error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 페이지 생성
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { 
    title, 
    slug, 
    content, 
    templateId,
    sections,
    metaTitle, 
    metaDescription, 
    menuId,
    isPublished 
  } = req.body

  try {
    // 슬러그 중복 확인
    const existingPage = await prisma.page.findUnique({
      where: { slug }
    })

    if (existingPage) {
      return res.status(400).json({ message: '이미 사용중인 URL입니다.' })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: content || '',
        templateId: templateId || 'basic',
        sections: sections ? JSON.stringify(sections) : '{}',
        metaTitle,
        metaDescription,
        menuId: menuId || null,
        isPublished: isPublished !== undefined ? isPublished : true
      }
    })

    res.status(201).json(page)
  } catch (error) {
    console.error('Create page error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}