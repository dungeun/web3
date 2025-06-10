import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Link from 'next/link'
import { TemplateSection } from '@/types/template'

interface HeroButton {
  text: string
  link: string
  variant: string
}

interface HeroSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function HeroSection({ section, data, isPreview }: HeroSectionProps) {
  const sectionData = data[section.id] || {}
  const { 
    title = '대경하드웨어',
    subtitle = '30년 전통의 산업용 하드웨어 전문기업',
    backgroundImage = '/images/hero-bg.jpg',
    backgroundOverlay = 'rgba(0, 0, 0, 0.5)',
    height = '70vh',
    buttons = [],
    className = ''
  } = sectionData

  const defaultButtons = [
    { text: '제품 보기', link: '/products', variant: 'primary' },
    { text: '견적 문의', link: '/inquiry', variant: 'outline-light' }
  ]

  const heroButtons = buttons.length > 0 ? buttons : defaultButtons

  return (
    <section 
      className={`hero-section ${className}`}
      style={{
        background: `linear-gradient(${backgroundOverlay}, ${backgroundOverlay}), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isPreview ? 'scroll' : 'fixed',
        minHeight: height,
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}
    >
      <Container>
        <div className="text-center">
          <h1 
            className="hero-title"
            data-aos={!isPreview ? "fade-up" : undefined}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              className="hero-subtitle"
              data-aos={!isPreview ? "fade-up" : undefined}
              data-aos-delay={!isPreview ? "100" : undefined}
            >
              {subtitle}
            </p>
          )}
          
          <div 
            className="hero-buttons"
            data-aos={!isPreview ? "fade-up" : undefined}
            data-aos-delay={!isPreview ? "200" : undefined}
          >
            {heroButtons.map((button: HeroButton, index: number) => (
              !isPreview ? (
                <Link
                  key={index}
                  href={button.link}
                  className={`btn btn-${button.variant} btn-lg ${index > 0 ? 'ms-3' : ''}`}
                >
                  {button.text}
                </Link>
              ) : (
                <Button
                  key={index}
                  variant={button.variant}
                  size="lg"
                  className={index > 0 ? 'ms-3' : ''}
                  disabled
                >
                  {button.text}
                </Button>
              )
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 40px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.95;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        :global(.hero-section .btn) {
          padding: 12px 40px;
          font-weight: 600;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        :global(.hero-section .btn:hover) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        :global(.hero-section .btn-primary) {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        :global(.hero-section .btn-primary:hover) {
          background-color: #0d3560;
          border-color: #0d3560;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
            margin-bottom: 30px;
          }

          :global(.hero-section .btn) {
            padding: 10px 30px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}