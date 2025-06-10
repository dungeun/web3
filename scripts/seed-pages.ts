import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating default pages...')

  const pages = [
    {
      title: '회사소개',
      slug: 'company',
      templateId: 'company',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '대경하드웨어',
          subtitle: '30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다',
          backgroundImage: '/images/background/hero-bg.jpg',
          buttons: []
        },
        content: {
          id: 'content',
          type: 'content',
          title: '회사 소개',
          content: '<p>대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 고품질 하드웨어 소재를 제공하는 전문 기업입니다.</p>'
        }
      }),
      metaTitle: '회사소개 - 대경하드웨어',
      metaDescription: '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 최고 품질의 하드웨어 소재를 제공합니다.',
      isPublished: true
    },
    {
      title: '사업장 소개/오시는 길',
      slug: 'location',
      templateId: 'location',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '오시는 길',
          subtitle: '대경하드웨어를 찾아주셔서 감사합니다',
          backgroundImage: '/images/background/hero-bg.jpg'
        },
        map: {
          id: 'map',
          type: 'map',
          title: '찾아오시는 길',
          address: '경남 김해시 삼안로 112번길 9-14',
          lat: 35.2280,
          lng: 128.8811,
          zoom: 16
        },
        content: {
          id: 'content',
          type: 'content',
          title: '사업장 정보',
          content: '<p><strong>주소:</strong> 경남 김해시 삼안로 112번길 9-14<br><strong>전화:</strong> 055-333-6790~1<br><strong>팩스:</strong> 055-333-6792<br><strong>이메일:</strong> dkhw6789@naver.com</p>'
        }
      }),
      metaTitle: '오시는 길 - 대경하드웨어',
      metaDescription: '대경하드웨어 사업장 위치 및 연락처 정보입니다.',
      isPublished: true
    },
    {
      title: '견적문의',
      slug: 'inquiry',
      templateId: 'inquiry',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '견적 문의',
          subtitle: '고객님의 요구사항에 맞는 최적의 솔루션을 제공해드립니다',
          backgroundImage: '/images/background/hero-bg.jpg'
        },
        form: {
          id: 'form',
          type: 'form',
          title: '견적 요청 양식',
          description: '아래 양식을 작성해 주시면 빠른 시일 내에 답변드리겠습니다.',
          submitUrl: '/api/inquiry',
          submitText: '견적 요청하기',
          fields: [
            {
              name: 'company',
              label: '회사명',
              type: 'text',
              required: true
            },
            {
              name: 'name',
              label: '담당자명',
              type: 'text',
              required: true
            },
            {
              name: 'phone',
              label: '연락처',
              type: 'tel',
              required: true
            },
            {
              name: 'email',
              label: '이메일',
              type: 'email',
              required: true
            },
            {
              name: 'product',
              label: '문의 제품',
              type: 'text',
              required: true
            },
            {
              name: 'quantity',
              label: '수량',
              type: 'text',
              required: false
            },
            {
              name: 'message',
              label: '상세 내용',
              type: 'textarea',
              required: true
            }
          ]
        },
        faq: {
          id: 'faq',
          type: 'faq',
          title: '자주 묻는 질문'
        }
      }),
      metaTitle: '견적문의 - 대경하드웨어',
      metaDescription: '대경하드웨어 제품 견적 문의 페이지입니다.',
      isPublished: true
    },
    {
      title: '인증 및 특허',
      slug: 'certification',
      templateId: 'certification',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '인증 정보',
          subtitle: '대경하드웨어의 품질 인증 및 특허 정보입니다',
          backgroundImage: '/images/background/hero-bg.jpg'
        },
        gallery: {
          id: 'gallery',
          type: 'gallery',
          title: '인증서 및 특허',
          columns: 4,
          images: [
            {
              id: '1',
              url: '/images/certification/cert1.jpg',
              title: 'ISO 9001 인증서',
              description: '품질경영시스템 인증'
            },
            {
              id: '2',
              url: '/images/certification/cert2.jpg',
              title: 'ISO 14001 인증서',
              description: '환경경영시스템 인증'
            }
          ]
        },
        content: {
          id: 'content',
          type: 'content',
          title: '인증 현황',
          content: '<p>대경하드웨어는 국내외 다양한 품질 인증을 보유하고 있으며, 지속적인 품질 개선과 기술 개발을 통해 고객 만족을 실현하고 있습니다.</p>'
        }
      }),
      metaTitle: '인증정보 - 대경하드웨어',
      metaDescription: '대경하드웨어의 품질 인증 및 특허 정보를 확인하실 수 있습니다.',
      isPublished: true
    },
    {
      title: '제품소개',
      slug: 'products',
      templateId: 'products',
      content: '',
      sections: JSON.stringify({
        hero: {
          id: 'hero',
          type: 'hero',
          title: '제품 소개',
          subtitle: '대경하드웨어의 다양한 제품 라인업을 소개합니다',
          backgroundImage: '/images/background/hero-bg.jpg'
        },
        productCategories: {
          id: 'productCategories',
          type: 'product-categories',
          title: '제품 카테고리'
        },
        productGallery: {
          id: 'productGallery',
          type: 'product-gallery',
          title: '제품 갤러리'
        },
        cta: {
          id: 'cta',
          type: 'cta',
          title: '제품에 대해 더 알고 싶으신가요?',
          description: '대경하드웨어의 전문가들이 고객님에게 최적화된 제품을 제안해 드립니다.',
          buttonText: '견적 문의하기',
          buttonUrl: '/inquiry'
        }
      }),
      metaTitle: '제품소개 - 대경하드웨어',
      metaDescription: '대경하드웨어의 다양한 하드웨어 제품을 소개합니다.',
      isPublished: true
    }
  ]

  for (const pageData of pages) {
    try {
      const existing = await prisma.page.findUnique({
        where: { slug: pageData.slug }
      })

      if (!existing) {
        await prisma.page.create({
          data: pageData
        })
        console.log(`Created page: ${pageData.slug}`)
      } else {
        console.log(`Page already exists: ${pageData.slug}`)
      }
    } catch (error) {
      console.error(`Error creating page ${pageData.slug}:`, error)
    }
  }

  console.log('Page seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })