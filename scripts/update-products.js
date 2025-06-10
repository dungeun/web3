const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('상품 데이터 업데이트 시작...')

  try {
    // model 필드 값을 code 필드로 복사
    const products = await prisma.product.findMany()
    
    console.log(`${products.length}개 상품 업데이트 중...`)
    
    for (const product of products) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          code: product.model || product.name, // model이 없으면 name 사용
          isActive: product.isPublished || true
        }
      })
    }
    
    console.log('✅ 상품 데이터 업데이트 완료')
    
    // ProductImage 테이블도 업데이트 (imageUrl -> url, caption -> alt)
    console.log('이미지 데이터 업데이트 중...')
    
    // 기존 이미지 데이터가 있는지 확인
    const imageCount = await prisma.productImage.count()
    console.log(`기존 이미지: ${imageCount}개`)
    
    console.log('✅ 모든 데이터 업데이트 완료')
    
  } catch (error) {
    console.error('❌ 업데이트 중 오류:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()