import React from 'react'
import { Container } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'

interface ContentSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function ContentSection({ section, data, isPreview }: ContentSectionProps) {
  const sectionData = data[section.id] || {}
  const { title, content, className = '' } = sectionData

  return (
    <section className={`content-section py-5 ${className}`}>
      <Container>
        {title && (
          <h2 className="section-title mb-4" data-aos={!isPreview ? "fade-up" : undefined}>
            {title}
          </h2>
        )}
        
        {content && (
          <div 
            className="section-content"
            data-aos={!isPreview ? "fade-up" : undefined}
            data-aos-delay={!isPreview ? "100" : undefined}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </Container>

      <style jsx>{`
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 15px;
        }

        .section-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: var(--accent-color);
        }

        .section-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
        }

        .section-content h3 {
          font-size: 1.8rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          color: var(--primary-color);
        }

        .section-content h4 {
          font-size: 1.4rem;
          font-weight: 600;
          margin: 1.5rem 0 1rem;
          color: #444;
        }

        .section-content p {
          margin-bottom: 1rem;
        }

        .section-content ul {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .section-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </section>
  )
}