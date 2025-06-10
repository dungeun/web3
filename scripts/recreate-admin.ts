import { PrismaClient } from '../src/generated/prisma/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Recreating admin user...')
  
  try {
    // 기존 admin 사용자 삭제
    await prisma.user.deleteMany({
      where: { email: 'admin@daekyung.com' }
    })
    console.log('✓ Deleted existing admin user')
    
    // 새로운 admin 사용자 생성
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@daekyung.com',
        password: hashedPassword,
        name: '관리자',
        role: 'admin'
      }
    })
    
    console.log('✓ Admin user created successfully')
    console.log('Email:', adminUser.email)
    console.log('Password: admin123')
    console.log('Hashed password starts with:', hashedPassword.substring(0, 10))
    
    // 비밀번호 검증 테스트
    const isValid = await bcrypt.compare('admin123', hashedPassword)
    console.log('Password verification test:', isValid ? 'PASSED' : 'FAILED')
    
  } catch (error) {
    console.error('Error recreating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()