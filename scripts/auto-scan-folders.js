const { PrismaClient } = require('../src/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// 폴더 구조를 재귀적으로 스캔하는 함수
function scanDirectory(dirPath, level = 1, parentCode = '') {
  const items = []
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    
    entries.forEach((entry, index) => {
      if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_')) {
        const currentCode = level === 1 ? entry.name.split('-')[0] : `${parentCode}-${index + 1}`
        const fullPath = path.join(dirPath, entry.name)
        
        // 폴더명에서 영문명과 한글명 추출
        let name = entry.name
        let nameKo = null
        
        // 폴더명 패턴 분석 (예: "A-Handlelocker & Fasterner" 또는 "Fasterner")
        if (name.includes('-') && level === 1) {
          const parts = name.split('-', 2)
          if (parts.length === 2) {
            name = parts[1].trim()
          }
        }
        
        // 한글명 매핑
        const koreanMapping = {
          // A 계열
          'Handlelocker & Fasterner': '핸들로커 및 패스너',
          'Airtightness': '기밀성',
          'Cylinder lock & camlock': '실린더 락 & 캠 락',
          'Fasterner': '패스너',
          'Flat lock': '플랫 락',
          'Handle latch': '핸들 래치',
          'Handle lock': '핸들 락',
          'Lock accessory': '락 액세서리',
          'Plane lock': '플레인 락',
          'Rod control lock': '로드 컨트롤 락',
          
          // B 계열
          'Hinge': '힌지',
          'Butterfly hinge': '버터플라이 힌지',
          'Other hinge': '기타 힌지',
          'Plage hinge': '플래그 힌지',
          'Side hinge': '사이드 힌지',
          'Stamping hinge': '스탬핑 힌지',
          'Welding hinge': '웰딩 힌지',
          
          // C 계열
          'Clip & latch': '클립 & 래치',
          'Catch clip': '캐치 클립',
          'Latch': '래치',
          'Magnetic catcher': '마그네틱 캐처',
          'toggle clamp': '토글 클램프',
          
          // E 계열
          'Electrical materials': '전기 자재',
          
          // G 계열
          'Rubber & Seals': '고무 & 씰',
          'Grommet packing': '그로밋 패킹',
          'Hole packing': '홀 패킹',
          'Rubber seals': '고무 씰',
          'other packing': '기타 패킹',
          'plane packing': '플레인 패킹',
          
          // H 계열
          'Handle & grip': '핸들 & 그립',
          'Case handle': '케이스 핸들',
          'Insert handle': '인서트 핸들',
          'Other': '기타',
          'PVC handle': 'PVC 핸들',
          'Pull handle': '풀 핸들',
          'grip &  knob': '그립 & 노브',
          
          // M 계열
          'Marine part': '해양 부품',
          
          // P 계열
          'Precision part': '정밀 부품',
          
          // S 계열
          'Stay & sliderail': '스테이 & 슬라이드레일',
          'Gas spring': '가스 스프링',
          'Slide rail': '슬라이드 레일',
          'Stay': '스테이'
        }
        
        nameKo = koreanMapping[name] || name
        
        // 하위 폴더 스캔
        const children = scanDirectory(fullPath, level + 1, currentCode)
        
        // 제품 파일들 스캔 (jpg, webp 파일들)
        const products = []
        try {
          const files = fs.readdirSync(fullPath)
          files.forEach(file => {
            if (file.endsWith('.jpg') && !file.endsWith('.webp')) {
              // .webp 확장자 제거하고 제품 코드만 추출
              const productCode = file.replace('.jpg', '')
              products.push(productCode)
            }
          })
        } catch (err) {
          // 파일 읽기 실패해도 무시
        }
        
        const item = {
          code: currentCode,
          name: name,
          nameKo: nameKo,
          level: level,
          children: children,
          products: products,
          description: level === 1 ? `${nameKo} 관련 하드웨어` : `${nameKo} 제품군`
        }
        
        items.push(item)
      }
    })
  } catch (error) {
    console.error(`폴더 스캔 오류 (${dirPath}):`, error.message)
  }
  
  return items
}

// 제품 파일 스캔 함수
function getProductsFromFolder(folderPath) {
  const products = []
  try {
    const files = fs.readdirSync(folderPath)
    files.forEach(file => {
      if (file.endsWith('.jpg') && !files.includes(file.replace('.jpg', '.webp'))) {
        // .webp 버전이 없는 jpg 파일만 (중복 방지)
        const productCode = file.replace('.jpg', '')
        products.push(productCode)
      } else if (file.endsWith('.jpg')) {
        // .webp 버전이 있어도 jpg를 기준으로 함
        const productCode = file.replace('.jpg', '')
        if (!products.includes(productCode)) {
          products.push(productCode)
        }
      }
    })
  } catch (error) {
    // 폴더 읽기 실패
  }
  return products
}

// 데이터베이스에 저장하는 함수
async function saveToDatabase(categories) {
  // 기존 데이터 삭제
  await prisma.product.deleteMany({})
  await prisma.productCategory.deleteMany({})
  console.log('기존 데이터 정리 완료')
  
  let totalCategories = 0
  let totalProducts = 0
  
  // 대분류 생성
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    
    const mainCategory = await prisma.productCategory.create({
      data: {
        code: category.code,
        name: category.name,
        nameKo: category.nameKo,
        description: category.description,
        level: 1,
        orderIndex: i,
        isActive: true
      }
    })
    
    totalCategories++
    console.log(`✅ 대분류 생성: ${category.code} - ${category.nameKo}`)
    
    // 중분류 생성
    for (let j = 0; j < category.children.length; j++) {
      const subCategory = category.children[j]
      
      const subCat = await prisma.productCategory.create({
        data: {
          code: subCategory.code,
          name: subCategory.name,
          nameKo: subCategory.nameKo,
          description: subCategory.description,
          level: 2,
          parentId: mainCategory.id,
          orderIndex: j,
          isActive: true
        }
      })
      
      totalCategories++
      console.log(`  ↳ 중분류 생성: ${subCategory.code} - ${subCategory.nameKo}`)
      
      // 소분류 생성
      for (let k = 0; k < subCategory.children.length; k++) {
        const subSubCategory = subCategory.children[k]
        
        const subSubCat = await prisma.productCategory.create({
          data: {
            code: subSubCategory.code,
            name: subSubCategory.name,
            nameKo: subSubCategory.nameKo,
            description: subSubCategory.description,
            level: 3,
            parentId: subCat.id,
            orderIndex: k,
            isActive: true
          }
        })
        
        totalCategories++
        console.log(`    ↳ 소분류 생성: ${subSubCategory.code} - ${subSubCategory.nameKo}`)
        
        // 소분류의 제품 생성
        for (let p = 0; p < subSubCategory.products.length; p++) {
          const productCode = subSubCategory.products[p]
          
          await prisma.product.create({
            data: {
              name: productCode,
              model: productCode,
              description: `${subSubCategory.nameKo} - ${productCode}`,
              categoryId: subSubCat.id,
              orderIndex: p,
              isPublished: true,
              imageUrl: `/images/${category.code}-${category.name}/${subCategory.name}/${subSubCategory.name}/${productCode}.jpg`
            }
          })
          
          totalProducts++
          console.log(`      ↳ 제품 생성: ${productCode}`)
        }
      }
      
      // 중분류에 직접 속한 제품들 생성
      for (let p = 0; p < subCategory.products.length; p++) {
        const productCode = subCategory.products[p]
        
        await prisma.product.create({
          data: {
            name: productCode,
            model: productCode,
            description: `${subCategory.nameKo} - ${productCode}`,
            categoryId: subCat.id,
            orderIndex: p,
            isPublished: true,
            imageUrl: `/images/${category.code}-${category.name}/${subCategory.name}/${productCode}.jpg`
          }
        })
        
        totalProducts++
        console.log(`    ↳ 제품 생성: ${productCode}`)
      }
    }
  }
  
  return { totalCategories, totalProducts }
}

async function main() {
  console.log('폴더 구조 자동 스캔을 시작합니다...')
  
  const imagesPath = '/Users/default/Desktop/코드비프로젝트/작업 중/web/home/public/images'
  
  try {
    // 폴더 구조 스캔
    console.log('📁 폴더 구조 분석 중...')
    const categories = scanDirectory(imagesPath)
    
    console.log(`📊 스캔 결과: ${categories.length}개 대분류 발견`)
    categories.forEach(cat => {
      console.log(`- ${cat.code}: ${cat.nameKo} (중분류 ${cat.children.length}개)`)
      cat.children.forEach(sub => {
        console.log(`  - ${sub.code}: ${sub.nameKo} (소분류 ${sub.children.length}개, 제품 ${sub.products.length}개)`)
        sub.children.forEach(subsub => {
          console.log(`    - ${subsub.code}: ${subsub.nameKo} (제품 ${subsub.products.length}개)`)
        })
      })
    })
    
    // 데이터베이스에 저장
    console.log('\n💾 데이터베이스에 저장 중...')
    const result = await saveToDatabase(categories)
    
    console.log('\n🎉 폴더 구조 자동 import 완료!')
    console.log(`📊 최종 결과:`)
    console.log(`- 전체 카테고리: ${result.totalCategories}개`)
    console.log(`- 전체 제품: ${result.totalProducts}개`)
    
  } catch (error) {
    console.error('❌ 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()