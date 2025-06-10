import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    console.log('Login attempt:', { email, password })
    
    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email }
    })

    console.log('Found user:', user)

    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // 임시로 plain text 비교 (개발용)
    if (user.password !== password) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // 세션 정보 반환
    const { password: _, ...userWithoutPassword } = user
    
    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      token: 'dummy-token-' + Date.now() // 임시 토큰
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ 
      message: '서버 오류가 발생했습니다.',
      error: error.message 
    })
  }
}