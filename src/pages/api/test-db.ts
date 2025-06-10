import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 데이터베이스 연결 테스트
    const userCount = await prisma.user.count()
    const menuCount = await prisma.menu.count()
    const productCount = await prisma.product.count()
    const categoryCount = await prisma.productCategory.count()
    
    // 첫 번째 사용자 정보 가져오기
    const firstUser = await prisma.user.findFirst()
    
    res.status(200).json({
      success: true,
      message: 'Database connected successfully',
      data: {
        users: userCount,
        menus: menuCount,
        products: productCount,
        categories: categoryCount,
        firstUser: firstUser ? {
          id: firstUser.id,
          email: firstUser.email,
          name: firstUser.name,
          role: firstUser.role
        } : null
      }
    })
  } catch (error: any) {
    console.error('Database connection error:', error)
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    })
  }
}