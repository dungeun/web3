import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Layout } from '@/components/Layout'
import SectionRenderer from '@/components/Template/SectionRenderer'
import { prisma } from '@/lib/prisma'
import { TemplateSection } from '@/types/template'
import { Container } from 'react-bootstrap'

interface CompanyPageProps {
  page: {
    title: string
    slug: string
    sections: TemplateSection[]
    metaTitle?: string
    metaDescription?: string
  }
}

export default function CompanyPage({ page }: CompanyPageProps) {
  return (
    <Layout 
      title={page.title} 
      showPageHeader={true}
    >
      <Head>
        {page.metaTitle && <title>{page.metaTitle}</title>}
        {page.metaDescription && <meta name="description" content={page.metaDescription} />}
      </Head>

      <div className="template-page">
        {page.sections && page.sections.length > 0 ? (
          page.sections.map((section) => (
            <SectionRenderer 
              key={section.id} 
              section={section}
            />
          ))
        ) : (
          <Container className="py-5">
            <p className="text-center text-muted">페이지 내용이 없습니다.</p>
          </Container>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch page data from database
    const page = await prisma.page.findUnique({
      where: { slug: 'company' }
    })

    // If page doesn't exist or is unpublished, return 404
    if (!page || !page.isPublished) {
      return {
        notFound: true
      }
    }

    // Parse sections JSON data
    let sections: TemplateSection[] = []
    if (page.sections) {
      try {
        sections = JSON.parse(page.sections)
      } catch (error) {
        console.error('Failed to parse sections:', error)
        sections = []
      }
    }

    return {
      props: {
        page: {
          title: page.title,
          slug: page.slug,
          sections,
          metaTitle: page.metaTitle || page.title,
          metaDescription: page.metaDescription
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch company page:', error)
    return {
      notFound: true
    }
  }
}