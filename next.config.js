/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
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
}

module.exports = nextConfig