import { PrismaClient } from '../src/generated/prisma/index.js'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// 이미지 폴더 스캔 함수
function scanProductImages(basePath: string) {
  const products: any[] = []
  
  try {
    const categories = fs.readdirSync(basePath).filter(item => 
      fs.statSync(path.join(basePath, item)).isDirectory() && 
      !item.startsWith('.') && 
      !item.startsWith('_')
    )

    for (const categoryFolder of categories) {
      const categoryPath = path.join(basePath, categoryFolder)
      
      try {
        const subCategories = fs.readdirSync(categoryPath).filter(item => 
          fs.statSync(path.join(categoryPath, item)).isDirectory() && 
          !item.startsWith('.')
        )

        for (const subCategoryFolder of subCategories) {
          const subCategoryPath = path.join(categoryPath, subCategoryFolder)
          
          try {
            const files = fs.readdirSync(subCategoryPath).filter(file => 
              file.endsWith('.webp')
            )

            for (const file of files) {
              const productCode = file.replace('.webp', '')
              const imagePath = `/images/${categoryFolder}/${subCategoryFolder}/${file}`
              
              products.push({
                categoryFolder,
                subCategoryFolder,
                productCode,
                imagePath,
                fileName: file
              })
            }
          } catch (error) {
            console.log(`서브카테고리 스캔 실패: ${subCategoryPath}`)
          }
        }
      } catch (error) {
        console.log(`카테고리 스캔 실패: ${categoryPath}`)
      }
    }
  } catch (error) {
    console.error('이미지 폴더 스캔 실패:', error)
  }

  return products
}

// 상품명 생성 함수
function generateProductName(code: string, subCategory: string): string {
  const cleanCode = code.replace(/[^a-zA-Z0-9-]/g, '')
  const cleanSubCategory = subCategory.replace(/[&]/g, 'and')
  
  return `${cleanSubCategory} ${cleanCode}`
}

// 상품 설명 생성 함수
function generateProductDescription(code: string, subCategory: string): string {
  return `고품질 ${subCategory} 제품 ${code} 모델입니다. 내구성과 안정성을 갖춘 전문 하드웨어 소재입니다.`
}

// 가격 생성 함수 (카테고리별 기본 가격)
function generatePrice(categoryCode: string): number {
  const basePrices: { [key: string]: number } = {
    'A': 15000, // Handlelocker & Fasterner
    'B': 8000,  // Hinge
    'C': 5000,  // Clip & Latch
    'E': 12000, // Electrical Materials
    'G': 6000,  // Rubber & Seals
    'H': 10000, // Handle & Grip
    'M': 20000, // Marine Part
    'P': 25000, // Precision Part
    'S': 18000  // Stay & Sliderail
  }
  
  const basePrice = basePrices[categoryCode] || 10000
  // 랜덤 변동 ±30%
  const variation = (Math.random() - 0.5) * 0.6
  return Math.round(basePrice * (1 + variation) / 1000) * 1000
}

async function main() {
  console.log('📦 대량 상품 추가 시작...')

  // 이미지 스캔
  const imageBasePath = path.join(process.cwd(), 'public', 'images')
  const scannedProducts = scanProductImages(imageBasePath)
  
  console.log(`🔍 스캔된 상품 이미지: ${scannedProducts.length}개`)

  let addedCount = 0
  let skippedCount = 0

  for (const scannedProduct of scannedProducts) {
    try {
      // 카테고리 코드 추출 (예: "A-Handlelocker & Fasterner" -> "A")
      const categoryCode = scannedProduct.categoryFolder.split('-')[0]
      
      // 서브카테고리 매핑
      const subCategoryMapping: { [key: string]: string } = {
        'Handle lock': 'A-HL',
        'Handle latch': 'A-HA',
        'Plane lock': 'A-PL',
        'Flat lock': 'A-FL',
        'Cylinder lock & camlock': 'A-CL',
        'Rod control lock': 'A-RC',
        'Lock accessory': 'A-LA',
        'Airtightness': 'A-AT',
        'Fasterner': 'A-FA'
      }

      const subCategoryCode = subCategoryMapping[scannedProduct.subCategoryFolder] || `${categoryCode}-SUB`

      // 데이터베이스에서 카테고리 찾기
      const category = await prisma.productCategory.findFirst({
        where: { code: subCategoryCode }
      })

      if (!category) {
        console.log(`⚠️ 카테고리를 찾을 수 없음: ${subCategoryCode}`)
        skippedCount++
        continue
      }

      // 이미 존재하는 상품인지 확인
      const existingProduct = await prisma.product.findFirst({
        where: { code: scannedProduct.productCode }
      })

      if (existingProduct) {
        console.log(`⏭️ 이미 존재하는 상품: ${scannedProduct.productCode}`)
        skippedCount++
        continue
      }

      // 새 상품 생성
      const newProduct = await prisma.product.create({
        data: {
          code: scannedProduct.productCode,
          name: generateProductName(scannedProduct.productCode, scannedProduct.subCategoryFolder),
          description: generateProductDescription(scannedProduct.productCode, scannedProduct.subCategoryFolder),
          specifications: JSON.stringify({
            material: 'High Quality Steel',
            finish: 'Standard',
            application: 'Industrial Use',
            category: scannedProduct.subCategoryFolder
          }),
          price: generatePrice(categoryCode),
          categoryId: category.id,
          isPublished: true,
          isActive: true
        }
      })

      // 상품 이미지 추가
      await prisma.productImage.create({
        data: {
          productId: newProduct.id,
          url: scannedProduct.imagePath,
          alt: `${newProduct.name} 제품 이미지`,
          orderIndex: 0
        }
      })

      console.log(`✅ 상품 추가: ${newProduct.name}`)
      addedCount++

    } catch (error) {
      console.error(`❌ 상품 추가 실패 (${scannedProduct.productCode}):`, error)
      skippedCount++
    }
  }

  console.log('\n🎉 대량 상품 추가 완료!')
  console.log(`📊 결과:`)
  console.log(`- 추가된 상품: ${addedCount}개`)
  console.log(`- 건너뛴 상품: ${skippedCount}개`)
  console.log(`- 총 스캔된 상품: ${scannedProducts.length}개`)
}

main()
  .catch((e) => {
    console.error('오류:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 