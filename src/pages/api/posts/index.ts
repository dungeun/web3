import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// 게시글 목록 조회
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { category, page = 1, limit = 10 } = req.query
  
  try {
    const where = category ? {
      category: {
        slug: category as string
      }
    } : {}

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: true,
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    })

    const total = await prisma.post.count({ where })

    res.status(200).json({
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Get posts error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

// 게시글 작성
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, categoryId, authorId, rating, excerpt } = req.body

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        rating,
        categoryId: Number(categoryId),
        authorId: Number(authorId)
      },
      include: {
        author: true,
        category: true
      }
    })

    res.status(201).json(post)
  } catch (error) {
    console.error('Create post error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}