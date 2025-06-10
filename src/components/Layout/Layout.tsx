import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import PageHeader from './PageHeader'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  showPageHeader?: boolean
  parentPage?: string
  parentTitle?: string
}

export default function Layout({ 
  children, 
  title = '대경하드웨어',
  showPageHeader = false,
  parentPage,
  parentTitle
}: LayoutProps) {
  const pageTitle = title === '홈' ? '대경하드웨어' : `${title} - 대경하드웨어`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="대경하드웨어 - 하드웨어 소재 전문기업" />
      </Head>
      
      <div className="layout-wrapper">
        <Header />
        
        {showPageHeader && (
          <PageHeader 
            title={title}
            parentPage={parentPage}
            parentTitle={parentTitle}
          />
        )}
        
        <main className="main-content">{children}</main>
        
        <Footer />
      </div>
    </>
  )
}