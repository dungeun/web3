import React from 'react'
import { Container } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'

interface TimelineItem {
  id: string
  year: string
  title: string
  description: string
}

interface TimelineSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function TimelineSection({ section, data, isPreview }: TimelineSectionProps) {
  const sectionData = data[section.id] || {}
  const { 
    title = '회사 연혁',
    items = [] as TimelineItem[],
    className = ''
  } = sectionData

  const defaultItems: TimelineItem[] = [
    { id: '1', year: '1989', title: '대경하드웨어 설립', description: '부산에서 산업용 하드웨어 전문 기업으로 출발' },
    { id: '2', year: '1995', title: '김해 공장 이전', description: '경남 김해시로 본사 및 공장 이전, 생산 시설 확대' },
    { id: '3', year: '2005', title: 'ISO 9001 인증', description: '품질경영시스템 국제 인증 획득' },
    { id: '4', year: '2015', title: '특허 기술 개발', description: '다중 잠금 장치 시스템 등 핵심 특허 4건 보유' },
    { id: '5', year: '2023', title: '스마트 팩토리 구축', description: 'IoT 기반 생산 관리 시스템 도입' }
  ]

  const timelineItems = items.length > 0 ? items : defaultItems

  return (
    <section className={`timeline-section py-5 ${className}`}>
      <Container>
        <h2 className="section-title text-center mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
          {title}
        </h2>
        
        <div className="timeline">
          {timelineItems.map((item: TimelineItem, index: number) => (
            <div 
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              data-aos={!isPreview ? "fade-up" : undefined}
              data-aos-delay={!isPreview ? (index * 100).toString() : undefined}
            >
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <style jsx>{`
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 30px;
          position: relative;
        }

        .section-title:after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background-color: var(--accent-color);
        }

        .timeline {
          position: relative;
          padding: 20px 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background-color: #ddd;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 50px;
          width: 50%;
        }

        .timeline-item.left {
          padding-right: 40px;
          text-align: right;
        }

        .timeline-item.right {
          left: 50%;
          padding-left: 40px;
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          top: 25px;
          width: 20px;
          height: 20px;
          background-color: var(--primary-color);
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 2px var(--primary-color);
        }

        .timeline-item.left::after {
          right: -10px;
        }

        .timeline-item.right::after {
          left: -10px;
        }

        .timeline-content {
          background-color: white;
          padding: 20px 30px;
          border-radius: 8px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .timeline-year {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 10px;
        }

        .timeline-content h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }

        .timeline-content p {
          font-size: 1rem;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 30px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 0;
            text-align: left;
          }

          .timeline-item.right {
            left: 0;
          }

          .timeline-item::after {
            left: 20px;
          }

          .timeline-item.left::after {
            left: 20px;
            right: auto;
          }
        }
      `}</style>
    </section>
  )
}