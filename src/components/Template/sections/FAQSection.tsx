import React, { useState } from 'react'
import { Container, Accordion } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function FAQSection({ section, data, isPreview }: FAQSectionProps) {
  const sectionData = data[section.id] || {}
  const { 
    title = '자주 묻는 질문',
    items = [] as FAQItem[],
    className = ''
  } = sectionData

  const defaultItems: FAQItem[] = [
    {
      id: '1',
      question: '견적 요청 후 답변은 얼마나 걸리나요?',
      answer: '견적 요청은 영업일 기준 1~2일 이내에 답변드리고 있습니다. 긴급한 경우 전화로 문의해 주시면 더 빠른 답변이 가능합니다.'
    },
    {
      id: '2',
      question: '최소 주문 수량이 있나요?',
      answer: '제품에 따라 최소 주문 수량이 다를 수 있습니다. 자세한 내용은 견적 문의 시 안내드리겠습니다.'
    },
    {
      id: '3',
      question: '샘플 요청이 가능한가요?',
      answer: '네, 대부분의 제품은 샘플 요청이 가능합니다. 샘플 비용과 배송 방법은 제품에 따라 상이합니다.'
    }
  ]

  const faqItems = items.length > 0 ? items : defaultItems

  return (
    <section className={`faq-section py-5 ${className}`}>
      <Container>
        <div data-aos={!isPreview ? "fade-up" : undefined}>
          <h2 className="section-title text-center mb-5">{title}</h2>
          
          <Accordion defaultActiveKey="0" className="faq-accordion">
            {faqItems.map((item: FAQItem, index: number) => (
              <Accordion.Item 
                eventKey={index.toString()} 
                key={item.id}
                data-aos={!isPreview ? "fade-up" : undefined}
                data-aos-delay={!isPreview ? (index * 100).toString() : undefined}
              >
                <Accordion.Header>
                  <i className="fas fa-question-circle me-3 text-primary"></i>
                  {item.question}
                </Accordion.Header>
                <Accordion.Body>
                  {item.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
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

        :global(.faq-accordion .accordion-item) {
          border: none;
          margin-bottom: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          border-radius: 8px !important;
          overflow: hidden;
        }

        :global(.faq-accordion .accordion-header) {
          background: none;
        }

        :global(.faq-accordion .accordion-button) {
          background-color: #f8f9fa;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 1.25rem;
          color: #333;
          border: none;
          box-shadow: none !important;
        }

        :global(.faq-accordion .accordion-button:not(.collapsed)) {
          background-color: var(--primary-color);
          color: white;
        }

        :global(.faq-accordion .accordion-button:not(.collapsed) i) {
          color: white !important;
        }

        :global(.faq-accordion .accordion-body) {
          padding: 1.5rem;
          font-size: 1rem;
          line-height: 1.8;
          color: #666;
          background-color: #fff;
        }
      `}</style>
    </section>
  )
}