const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function seedHeroConfig() {
  try {
    // Add hero type configuration
    const heroTypeConfig = await prisma.siteConfig.upsert({
      where: { key: 'heroType' },
      update: { value: 'slides' },
      create: {
        key: 'heroType',
        value: 'slides',
        description: '메인 페이지 히어로 섹션 타입 (slides: 슬라이드, video: 비디오)'
      }
    })
    console.log('✅ Hero type config created:', heroTypeConfig)

    // Add YouTube URL configuration for video mode
    const youtubeUrlConfig = await prisma.siteConfig.upsert({
      where: { key: 'heroVideoUrl' },
      update: { value: '' },
      create: {
        key: 'heroVideoUrl',
        value: '',
        description: '히어로 섹션 YouTube 비디오 URL'
      }
    })
    console.log('✅ Hero video URL config created:', youtubeUrlConfig)

    // Add video overlay opacity configuration
    const overlayConfig = await prisma.siteConfig.upsert({
      where: { key: 'heroVideoOverlay' },
      update: { value: '50' },
      create: {
        key: 'heroVideoOverlay',
        value: '50',
        description: '히어로 비디오 오버레이 투명도 (0-100)'
      }
    })
    console.log('✅ Hero video overlay config created:', overlayConfig)

    // Add hero title configuration
    const heroTitleConfig = await prisma.siteConfig.upsert({
      where: { key: 'heroTitle' },
      update: { value: '대한민국 대표 하드웨어 소재 전문기업' },
      create: {
        key: 'heroTitle',
        value: '대한민국 대표 하드웨어 소재 전문기업',
        description: '히어로 섹션 메인 타이틀'
      }
    })
    console.log('✅ Hero title config created:', heroTitleConfig)

    // Add hero subtitle configuration
    const heroSubtitleConfig = await prisma.siteConfig.upsert({
      where: { key: 'heroSubtitle' },
      update: { value: '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.' },
      create: {
        key: 'heroSubtitle',
        value: '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.',
        description: '히어로 섹션 서브타이틀'
      }
    })
    console.log('✅ Hero subtitle config created:', heroSubtitleConfig)

    console.log('\n✅ All hero configurations created successfully!')
  } catch (error) {
    console.error('Error seeding hero configurations:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedHeroConfig()
  .catch((error) => {
    console.error('Failed to seed hero configurations:', error)
    process.exit(1)
  })