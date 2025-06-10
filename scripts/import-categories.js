const { PrismaClient } = require('../src/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// 폴더 구조를 분석하여 카테고리 데이터 생성
const categoryData = [
  {
    code: 'A',
    name: 'Handlelocker & Fasterner',
    nameKo: '핸들로커 및 패스너',
    description: '핸들로커, 패스너 관련 하드웨어',
    subcategories: [
      { name: 'Airtightness', nameKo: '기밀성' },
      { name: 'Cylinder lock & camlock', nameKo: '실린더 락 & 캠 락' },
      { name: 'Fasterner', nameKo: '패스너' },
      { name: 'Flat lock', nameKo: '플랫 락' },
      { name: 'Handle latch', nameKo: '핸들 래치' },
      { name: 'Handle lock', nameKo: '핸들 락' },
      { name: 'Lock accessory', nameKo: '락 액세서리' },
      { name: 'Plane lock', nameKo: '플레인 락' },
      { name: 'Rod control lock', nameKo: '로드 컨트롤 락' }
    ]
  },
  {
    code: 'B',
    name: 'Hinge',
    nameKo: '힌지',
    description: '각종 힌지 제품',
    subcategories: [
      { name: 'Butterfly hinge', nameKo: '버터플라이 힌지' },
      { name: 'Other hinge', nameKo: '기타 힌지' },
      { name: 'Plage hinge', nameKo: '플래그 힌지' },
      { name: 'Side hinge', nameKo: '사이드 힌지' },
      { name: 'Stamping hinge', nameKo: '스탬핑 힌지' },
      { name: 'Welding hinge', nameKo: '웰딩 힌지' }
    ]
  },
  {
    code: 'C',
    name: 'Clip & Latch',
    nameKo: '클립 & 래치',
    description: '클립 및 래치 제품',
    subcategories: [
      { name: 'Catch clip', nameKo: '캐치 클립' },
      { name: 'Latch', nameKo: '래치' },
      { name: 'Magnetic catcher', nameKo: '마그네틱 캐처' },
      { name: 'toggle clamp', nameKo: '토글 클램프' }
    ]
  },
  {
    code: 'E',
    name: 'Electrical materials',
    nameKo: '전기 자재',
    description: '전기 관련 자재',
    subcategories: []
  },
  {
    code: 'G',
    name: 'Rubber & Seals',
    nameKo: '고무 & 씰',
    description: '고무 및 씰 제품',
    subcategories: [
      { name: 'Grommet packing', nameKo: '그로밋 패킹' },
      { name: 'Hole packing', nameKo: '홀 패킹' },
      { name: 'Rubber seals', nameKo: '고무 씰' },
      { name: 'other packing', nameKo: '기타 패킹' },
      { name: 'plane packing', nameKo: '플레인 패킹' }
    ]
  },
  {
    code: 'H',
    name: 'Handle & Grip',
    nameKo: '핸들 & 그립',
    description: '핸들 및 그립 제품',
    subcategories: [
      { name: 'Case handle', nameKo: '케이스 핸들' },
      { name: 'Insert handle', nameKo: '인서트 핸들' },
      { name: 'Other', nameKo: '기타' },
      { name: 'PVC handle', nameKo: 'PVC 핸들' },
      { name: 'Pull handle', nameKo: '풀 핸들' },
      { name: 'grip & knob', nameKo: '그립 & 노브' }
    ]
  },
  {
    code: 'M',
    name: 'Marine part',
    nameKo: '해양 부품',
    description: '해양 관련 부품',
    subcategories: []
  },
  {
    code: 'P',
    name: 'Precision part',
    nameKo: '정밀 부품',
    description: '정밀 가공 부품',
    subcategories: []
  },
  {
    code: 'S',
    name: 'Stay & Sliderail',
    nameKo: '스테이 & 슬라이드레일',
    description: '스테이 및 슬라이드레일 제품',
    subcategories: [
      { name: 'Gas spring', nameKo: '가스 스프링' },
      { name: 'Slide rail', nameKo: '슬라이드 레일' },
      { name: 'Stay', nameKo: '스테이' }
    ]
  }
]

async function main() {
  console.log('카테고리 데이터 입력을 시작합니다...')

  try {
    // 기존 카테고리 데이터 삭제 (선택사항)
    // await prisma.productCategory.deleteMany({})
    // console.log('기존 카테고리 데이터 삭제 완료')

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
        
        await prisma.productCategory.create({
          data: {
            name: subcategory.name,
            nameKo: subcategory.nameKo,
            code: `${category.code}-${i + 1}`,
            description: `${category.nameKo} - ${subcategory.nameKo}`,
            level: 2,
            parentId: mainCategory.id,
            orderIndex: i,
            isActive: true
          }
        })

        console.log(`  ↳ 중분류 생성: ${subcategory.nameKo}`)
      }
    }

    console.log('\n🎉 모든 카테고리 데이터 입력이 완료되었습니다!')
    
    // 생성된 카테고리 확인
    const totalCategories = await prisma.productCategory.count()
    const mainCategories = await prisma.productCategory.count({ where: { level: 1 } })
    const subCategories = await prisma.productCategory.count({ where: { level: 2 } })
    
    console.log(`\n📊 생성 결과:`)
    console.log(`- 전체 카테고리: ${totalCategories}개`)
    console.log(`- 대분류: ${mainCategories}개`)
    console.log(`- 중분류: ${subCategories}개`)

  } catch (error) {
    console.error('❌ 카테고리 생성 중 오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()