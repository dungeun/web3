import React from 'react'
import Link from 'next/link'

interface PageHeaderProps {
  title?: string
  parentPage?: string
  parentTitle?: string
}

export default function PageHeader({ title, parentPage, parentTitle }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header-overlay"></div>
      <div className="page-header-content">
        <div className="container-limit">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">홈</Link>
              </li>
              {parentPage && parentTitle && (
                <li className="breadcrumb-item">
                  <Link href={parentPage}>{parentTitle}</Link>
                </li>
              )}
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="page-title">{title}</h1>
        </div>
      </div>
    </section>
  )
}