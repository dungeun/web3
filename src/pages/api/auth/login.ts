import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
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
    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // 비밀번호 확인
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
    }

    // 세션 정보 반환 (실제로는 JWT 토큰 등을 사용)
    const { password: _, ...userWithoutPassword } = user
    
    res.status(200).json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}