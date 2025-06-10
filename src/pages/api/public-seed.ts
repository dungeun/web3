import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청도 허용하여 브라우저에서 직접 접근 가능
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('🌱 Starting public database seed...')

    // 1. 관리자 계정 생성
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@daekyung.com' },
      update: {},
      create: {
        email: 'admin@daekyung.com',
        password: hashedPassword,
        name: '관리자',
        role: 'admin'
      }
    })

    // 2. 사이트 설정
    const configs = [
      { key: 'siteName', value: '대경하드웨어', description: '사이트명' },
      { key: 'siteDescription', value: '하드웨어 소재 전문기업', description: '사이트 설명' },
      { key: 'contactEmail', value: 'dkhw6789@naver.com', description: '연락처 이메일' },
      { key: 'contactPhone', value: '055-333-6790~1', description: '연락처 전화번호' },
      { key: 'contactAddress', value: '경남 김해시 삼안로 112번길 9-14', description: '회사 주소' }
    ]

    for (const config of configs) {
      await prisma.siteConfig.upsert({
        where: { key: config.key },
        update: { value: config.value },
        create: config
      })
    }

    // 3. 제품 카테고리
    const categories = [
      { code: 'A', name: 'Handlelocker & Fasterner', nameKo: '핸들록커 & 패스너', orderIndex: 1 },
      { code: 'B', name: 'Hinge', nameKo: '경첩', orderIndex: 2 },
      { code: 'C', name: 'Clip & Latch', nameKo: '클립 & 래치', orderIndex: 3 },
      { code: 'G', name: 'Rubber & Seals', nameKo: '고무 & 실', orderIndex: 4 },
      { code: 'H', name: 'Handle & Grip', nameKo: '핸들 & 그립', orderIndex: 5 },
      { code: 'S', name: 'Stay & Sliderail', nameKo: '스테이 & 슬라이드레일', orderIndex: 6 }
    ]

    for (const cat of categories) {
      await prisma.productCategory.upsert({
        where: { code: cat.code },
        update: {},
        create: cat
      })
    }

    // 4. 기본 메뉴
    const menus = [
      { title: '홈', path: '/', orderIndex: 0 },
      { title: '회사소개', path: '/company', orderIndex: 1 },
      { title: '제품소개', path: '/products', orderIndex: 2 },
      { title: '인증정보', path: '/certification', orderIndex: 3 },
      { title: '견적문의', path: '/inquiry', orderIndex: 4 },
      { title: '오시는 길', path: '/location', orderIndex: 5 }
    ]

    // 기존 메뉴 삭제 후 새로 생성
    await prisma.menu.deleteMany({})
    for (const menu of menus) {
      await prisma.menu.create({ data: menu })
    }

    // 5. 히어로 슬라이드
    await prisma.heroSlide.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: '대한민국 대표 하드웨어 소재 전문기업',
        subtitle: '30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다',
        mediaType: 'IMAGE',
        mediaUrl: '/images/hero-bg.jpg',
        overlay: 30,
        orderIndex: 0,
        isActive: true
      }
    })

    // HTML 응답으로 성공 메시지 표시
    const successHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>시딩 완료</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .success { color: #28a745; }
            .info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <h1 class="success">✅ 데이터베이스 시딩 완료!</h1>
        <div class="info">
            <h3>생성된 데이터:</h3>
            <ul>
                <li>관리자 계정: ${admin.email}</li>
                <li>제품 카테고리: ${categories.length}개</li>
                <li>메뉴: ${menus.length}개</li>
                <li>사이트 설정: ${configs.length}개</li>
                <li>히어로 슬라이드: 1개</li>
            </ul>
        </div>
        <div class="info">
            <h3>관리자 로그인 정보:</h3>
            <p><strong>이메일:</strong> admin@daekyung.com</p>
            <p><strong>비밀번호:</strong> admin123</p>
        </div>
        <p><a href="/">홈페이지로 이동</a> | <a href="/admin/login">관리자 로그인</a></p>
    </body>
    </html>
    `

    res.status(200).send(successHtml)

  } catch (error) {
    console.error('Seed error:', error)
    
    const errorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>시딩 오류</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .error { color: #dc3545; }
        </style>
    </head>
    <body>
        <h1 class="error">❌ 시딩 중 오류 발생</h1>
        <p>오류 메시지: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p><a href="/">홈페이지로 이동</a></p>
    </body>
    </html>
    `
    
    res.status(500).send(errorHtml)
  }
} 