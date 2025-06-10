import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout/Layout'
import SectionRenderer from '@/components/Template/SectionRenderer'
import { prisma } from '@/lib/prisma'

interface ProductsPageProps {
  page: {
    id: number
    title: string
    slug: string
    content: string
    templateId?: string
    sections?: any
    metaTitle?: string
    metaDescription?: string
    isPublished: boolean
  } | null
}

export default function ProductsPage({ page }: ProductsPageProps) {
  const router = useRouter()
  const { category } = router.query

  if (!page) {
    return (
      <Layout title="페이지를 찾을 수 없습니다">
        <div className="container py-5">
          <h1>페이지를 찾을 수 없습니다</h1>
          <p>요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
        </div>
      </Layout>
    )
  }

  // 페이지 제목 설정
  const pageTitle = category ? `${page.title} - ${category}` : page.title
  const metaTitle = page.metaTitle || pageTitle
  const metaDescription = page.metaDescription || `대경하드웨어 ${pageTitle}`

  return (
    <Layout 
      title={metaTitle} 
      showPageHeader={true}
    >
      <div className="container-limit py-5">
        {page.sections && Object.keys(page.sections).length > 0 ? (
          Object.entries(page.sections).map(([sectionId, section]: [string, any]) => (
            <SectionRenderer
              key={sectionId}
              section={section}
              isPreview={false}
            />
          ))
        ) : (
          <div className="text-center py-5">
            <p>콘텐츠가 준비 중입니다.</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: 'products' },
      include: {
        menu: {
          select: {
            id: true,
            title: true,
            path: true
          }
        }
      }
    })

    if (!page || !page.isPublished) {
      return {
        notFound: true
      }
    }

    // sections를 JSON으로 파싱
    let parsedPage = { ...page, sections: {} }
    try {
      parsedPage.sections = JSON.parse(page.sections || '{}')
    } catch (error) {
      parsedPage.sections = {}
    }

    return {
      props: {
        page: {
          ...parsedPage,
          createdAt: parsedPage.createdAt.toISOString(),
          updatedAt: parsedPage.updatedAt.toISOString()
        }
      }
    }
  } catch (error) {
    console.error('Error fetching page:', error)
    return {
      props: {
        page: null
      }
    }
  }
}