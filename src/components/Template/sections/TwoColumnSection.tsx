import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import { TemplateSection } from '@/types/template'

interface TwoColumnSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function TwoColumnSection({ section, data, isPreview }: TwoColumnSectionProps) {
  const sectionData = data[section.id] || {}
  const { 
    title, 
    leftContent, 
    rightContent, 
    leftImage, 
    rightImage,
    imagePosition = 'right',
    className = '' 
  } = sectionData

  const imageColumn = (
    <Col lg={6} className="mb-4 mb-lg-0">
      {(leftImage || rightImage) && (
        <div className="image-wrapper" data-aos={!isPreview ? "fade-up" : undefined}>
          <Image
            src={imagePosition === 'left' ? leftImage : rightImage}
            alt={title || 'Section image'}
            width={600}
            height={400}
            className="img-fluid rounded shadow"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
    </Col>
  )

  const contentColumn = (
    <Col lg={6}>
      <div className="content-wrapper" data-aos={!isPreview ? "fade-up" : undefined} data-aos-delay={!isPreview ? "100" : undefined}>
        {title && <h2 className="section-title mb-4">{title}</h2>}
        
        <div 
          className="section-content"
          dangerouslySetInnerHTML={{ __html: imagePosition === 'left' ? rightContent : leftContent }}
        />
      </div>
    </Col>
  )

  return (
    <section className={`two-column-section py-5 ${className}`}>
      <Container>
        <Row className="align-items-center">
          {imagePosition === 'left' ? (
            <>
              {imageColumn}
              {contentColumn}
            </>
          ) : (
            <>
              {contentColumn}
              {imageColumn}
            </>
          )}
        </Row>
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

        .image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .image-wrapper img {
          transition: transform 0.3s ease;
        }

        .image-wrapper:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}