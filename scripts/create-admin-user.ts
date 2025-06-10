import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating admin user...')

  try {
    // 기존 사용자 확인
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@daekyung.com' }
    })

    if (existingUser) {
      console.log('Admin user already exists')
      return
    }

    // 새 관리자 생성
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@daekyung.com',
        password: 'admin123', // 개발용 plain text
        name: '관리자',
        role: 'admin'
      }
    })

    console.log('Admin user created:', adminUser)
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })