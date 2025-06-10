import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Fixing admin password...')
  
  try {
    // 기존 admin 사용자 찾기
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@daekyung.com' }
    })
    
    if (existingUser) {
      // 비밀번호 해시
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      // 비밀번호 업데이트
      await prisma.user.update({
        where: { email: 'admin@daekyung.com' },
        data: { password: hashedPassword }
      })
      
      console.log('✓ Admin password updated successfully')
    } else {
      // 사용자가 없으면 새로 생성
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.user.create({
        data: {
          email: 'admin@daekyung.com',
          password: hashedPassword,
          name: '관리자',
          role: 'admin'
        }
      })
      console.log('✓ Admin user created with hashed password')
    }
  } catch (error) {
    console.error('Error fixing admin password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()