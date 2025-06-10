const { PrismaClient } = require('../src/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// 실제 폴더 구조를 분석하여 완전한 계층형 카테고리 데이터 생성
const categoryData = [
  {
    code: 'A',
    name: 'Handlelocker & Fasterner',
    nameKo: '핸들로커 및 패스너',
    description: '핸들로커, 패스너 관련 하드웨어',
    subcategories: [
      { 
        code: 'A-1',
        name: 'Airtightness', 
        nameKo: '기밀성',
        products: [] // 하위 제품 없음
      },
      { 
        code: 'A-2',
        name: 'Cylinder lock & camlock', 
        nameKo: '실린더 락 & 캠 락',
        products: [] // 하위 제품 없음
      },
      { 
        code: 'A-3',
        name: 'Fasterner', 
        nameKo: '패스너',
        products: ['A-22T'] // 실제 제품 코드
      },
      { 
        code: 'A-4',
        name: 'Flat lock', 
        nameKo: '플랫 락',
        products: ['A-610', 'A-611', 'A-612', 'A-61S', 'A-63S', 'A-65']
      },
      { 
        code: 'A-5',
        name: 'Handle latch', 
        nameKo: '핸들 래치',
        products: ['A-5600(LH)', 'A-5606', 'H-429-1']
      },
      { 
        code: 'A-6',
        name: 'Handle lock', 
        nameKo: '핸들 락',
        products: ['MDSI-A-30', 'MDSI-A-31']
      },
      { 
        code: 'A-7',
        name: 'Lock accessory', 
        nameKo: '락 액세서리',
        products: ['A-1200-1', 'E-1200', 'MDSI-A-1T8', 'MDSI-A-35', 'MDSI-A-38-2', 'MDSI-A-38-4', 'MDSI-A-42T', 'P-1250']
      },
      { 
        code: 'A-8',
        name: 'Plane lock', 
        nameKo: '플레인 락',
        products: ['A-1088', 'A-305', 'A-307', 'A-310', 'A-313', 'A-401', 'A-403-1', 'A-403']
      },
      { 
        code: 'A-9',
        name: 'Rod control lock', 
        nameKo: '로드 컨트롤 락',
        products: ['A-31T', 'A-3T', 'A-500']
      }
    ]
  },
  {
    code: 'B',
    name: 'Hinge',
    nameKo: '힌지',
    description: '각종 힌지 제품',
    subcategories: [
      { 
        code: 'B-1',
        name: 'Butterfly hinge', 
        nameKo: '버터플라이 힌지',
        products: ['B-910', 'DK-B-6060', 'DK-B-8085', 'Dk-B-6070']
      },
      { 
        code: 'B-2',
        name: 'Other hinge', 
        nameKo: '기타 힌지',
        products: ['B-1032', 'B-1038', 'B-1050-1', 'B-1225S', 'B-1240']
      },
      { 
        code: 'B-3',
        name: 'Plage hinge', 
        nameKo: '플래그 힌지',
        products: ['B-1538LH_무', 'B-1538LH_유', 'B-1538RH', 'B-1538RH_무', 'B-2048LH_유']
      },
      { 
        code: 'B-4',
        name: 'Side hinge', 
        nameKo: '사이드 힌지',
        products: ['B-130-2', 'B-130-6']
      },
      { 
        code: 'B-5',
        name: 'Stamping hinge', 
        nameKo: '스탬핑 힌지',
        products: ['B-3100', 'B-50', 'B-55', 'B-60', 'B-7255', 'B-80', 'B-81', 'B-82', 'B-TJ260', 'DK-B-910', 'Dk-B-900']
      },
      { 
        code: 'B-6',
        name: 'Welding hinge', 
        nameKo: '웰딩 힌지',
        products: ['B-100', 'B-101', 'B-103', 'B-104', 'B-105-양', 'B-130-12', 'B-400', 'B-420', 'B-430', 'DK-B-3400']
      }
    ]
  },
  {
    code: 'C',
    name: 'Clip & Latch',
    nameKo: '클립 & 래치',
    description: '클립 및 래치 제품',
    subcategories: [
      { 
        code: 'C-1',
        name: 'Catch clip', 
        nameKo: '캐치 클립',
        products: ['C-026', 'C-033SL', 'C-100', 'C-104']
      },
      { 
        code: 'C-2',
        name: 'Latch', 
        nameKo: '래치',
        products: ['C-139', 'C-280-2', 'C-7150', 'C-7151', 'C-7152']
      },
      { 
        code: 'C-3',
        name: 'Magnetic catcher', 
        nameKo: '마그네틱 캐처',
        products: ['C-1001', 'C-1002', 'C-2001']
      },
      { 
        code: 'C-4',
        name: 'toggle clamp', 
        nameKo: '토글 클램프',
        products: ['C-016-41(S)', 'C-016-41']
      }
    ]
  },
  {
    code: 'E',
    name: 'Electrical materials',
    nameKo: '전기 자재',
    description: '전기 관련 자재',
    subcategories: [
      { 
        code: 'E-1',
        name: 'Electrical materials', 
        nameKo: '전기 자재',
        products: ['E-1216', 'E-200', 'P-102']
      }
    ]
  },
  {
    code: 'G',
    name: 'Rubber & Seals',
    nameKo: '고무 & 씰',
    description: '고무 및 씰 제품',
    subcategories: [
      { 
        code: 'G-1',
        name: 'Grommet packing', 
        nameKo: '그로밋 패킹',
        products: ['G-030', 'G-060', 'G-0603', 'G-1T-1', 'G-1T-2', 'MDSI-G-1T2', 'MDSI-G-1T3']
      },
      { 
        code: 'G-2',
        name: 'Hole packing', 
        nameKo: '홀 패킹',
        products: ['G-020', 'G-0202', 'G-050']
      },
      { 
        code: 'G-3',
        name: 'Rubber seals', 
        nameKo: '고무 씰',
        products: ['G-025', 'G-026', 'G-027', 'G-028-1,029-1', 'G-028-1', 'G-028', 'G-029-1', 'G-029-2', 'G-029', 'G-030,031']
      },
      { 
        code: 'G-4',
        name: 'other packing', 
        nameKo: '기타 패킹',
        products: ['G-024', 'MDSI-G-22T-1', 'MDSI-G-22T']
      },
      { 
        code: 'G-5',
        name: 'plane packing', 
        nameKo: '플레인 패킹',
        products: ['G-010', 'G-011', 'G-040-1', 'G-040']
      }
    ]
  },
  {
    code: 'H',
    name: 'Handle & Grip',
    nameKo: '핸들 & 그립',
    description: '핸들 및 그립 제품',
    subcategories: [
      { 
        code: 'H-1',
        name: 'Case handle', 
        nameKo: '케이스 핸들',
        products: ['H-1005', 'H-1006-1', 'H-1007S-1', 'H-350-1', 'H-360-1', 'H-370-1', 'H-717', 'MDSI-C-3T']
      },
      { 
        code: 'H-2',
        name: 'Insert handle', 
        nameKo: '인서트 핸들',
        products: ['DK-H-285', 'H-141', 'H-142', 'H-142M', 'H-143', 'H-143M', 'H-145', 'H-283', 'H-306', 'H-307']
      },
      { 
        code: 'H-3',
        name: 'Other', 
        nameKo: '기타',
        products: ['H-360', 'H-370', 'H-431', 'H-450', 'H-452', 'H-80T', 'H-8T', 'MDSI-D-90T4', 'MDSI-D-9T1', 'MDSI-D-9T2', 'MDSI-D-9T3']
      },
      { 
        code: 'H-4',
        name: 'PVC handle', 
        nameKo: 'PVC 핸들',
        products: ['H-100P-1', 'H-100S', 'H-150P-2', 'H-150P', 'H-250P', 'H-2T', 'H-75P']
      },
      { 
        code: 'H-5',
        name: 'Pull handle', 
        nameKo: '풀 핸들',
        products: ['H-10100S', 'H-610', 'H-620', 'MDSI-C-4T']
      },
      { 
        code: 'H-6',
        name: 'grip & knob', 
        nameKo: '그립 & 노브',
        products: ['P-3040', 'P-3050P', 'P-3090', 'P-6080', 'P-6080수정사진']
      }
    ]
  },
  {
    code: 'M',
    name: 'Marine part',
    nameKo: '해양 부품',
    description: '해양 관련 부품',
    subcategories: [
      { 
        code: 'M-1',
        name: 'Marine part', 
        nameKo: '해양 부품',
        products: ['B-2T, 3T', 'B-4T,5T', 'B-7T', 'B-8T', 'B-9T,10T']
      }
    ]
  },
  {
    code: 'P',
    name: 'Precision part',
    nameKo: '정밀 부품',
    description: '정밀 가공 부품',
    subcategories: [
      { 
        code: 'P-1',
        name: 'Precision part', 
        nameKo: '정밀 부품',
        products: ['P-1400', 'P-1500', 'P-1550', 'P-1620']
      }
    ]
  },
  {
    code: 'S',
    name: 'Stay & Sliderail',
    nameKo: '스테이 & 슬라이드레일',
    description: '스테이 및 슬라이드레일 제품',
    subcategories: [
      { 
        code: 'S-1',
        name: 'Gas spring', 
        nameKo: '가스 스프링',
        products: ['S-365B-1사진수정', 'S-365사진수정', 'S-460-2']
      },
      { 
        code: 'S-2',
        name: 'Slide rail', 
        nameKo: '슬라이드 레일',
        products: ['C-3521', 'C-3531']
      },
      { 
        code: 'S-3',
        name: 'Stay', 
        nameKo: '스테이',
        products: ['S-137-1,2,3', 'S-137-123', 'S-1453', 'S-1454', 'S-1454사진수정', 'S-7T-2']
      }
    ]
  }
]

async function main() {
  console.log('완전한 계층형 카테고리 데이터 입력을 시작합니다...')

  try {
    // 기존 상품 및 카테고리 데이터 삭제 (필요시)
    await prisma.product.deleteMany({})
    await prisma.productCategory.deleteMany({})
    console.log('기존 데이터 정리 완료')

    let totalProducts = 0

    for (const category of categoryData) {
      // 대분류 생성
      const mainCategory = await prisma.productCategory.create({
        data: {
          name: category.name,
          nameKo: category.nameKo,
          code: category.code,
          description: category.description,
          level: 1,
          orderIndex: category.code.charCodeAt(0) - 65, // A=0, B=1, C=2...
          isActive: true
        }
      })

      console.log(`✅ 대분류 생성: ${category.code} - ${category.nameKo}`)

      // 중분류 생성
      for (let i = 0; i < category.subcategories.length; i++) {
        const subcategory = category.subcategories[i]
        
        const subCategory = await prisma.productCategory.create({
          data: {
            name: subcategory.name,
            nameKo: subcategory.nameKo,
            code: subcategory.code,
            description: `${category.nameKo} - ${subcategory.nameKo}`,
            level: 2,
            parentId: mainCategory.id,
            orderIndex: i,
            isActive: true
          }
        })

        console.log(`  ↳ 중분류 생성: ${subcategory.code} - ${subcategory.nameKo}`)

        // 실제 상품들 생성 (소분류 대신 상품으로)
        if (subcategory.products && subcategory.products.length > 0) {
          for (let j = 0; j < subcategory.products.length; j++) {
            const productCode = subcategory.products[j]
            
            await prisma.product.create({
              data: {
                name: productCode,
                model: productCode,
                description: `${subcategory.nameKo} - ${productCode}`,
                categoryId: subCategory.id,
                orderIndex: j,
                isPublished: true,
                imageUrl: `/images/${category.code}-${category.name.replace(/\s+/g, ' ')}/`
              }
            })
            
            totalProducts++
            console.log(`    ↳ 상품 생성: ${productCode}`)
          }
        }
      }
    }

    console.log('\n🎉 모든 카테고리 및 상품 데이터 입력이 완료되었습니다!')
    
    // 생성된 데이터 확인
    const totalCategories = await prisma.productCategory.count()
    const mainCategories = await prisma.productCategory.count({ where: { level: 1 } })
    const subCategories = await prisma.productCategory.count({ where: { level: 2 } })
    const products = await prisma.product.count()
    
    console.log(`\n📊 생성 결과:`)
    console.log(`- 전체 카테고리: ${totalCategories}개`)
    console.log(`- 대분류: ${mainCategories}개`)
    console.log(`- 중분류: ${subCategories}개`)
    console.log(`- 전체 상품: ${products}개`)

  } catch (error) {
    console.error('❌ 데이터 생성 중 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()