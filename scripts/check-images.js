const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('상품 이미지 경로 확인...')
  
  try {
    // 처음 10개 상품의 이미지 확인
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: true,
        category: true
      }
    })
    
    console.log(`\n📦 처음 10개 상품의 이미지 경로:\n`)
    
    products.forEach(product => {
      console.log(`🔷 ${product.name} (${product.code})`)
      console.log(`   카테고리: ${product.category.nameKo || product.category.name}`)
      
      if (product.images.length > 0) {
        product.images.forEach(image => {
          console.log(`   이미지: ${image.url}`)
        })
      } else {
        console.log(`   이미지: 없음`)
      }
      console.log('')
    })
    
    // 전체 이미지 통계
    const totalImages = await prisma.productImage.count()
    const productsWithImages = await prisma.product.count({
      where: {
        images: {
          some: {}
        }
      }
    })
    
    console.log(`📊 전체 통계:`)
    console.log(`- 총 이미지: ${totalImages}개`)
    console.log(`- 이미지가 있는 상품: ${productsWithImages}개`)
    
  } catch (error) {
    console.error('❌ 오류:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()