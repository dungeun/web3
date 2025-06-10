import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Link from 'next/link'
import { TemplateSection } from '@/types/template'

interface CTASectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function CTASection({ section, data, isPreview }: CTASectionProps) {
  const sectionData = data[section.id] || {}
  const { 
    title = '대경하드웨어와 함께하세요',
    subtitle = '30년 이상의 경험과 기술력을 바탕으로 최고의 하드웨어 소재를 제공합니다.',
    buttonText = '견적 문의하기',
    buttonLink = '/inquiry',
    backgroundImage = '/images/background/cta-bg.jpg',
    backgroundColor = 'rgba(0, 0, 0, 0.7)'
  } = sectionData

  return (
    <section 
      className="cta-section"
      style={{
        background: `linear-gradient(${backgroundColor}, ${backgroundColor}), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isPreview ? 'scroll' : 'fixed'
      }}
    >
      <Container>
        <div className="text-center" data-aos={!isPreview ? "fade-up" : undefined}>
          <h2 className="cta-title">{title}</h2>
          <p className="cta-subtitle">{subtitle}</p>
          
          {!isPreview ? (
            <Link href={buttonLink} className="btn btn-outline-light btn-lg cta-button">
              {buttonText}
            </Link>
          ) : (
            <Button variant="outline-light" size="lg" className="cta-button">
              {buttonText}
            </Button>
          )}
        </div>
      </Container>

      <style jsx>{`
        .cta-section {
          color: white;
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .cta-subtitle {
          font-size: 1.2rem;
          margin-bottom: 30px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }

        :global(.cta-button) {
          padding: 12px 40px;
          font-weight: 600;
          border-width: 2px;
          transition: all 0.3s ease;
        }

        :global(.cta-button:hover) {
          background-color: white;
          color: var(--primary-color);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 2rem;
          }

          .cta-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}