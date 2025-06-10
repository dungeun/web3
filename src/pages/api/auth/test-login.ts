import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET 요청으로 테스트 정보 확인
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true
        }
      })
      
      return res.status(200).json({
        message: 'Users in database',
        users: users
      })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' })
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    console.log('Login attempt:', { email })
    
    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // bcrypt로 비밀번호 비교
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // 세션 정보 반환
    const { password: _, ...userWithoutPassword } = user
    
    res.status(200).json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ 
      message: '서버 오류가 발생했습니다.',
      error: error.message 
    })
  }
}