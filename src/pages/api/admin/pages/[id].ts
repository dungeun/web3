import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, Number(id))
    case 'PUT':
      return handlePut(req, res, Number(id))
    case 'DELETE':
      return handleDelete(req, res, Number(id))
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// 페이지 상세 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        menu: {
          select: {
            id: true,
            title: true,
            path: true
          }
        }
      }
    })

    if (!page) {
      return res.status(404).json({ message: '페이지를 찾을 수 없습니다.' })
    }

    // sections를 JSON으로 파싱
    let parsedPage = { ...page, sections: {} }
    try {
      parsedPage.sections = JSON.parse(page.sections || '{}')
    } catch (error) {
      parsedPage.sections = {}
    }

    res.status(200).json(parsedPage)
  } catch (error) {
    console.error('Get page error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 페이지 수정
async function handlePut(req: NextApiRequest, res: NextApiResponse, id: number) {
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
    // 슬러그 중복 확인 (자기 자신 제외)
    const existingPage = await prisma.page.findFirst({
      where: { 
        slug,
        NOT: { id }
      }
    })

    if (existingPage) {
      return res.status(400).json({ message: '이미 사용중인 URL입니다.' })
    }

    const page = await prisma.page.update({
      where: { id },
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

    res.status(200).json(page)
  } catch (error) {
    console.error('Update page error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 페이지 삭제
async function handleDelete(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    await prisma.page.delete({
      where: { id }
    })

    res.status(200).json({ message: '페이지가 삭제되었습니다.' })
  } catch (error) {
    console.error('Delete page error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}