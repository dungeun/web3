/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'pxlayzgrqudrznynoocr.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  // 이미지 최적화 설정
  experimental: {
    optimizeCss: true,
  },
  // 모듈 경로 설정
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@modules': '../모듈화/modules',
    };
    return config;
  },
  // 환경변수 설정
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres.pxlayzgrqudrznynoocr:cR@wJ!%YQ6P5LK!@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres?pgbouncer=true",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pxlayzgrqudrznynoocr.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bGF5emdycXVkcnpueW5vb2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MjM1NzksImV4cCI6MjA2NTA5OTU3OX0.IYAXd-oH3PxL9cHiTYTrIgmnAvg-hNM0lfL6mUBy6Fw"
  },
}

module.exports = nextConfig