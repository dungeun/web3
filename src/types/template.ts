export interface TemplateSection {
  id: string
  type: 'hero' | 'content' | 'two-column' | 'cta' | 'faq' | 'timeline' | 'gallery' | 'form' | 'map' | 'product-categories' | 'product-gallery'
  title?: string
  content?: string
  settings?: Record<string, any>
}

export interface PageTemplate {
  id: string
  name: string
  description: string
  thumbnail?: string
  sections: TemplateSection[]
}

export interface PageContent {
  id: number
  slug: string
  title: string
  templateId: string
  sections: Record<string, any>
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

export const templates: PageTemplate[] = [
  {
    id: 'company',
    name: '회사소개 템플릿',
    description: '회사 개요, 인사말, 연혁, 비전을 포함한 템플릿',
    sections: [
      { id: 'overview', type: 'content', title: '회사 개요' },
      { id: 'ceo-message', type: 'two-column', title: '대표이사 인사말' },
      { id: 'history', type: 'timeline', title: '회사 연혁' },
      { id: 'vision', type: 'content', title: '비전 및 핵심가치' },
      { id: 'cta', type: 'cta', title: 'CTA 섹션' }
    ]
  },
  {
    id: 'location',
    name: '오시는길 템플릿',
    description: '지도, 교통편, 지사 정보를 포함한 템플릿',
    sections: [
      { id: 'address', type: 'two-column', title: '주소 및 교통편' },
      { id: 'map', type: 'map', title: '지도' },
      { id: 'branches', type: 'content', title: '지사 안내' },
      { id: 'faq', type: 'faq', title: '자주 묻는 질문' },
      { id: 'cta', type: 'cta', title: 'CTA 섹션' }
    ]
  },
  {
    id: 'inquiry',
    name: '문의하기 템플릿',
    description: '문의 양식과 연락처 정보를 포함한 템플릿',
    sections: [
      { id: 'contact-info', type: 'two-column', title: '연락처 정보' },
      { id: 'inquiry-form', type: 'form', title: '문의 양식' },
      { id: 'business-hours', type: 'content', title: '영업시간' },
      { id: 'faq', type: 'faq', title: '자주 묻는 질문' }
    ]
  },
  {
    id: 'certification',
    name: '인증/특허 템플릿',
    description: '인증서와 특허 정보를 보여주는 템플릿',
    sections: [
      { id: 'material-certs', type: 'gallery', title: '소재 인증' },
      { id: 'iso-cert', type: 'content', title: '품질 경영 시스템' },
      { id: 'patents', type: 'gallery', title: '특허 정보' },
      { id: 'cta', type: 'cta', title: 'CTA 섹션' }
    ]
  },
  {
    id: 'basic',
    name: '기본 페이지 템플릿',
    description: '자유롭게 구성 가능한 기본 템플릿',
    sections: [
      { id: 'content', type: 'content', title: '내용' }
    ]
  },
  {
    id: 'products',
    name: '제품 소개 템플릿',
    description: '제품 카테고리와 갤러리를 표시하는 템플릿',
    sections: [
      { id: 'hero', type: 'hero', title: '제품 페이지 히어로 섹션' },
      { id: 'product-categories', type: 'product-categories', title: '주요 제품 카테고리 그리드' },
      { id: 'product-gallery', type: 'product-gallery', title: '제품 이미지 갤러리' },
      { id: 'cta', type: 'cta', title: '문의하기 섹션' }
    ]
  }
]