import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  options?: string[]
  placeholder?: string
}

interface FormSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function FormSection({ section, data, isPreview }: FormSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  
  const sectionData = data[section.id] || {}
  const { 
    title = '문의하기',
    subtitle = '궁금하신 사항이나 견적 문의는 아래 양식을 통해 문의해 주세요.',
    fields = [] as FormField[],
    submitText = '문의하기',
    className = ''
  } = sectionData

  const defaultFields: FormField[] = [
    { name: 'name', label: '이름', type: 'text', required: true, placeholder: '이름을 입력하세요' },
    { name: 'company', label: '회사명', type: 'text', placeholder: '회사명을 입력하세요' },
    { name: 'email', label: '이메일', type: 'email', required: true, placeholder: 'example@email.com' },
    { name: 'phone', label: '연락처', type: 'tel', required: true, placeholder: '010-0000-0000' },
    { name: 'type', label: '문의 유형', type: 'select', options: ['견적 문의', '제품 문의', '기술 지원', '기타'], required: true },
    { name: 'message', label: '문의 내용', type: 'textarea', required: true, placeholder: '문의하실 내용을 자세히 작성해 주세요.' }
  ]

  const formFields = fields.length > 0 ? fields : defaultFields

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPreview) {
      // 실제 폼 제출 로직
      console.log('Form submitted:', formData)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
      setFormData({})
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className={`form-section py-5 ${className}`}>
      <Container>
        <div className="text-center mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <Row className="justify-content-center">
          <Col lg={8}>
            {showSuccess && (
              <Alert variant="success" className="mb-4">
                <i className="fas fa-check-circle me-2"></i>
                문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.
              </Alert>
            )}

            <Form onSubmit={handleSubmit} data-aos={!isPreview ? "fade-up" : undefined} data-aos-delay={!isPreview ? "100" : undefined}>
              <Row>
                {formFields.map((field: FormField, index: number) => (
                  <Col md={field.type === 'textarea' ? 12 : 6} key={field.name} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        {field.label}
                        {field.required && <span className="text-danger"> *</span>}
                      </Form.Label>
                      {field.type === 'textarea' ? (
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={isPreview}
                        />
                      ) : field.type === 'select' ? (
                        <Form.Select
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          required={field.required}
                          disabled={isPreview}
                        >
                          <option value="">선택하세요</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Form.Control
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={isPreview}
                        />
                      )}
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              <div className="text-center mt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  disabled={isPreview}
                  className="submit-button"
                >
                  <i className="fas fa-paper-plane me-2"></i>
                  {submitText}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 15px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        :global(.form-section .form-label) {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        :global(.form-section .form-control),
        :global(.form-section .form-select) {
          border-radius: 8px;
          border: 1px solid #ddd;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        :global(.form-section .form-control:focus),
        :global(.form-section .form-select:focus) {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(26, 84, 144, 0.15);
        }

        :global(.submit-button) {
          padding: 12px 40px;
          font-weight: 600;
          border-radius: 50px;
          background-color: var(--primary-color);
          border: none;
          transition: all 0.3s ease;
        }

        :global(.submit-button:hover:not(:disabled)) {
          background-color: #0d3560;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(26, 84, 144, 0.3);
        }

        :global(.submit-button:disabled) {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  )
}