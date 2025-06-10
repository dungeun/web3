const { PrismaClient } = require('../src/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// 무제한 깊이로 폴더 구조를 재귀적으로 스캔하는 함수
function scanDirectoryRecursive(dirPath, level = 1, parentCode = '', maxLevel = 10) {
  const items = []
  
  // 무한 재귀 방지
  if (level > maxLevel) {
    console.warn(`최대 깊이(${maxLevel}) 도달: ${dirPath}`)
    return items
  }
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    let folderIndex = 0
    
    entries.forEach((entry) => {
      if (entry.isDirectory() && 
          !entry.name.startsWith('.') && 
          !entry.name.startsWith('_') &&
          entry.name !== 'node_modules' &&
          entry.name !== 'dist' &&
          entry.name !== 'build') {
        
        folderIndex++
        const fullPath = path.join(dirPath, entry.name)
        
        // 코드 생성: level 1은 폴더명 첫글자, 그 이후는 순차번호
        let currentCode
        if (level === 1) {
          // 대분류: 폴더명에서 첫 번째 문자 추출 (예: A-Handlelocker -> A)
          currentCode = entry.name.split('-')[0] || entry.name.charAt(0).toUpperCase()
        } else {
          // 하위분류: 부모코드-순번
          currentCode = `${parentCode}-${folderIndex}`
        }
        
        // 폴더명에서 영문명 추출
        let name = entry.name
        if (name.includes('-') && level === 1) {
          const parts = name.split('-', 2)
          if (parts.length === 2) {
            name = parts[1].trim()
          }
        }
        
        // 한글명 매핑
        const nameKo = getKoreanName(name) || name
        
        // 현재 폴더의 제품 파일들 스캔
        const products = getProductsFromFolder(fullPath)
        
        // 하위 폴더들 재귀적으로 스캔
        const children = scanDirectoryRecursive(fullPath, level + 1, currentCode, maxLevel)
        
        const item = {
          code: currentCode,
          name: name,
          nameKo: nameKo,
          level: level,
          parentCode: parentCode || null,
          children: children,
          products: products,
          description: generateDescription(nameKo, level),
          path: fullPath
        }
        
        items.push(item)
        
        // 스캔 로그
        const indent = '  '.repeat(level - 1)
        const levelName = getLevelName(level)
        console.log(`${indent}📁 [${levelName}] ${currentCode}: ${nameKo} (하위폴더 ${children.length}개, 제품 ${products.length}개)`)
      }
    })
  } catch (error) {
    console.error(`폴더 스캔 오류 (${dirPath}):`, error.message)
  }
  
  return items
}

// 한글명 매핑 함수
function getKoreanName(englishName) {
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
    'Stay & Sliderail': '스테이 & 슬라이드레일',
    'Gas spring': '가스 스프링',
    'Slide rail': '슬라이드 레일',
    'Stay': '스테이'
  }
  
  return koreanMapping[englishName]
}

// 레벨별 명칭 함수
function getLevelName(level) {
  const levelNames = {
    1: '대분류',
    2: '중분류', 
    3: '소분류',
    4: '세분류',
    5: '5단계',
    6: '6단계',
    7: '7단계',
    8: '8단계',
    9: '9단계',
    10: '10단계'
  }
  return levelNames[level] || `${level}단계`
}

// 설명 생성 함수
function generateDescription(nameKo, level) {
  switch(level) {
    case 1: return `${nameKo} 관련 하드웨어`
    case 2: return `${nameKo} 제품군`
    case 3: return `${nameKo} 세부 카테고리`
    default: return `${nameKo} 분류`
  }
}

// 제품 파일 스캔 함수
function getProductsFromFolder(folderPath) {
  const products = []
  try {
    const files = fs.readdirSync(folderPath)
    const imageFiles = new Set()
    
    files.forEach(file => {
      if (file.endsWith('.jpg')) {
        const baseName = file.replace('.jpg', '')
        imageFiles.add(baseName)
      } else if (file.endsWith('.webp')) {
        const baseName = file.replace('.webp', '')
        imageFiles.add(baseName)
      }
    })
    
    // 중복 제거된 제품 코드들
    products.push(...Array.from(imageFiles))
  } catch (error) {
    // 파일 읽기 실패해도 무시
  }
  return products.sort()
}

// 데이터베이스에 재귀적으로 저장하는 함수
async function saveCategoryRecursive(categoryData, parentId = null) {
  let totalCategories = 0
  let totalProducts = 0
  
  for (let i = 0; i < categoryData.length; i++) {
    const category = categoryData[i]
    
    // 카테고리 생성
    const createdCategory = await prisma.productCategory.create({
      data: {
        code: category.code,
        name: category.name,
        nameKo: category.nameKo,
        description: category.description,
        level: category.level,
        parentId: parentId,
        orderIndex: i,
        isActive: true
      }
    })
    
    totalCategories++
    
    const indent = '  '.repeat(category.level - 1)
    const levelName = getLevelName(category.level)
    console.log(`${indent}✅ [${levelName}] 생성: ${category.code} - ${category.nameKo}`)
    
    // 제품들 생성
    for (let p = 0; p < category.products.length; p++) {
      const productCode = category.products[p]
      
      await prisma.product.create({
        data: {
          name: productCode,
          model: productCode,
          description: `${category.nameKo} - ${productCode}`,
          categoryId: createdCategory.id,
          orderIndex: p,
          isPublished: true,
          imageUrl: `/images${category.path.replace('/Users/default/Desktop/코드비프로젝트/작업 중/web/home/public/images', '')}/${productCode}.jpg`
        }
      })
      
      totalProducts++
      console.log(`${indent}    ↳ 제품 생성: ${productCode}`)
    }
    
    // 하위 카테고리들 재귀적으로 생성
    if (category.children && category.children.length > 0) {
      const childResult = await saveCategoryRecursive(category.children, createdCategory.id)
      totalCategories += childResult.totalCategories
      totalProducts += childResult.totalProducts
    }
  }
  
  return { totalCategories, totalProducts }
}

async function main() {
  console.log('🔍 무제한 깊이 폴더 구조 자동 스캔을 시작합니다...')
  
  const imagesPath = '/Users/default/Desktop/코드비프로젝트/작업 중/web/home/public/images'
  
  try {
    // 기존 데이터 삭제
    console.log('🗑️ 기존 데이터 정리 중...')
    await prisma.product.deleteMany({})
    await prisma.productCategory.deleteMany({})
    console.log('✅ 기존 데이터 정리 완료')
    
    // 폴더 구조 스캔
    console.log('📁 폴더 구조 분석 중...')
    const categories = scanDirectoryRecursive(imagesPath, 1, '', 10) // 최대 10단계까지
    
    console.log(`\n📊 스캔 완료: ${categories.length}개 대분류 발견`)
    
    // 데이터베이스에 저장
    console.log('\n💾 데이터베이스에 저장 중...')
    const result = await saveCategoryRecursive(categories)
    
    // 최종 통계
    const finalStats = await prisma.productCategory.groupBy({
      by: ['level'],
      _count: {
        id: true
      },
      orderBy: {
        level: 'asc'
      }
    })
    
    console.log('\n🎉 무제한 깊이 폴더 구조 import 완료!')
    console.log(`📊 최종 결과:`)
    console.log(`- 전체 카테고리: ${result.totalCategories}개`)
    console.log(`- 전체 제품: ${result.totalProducts}개`)
    
    console.log('\n📋 레벨별 통계:')
    finalStats.forEach(stat => {
      const levelName = getLevelName(stat.level)
      console.log(`- ${levelName}: ${stat._count.id}개`)
    })
    
  } catch (error) {
    console.error('❌ 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()