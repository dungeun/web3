import { PrismaClient } from '../src/generated/prisma/index.js'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// 실제 폴더 구조를 스캔하여 서브카테고리 생성
async function scanAndCreateSubCategories() {
  const imageBasePath = path.join(process.cwd(), 'public', 'images')
  
  try {
    const categoryFolders = fs.readdirSync(imageBasePath).filter(item => 
      fs.statSync(path.join(imageBasePath, item)).isDirectory() && 
      !item.startsWith('.') && 
      !item.startsWith('_') &&
      item.includes('-') // A-Handlelocker 형태만
    )

    for (const categoryFolder of categoryFolders) {
      const categoryCode = categoryFolder.split('-')[0]
      const categoryPath = path.join(imageBasePath, categoryFolder)
      
      // 메인 카테고리 찾기
      const mainCategory = await prisma.productCategory.findFirst({
        where: { code: categoryCode, level: 1 }
      })

      if (!mainCategory) {
        console.log(`⚠️ 메인 카테고리를 찾을 수 없음: ${categoryCode}`)
        continue
      }

      console.log(`\n📂 ${categoryFolder} 처리 중...`)

      try {
        const subFolders = fs.readdirSync(categoryPath).filter(item => 
          fs.statSync(path.join(categoryPath, item)).isDirectory() && 
          !item.startsWith('.')
        )

        let orderIndex = 1
        for (const subFolder of subFolders) {
          // 서브카테고리 코드 생성
          const subCategoryCode = `${categoryCode}-${subFolder.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase()}`
          
          // 이미 존재하는지 확인
          const existingSubCategory = await prisma.productCategory.findFirst({
            where: { code: subCategoryCode }
          })

          if (existingSubCategory) {
            console.log(`  ⏭️ 이미 존재: ${subCategoryCode}`)
            continue
          }

          // 새 서브카테고리 생성
          const newSubCategory = await prisma.productCategory.create({
            data: {
              code: subCategoryCode,
              name: subFolder,
              nameKo: subFolder, // 한글명은 동일하게
              level: 2,
              parentId: mainCategory.id,
              orderIndex: orderIndex++
            }
          })

          console.log(`  ✅ 생성: ${subCategoryCode} - ${subFolder}`)
        }
      } catch (error) {
        console.error(`❌ ${categoryFolder} 처리 실패:`, error)
      }
    }
  } catch (error) {
    console.error('폴더 스캔 실패:', error)
  }
}

async function main() {
  console.log('📂 모든 서브카테고리 생성 시작...')
  
  await scanAndCreateSubCategories()
  
  console.log('\n🎉 서브카테고리 생성 완료!')
  
  // 생성된 카테고리 확인
  const allCategories = await prisma.productCategory.findMany({
    orderBy: [{ level: 'asc' }, { orderIndex: 'asc' }]
  })
  
  console.log('\n📊 전체 카테고리 구조:')
  for (const category of allCategories) {
    const indent = category.level === 1 ? '' : '  '
    console.log(`${indent}${category.code}: ${category.nameKo || category.name}`)
  }
}

main()
  .catch((e) => {
    console.error('오류:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 