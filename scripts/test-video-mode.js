const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function testVideoMode() {
  try {
    // Update hero type to video
    const heroType = await prisma.siteConfig.update({
      where: { key: 'heroType' },
      data: { value: 'video' }
    })
    console.log('✅ Hero type updated to video:', heroType)

    // Set a sample YouTube URL
    const videoUrl = await prisma.siteConfig.update({
      where: { key: 'heroVideoUrl' },
      data: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    })
    console.log('✅ Hero video URL updated:', videoUrl)

    console.log('\n✅ Video mode test configuration set successfully!')
    console.log('Visit the admin settings page to change back to slides mode.')
  } catch (error) {
    console.error('Error setting video mode:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Uncomment the line below to test video mode
// testVideoMode()

console.log(`
To test video mode, uncomment the testVideoMode() line at the bottom of this file and run:
node scripts/test-video-mode.js

This will:
1. Set hero type to 'video'
2. Set a sample YouTube URL
3. You can then visit the home page to see the video hero
4. Go to admin settings to switch back to slides mode
`)