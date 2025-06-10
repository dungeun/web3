const { PrismaClient } = require('../src/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// 폴더에서 webp 이미지 파일들을 찾는 함수
function findWebpImages(folderPath, productCode) {
  const images = []
  
  try {
    const files = fs.readdirSync(folderPath)
    
    files.forEach(file => {
      if (file.endsWith('.webp')) {
        const baseName = file.replace('.webp', '')
        
        // 제품 코드와 일치하는 이미지 찾기
        if (baseName === productCode || baseName.includes(productCode)) {
          const imagePath = `/images${folderPath.replace('/Users/default/Desktop/코드비프로젝트/작업 중/web/home/public/images', '')}/${file}`
          images.push({
            url: imagePath,
            alt: `${productCode} 제품 이미지`,
            fileName: file
          })
        }
      }
    })
  } catch (error) {
    console.warn(`폴더 읽기 실패: ${folderPath}`, error.message)
  }
  
  return images
}

// 폴더 구조를 재귀적으로 스캔하여 상품 이미지 매핑
function scanForProductImages(dirPath, productsByCode) {
  const results = []
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    
    entries.forEach(entry => {
      if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_')) {
        const fullPath = path.join(dirPath, entry.name)
        
        // 현재 폴더에서 이미지 찾기
        const files = fs.readdirSync(fullPath)
        
        files.forEach(file => {
          if (file.endsWith('.webp')) {
            const productCode = file.replace('.webp', '')
            
            // 해당 제품 코드가 데이터베이스에 존재하는지 확인
            if (productsByCode[productCode]) {
              const imagePath = `/images${fullPath.replace('/Users/default/Desktop/코드비프로젝트/작업 중/web/home/public/images', '')}/${file}`
              
              results.push({
                productId: productsByCode[productCode].id,
                productCode: productCode,
                categoryName: productsByCode[productCode].categoryName,
                url: imagePath,
                alt: `${productCode} 제품 이미지`,
                fileName: file,
                folderPath: fullPath
              })
            }
          }
        })
        
        // 하위 폴더도 재귀적으로 스캔
        const subResults = scanForProductImages(fullPath, productsByCode)
        results.push(...subResults)
      }
    })
  } catch (error) {
    console.warn(`폴더 스캔 실패: ${dirPath}`, error.message)
  }
  
  return results
}

async function main() {
  console.log('🔗 상품 이미지 연결 작업을 시작합니다...')
  
  try {
    // 모든 상품과 카테고리 정보 가져오기
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true
      }
    })
    
    console.log(`📦 ${products.length}개 상품 발견`)
    
    // 상품을 코드별로 매핑 (빠른 검색을 위해)
    const productsByCode = {}
    products.forEach(product => {
      if (product.code || product.name) {
        const key = product.code || product.name
        productsByCode[key] = {
          id: product.id,
          code: product.code,
          name: product.name,
          categoryName: product.category.nameKo || product.category.name,
          existingImages: product.images.length
        }
      }
    })
    
    console.log(`🔍 상품 코드 매핑 완료: ${Object.keys(productsByCode).length}개`)
    
    // 이미지 폴더 스캔
    const imagesPath = '/Users/default/Desktop/코드비프로젝트/작업 중/web/home/public/images'
    const imageMapping = scanForProductImages(imagesPath, productsByCode)
    
    console.log(`🖼️ ${imageMapping.length}개 이미지 매핑 발견`)
    
    // 기존 ProductImage 삭제 (재생성을 위해)
    await prisma.productImage.deleteMany({})
    console.log('🗑️ 기존 이미지 링크 정리 완료')
    
    // 이미지 링크 생성
    let createdCount = 0
    let orderIndex = 0
    
    for (const mapping of imageMapping) {
      try {
        await prisma.productImage.create({
          data: {
            productId: mapping.productId,
            url: mapping.url,
            alt: mapping.alt,
            orderIndex: orderIndex++
          }
        })
        
        createdCount++
        console.log(`  ✅ ${mapping.productCode}: ${mapping.fileName} → ${mapping.categoryName}`)
        
      } catch (error) {
        console.error(`  ❌ 이미지 생성 실패 (${mapping.productCode}):`, error.message)
      }
    }
    
    console.log(`\n🎉 이미지 연결 완료!`)
    console.log(`📊 결과:`)
    console.log(`- 총 이미지 링크: ${createdCount}개`)
    
    // 카테고리별 통계
    const categoryStats = {}
    imageMapping.forEach(mapping => {
      if (!categoryStats[mapping.categoryName]) {
        categoryStats[mapping.categoryName] = 0
      }
      categoryStats[mapping.categoryName]++
    })
    
    console.log(`\n📋 카테고리별 이미지 수:`)
    Object.entries(categoryStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`- ${category}: ${count}개`)
      })
    
  } catch (error) {
    console.error('❌ 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()