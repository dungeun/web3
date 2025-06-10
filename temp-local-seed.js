// 임시 로컬 시딩 스크립트
console.log('🌱 Creating temporary local data structure...')

const sampleData = {
  admin: {
    email: 'admin@daekyung.com',
    password: 'admin123', // 실제로는 해시화됨
    name: '관리자',
    role: 'admin'
  },
  
  categories: [
    { code: 'A', name: 'Handlelocker & Fasterner', nameKo: '핸들록커 & 패스너' },
    { code: 'B', name: 'Hinge', nameKo: '경첩' },
    { code: 'C', name: 'Clip & Latch', nameKo: '클립 & 래치' },
    { code: 'G', name: 'Rubber & Seals', nameKo: '고무 & 실' },
    { code: 'H', name: 'Handle & Grip', nameKo: '핸들 & 그립' },
    { code: 'S', name: 'Stay & Sliderail', nameKo: '스테이 & 슬라이드레일' }
  ],
  
  menus: [
    { title: '홈', path: '/' },
    { title: '회사소개', path: '/company' },
    { title: '제품소개', path: '/products' },
    { title: '인증정보', path: '/certification' },
    { title: '견적문의', path: '/inquiry' },
    { title: '오시는 길', path: '/location' }
  ],
  
  siteConfig: {
    siteName: '대경하드웨어',
    siteDescription: '하드웨어 소재 전문기업',
    contactEmail: 'dkhw6789@naver.com',
    contactPhone: '055-333-6790~1',
    contactAddress: '경남 김해시 삼안로 112번길 9-14'
  }
}

console.log('📋 Sample data structure created:')
console.log('- Admin user ready')
console.log('- 6 product categories')
console.log('- 6 main menu items')
console.log('- Site configuration')

console.log('\n🔧 Next steps:')
console.log('1. Check Supabase project status (Resume if paused)')
console.log('2. Verify Vercel environment variables')
console.log('3. Redeploy to Vercel')
console.log('4. Use Vercel API endpoint for seeding')

console.log('\n📞 If you need immediate help:')
console.log('- Share Supabase dashboard screenshot')
console.log('- Check if project is paused/active')
console.log('- Verify database connection string')

module.exports = sampleData 