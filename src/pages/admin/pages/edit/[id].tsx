import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Badge, Modal } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'
import SectionRenderer from '@/components/Template/SectionRenderer'
import { templates, PageTemplate, TemplateSection } from '@/types/template'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>에디터 로딩중...</p>
})
import 'react-quill/dist/quill.snow.css'

interface PageData {
  id: number
  title: string
  slug: string
  content: string
  templateId?: string
  sections?: Record<string, any>
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

export default function AdminPageEdit() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('content')
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    templateId: '',
    sections: {} as Record<string, any>,
    metaTitle: '',
    metaDescription: '',
    isPublished: true
  })

  useEffect(() => {
    if (id) {
      fetchPage()
    }
  }, [id])

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/admin/pages/${id}`)
      if (res.ok) {
        const page: PageData = await res.json()
        setFormData({
          title: page.title,
          slug: page.slug,
          content: page.content || '',
          templateId: page.templateId || 'basic',
          sections: page.sections || {},
          metaTitle: page.metaTitle || '',
          metaDescription: page.metaDescription || '',
          isPublished: page.isPublished
        })
        
        const template = templates.find(t => t.id === (page.templateId || 'basic'))
        setSelectedTemplate(template || templates[templates.length - 1])
      } else {
        setError('페이지를 불러올 수 없습니다.')
      }
    } catch (error) {
      console.error('Failed to fetch page:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setPageLoading(false)
    }
  }

  const generateSlugFromTitle = (title: string): string => {
    const koreanToSlug: { [key: string]: string } = {
      '회사소개': 'company',
      '오시는길': 'location',
      '제품소개': 'products',
      '인증정보': 'certification',
      '견적문의': 'inquiry',
      '공지사항': 'notice',
      '갤러리': 'gallery'
    }
    
    return koreanToSlug[title] || title.toLowerCase().replace(/[^a-z0-9가-힣\s-]/g, '').replace(/\s+/g, '-')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setMessage('페이지가 성공적으로 수정되었습니다.')
        setTimeout(() => {
          router.push('/admin/pages')
        }, 1500)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '페이지 수정 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to update page:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    const newFormData = { ...formData, [field]: value }
    
    if (field === 'title' && value) {
      const autoSlug = generateSlugFromTitle(value)
      if (!formData.slug || formData.slug === generateSlugFromTitle(formData.title)) {
        newFormData.slug = autoSlug
      }
      if (!formData.metaTitle || formData.metaTitle === formData.title) {
        newFormData.metaTitle = value
      }
    }
    
    if (field === 'templateId') {
      const template = templates.find(t => t.id === value)
      setSelectedTemplate(template || null)
      // 템플릿이 변경되면 기본 섹션 데이터 초기화
      if (template) {
        const defaultSections: Record<string, any> = {}
        template.sections.forEach(section => {
          defaultSections[section.id] = getSectionDefaults(section)
        })
        newFormData.sections = { ...defaultSections, ...formData.sections }
      }
    }
    
    setFormData(newFormData)
  }

  const handleSectionChange = (sectionId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: data
      }
    }))
  }

  const getSectionDefaults = (section: TemplateSection): any => {
    switch (section.type) {
      case 'hero':
        return {
          title: '페이지 제목',
          subtitle: '페이지 부제목',
          backgroundImage: '/images/hero-bg.jpg'
        }
      case 'content':
        return {
          title: section.title || '내용',
          content: '<p>내용을 입력하세요.</p>'
        }
      case 'two-column':
        return {
          title: section.title || '섹션 제목',
          leftContent: '<p>왼쪽 내용</p>',
          rightContent: '<p>오른쪽 내용</p>',
          imagePosition: 'right'
        }
      case 'cta':
        return {
          title: 'CTA 제목',
          subtitle: 'CTA 설명',
          buttonText: '버튼 텍스트',
          buttonLink: '/inquiry'
        }
      case 'faq':
        return {
          title: '자주 묻는 질문',
          items: []
        }
      default:
        return {}
    }
  }

  const renderSectionEditor = (section: TemplateSection) => {
    const sectionData = formData.sections[section.id] || {}
    
    switch (section.type) {
      case 'hero':
        return (
          <Card key={section.id} className="mb-3">
            <Card.Header>
              <h6 className="mb-0">{section.title || 'Hero 섹션'}</h6>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  value={sectionData.title || ''}
                  onChange={(e) => handleSectionChange(section.id, { ...sectionData, title: e.target.value })}
                  placeholder="히어로 섹션 제목"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>부제목</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={sectionData.subtitle || ''}
                  onChange={(e) => handleSectionChange(section.id, { ...sectionData, subtitle: e.target.value })}
                  placeholder="히어로 섹션 부제목"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>배경 이미지 URL</Form.Label>
                <Form.Control
                  type="text"
                  value={sectionData.backgroundImage || ''}
                  onChange={(e) => handleSectionChange(section.id, { ...sectionData, backgroundImage: e.target.value })}
                  placeholder="/images/background/hero-bg.jpg"
                />
                <Form.Text className="text-muted">
                  히어로 섹션의 배경 이미지를 설정합니다.
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        )
      
      case 'content':
      case 'two-column':
        return (
          <Card key={section.id} className="mb-3">
            <Card.Header>
              <h6 className="mb-0">{section.title || section.type}</h6>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  value={sectionData.title || ''}
                  onChange={(e) => handleSectionChange(section.id, { ...sectionData, title: e.target.value })}
                />
              </Form.Group>
              
              {section.type === 'content' && (
                <Form.Group>
                  <Form.Label>내용</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={sectionData.content || ''}
                    onChange={(value) => handleSectionChange(section.id, { ...sectionData, content: value })}
                    modules={modules}
                  />
                </Form.Group>
              )}
              
              {section.type === 'two-column' && (
                <>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>왼쪽 내용</Form.Label>
                        <ReactQuill
                          theme="snow"
                          value={sectionData.leftContent || ''}
                          onChange={(value) => handleSectionChange(section.id, { ...sectionData, leftContent: value })}
                          modules={modules}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>오른쪽 내용</Form.Label>
                        <ReactQuill
                          theme="snow"
                          value={sectionData.rightContent || ''}
                          onChange={(value) => handleSectionChange(section.id, { ...sectionData, rightContent: value })}
                          modules={modules}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Label>이미지 위치</Form.Label>
                    <Form.Select
                      value={sectionData.imagePosition || 'right'}
                      onChange={(e) => handleSectionChange(section.id, { ...sectionData, imagePosition: e.target.value })}
                    >
                      <option value="left">왼쪽</option>
                      <option value="right">오른쪽</option>
                    </Form.Select>
                  </Form.Group>
                </>
              )}
            </Card.Body>
          </Card>
        )
      
      case 'cta':
        return (
          <Card key={section.id} className="mb-3">
            <Card.Header>
              <h6 className="mb-0">CTA 섹션</h6>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  value={sectionData.title || ''}
                  onChange={(e) => handleSectionChange(section.id, { ...sectionData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>설명</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={sectionData.subtitle || ''}
                  onChange={(e) => handleSectionChange(section.id, { ...sectionData, subtitle: e.target.value })}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>버튼 텍스트</Form.Label>
                    <Form.Control
                      type="text"
                      value={sectionData.buttonText || ''}
                      onChange={(e) => handleSectionChange(section.id, { ...sectionData, buttonText: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>버튼 링크</Form.Label>
                    <Form.Control
                      type="text"
                      value={sectionData.buttonLink || ''}
                      onChange={(e) => handleSectionChange(section.id, { ...sectionData, buttonLink: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
      
      case 'product-categories':
        return (
          <Card key={section.id} className="mb-3">
            <Card.Header>
              <h6 className="mb-0">{section.title || '제품 카테고리'}</h6>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <i className="fas fa-info-circle me-2"></i>
                제품 카테고리는 자동으로 데이터베이스에서 불러옵니다.
              </Alert>
            </Card.Body>
          </Card>
        )
      
      case 'product-gallery':
        return (
          <Card key={section.id} className="mb-3">
            <Card.Header>
              <h6 className="mb-0">{section.title || '제품 갤러리'}</h6>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <i className="fas fa-info-circle me-2"></i>
                제품 갤러리는 자동으로 제품 데이터베이스에서 불러옵니다.
              </Alert>
            </Card.Body>
          </Card>
        )
      
      default:
        return (
          <Card key={section.id} className="mb-3">
            <Card.Header>
              <h6 className="mb-0">{section.title || section.type}</h6>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">이 섹션은 아직 편집기가 구현되지 않았습니다.</p>
            </Card.Body>
          </Card>
        )
    }
  }

  if (pageLoading) {
    return (
      <AdminLayout title="페이지 수정">
        <AdminSidebar />
        <div className="admin-content">
          <div className="content-body">
            <div className="text-center py-5">
              <div className="loading-spinner me-2"></div>
              로딩 중...
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="페이지 수정">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-edit me-3"></i>
                페이지 수정
              </h2>
              <p className="text-muted mb-0">템플릿을 선택하고 내용을 편집하세요</p>
            </div>
            <div>
              <Button 
                variant="outline-primary" 
                className="me-2"
                onClick={() => setShowPreview(true)}
              >
                <i className="fas fa-eye me-2"></i>미리보기
              </Button>
              <Button variant="outline-secondary" onClick={() => router.back()}>
                <i className="fas fa-arrow-left me-2"></i>뒤로가기
              </Button>
            </div>
          </div>
        </div>

        <div className="content-body">
          {message && (
            <Alert variant="success" className="mb-4">
              <i className="fas fa-check-circle me-2"></i>
              {message}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mb-4">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'content')}>
                      <Tab eventKey="content" title="기본 정보">
                        <div className="pt-3">
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>페이지 제목 *</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={formData.title}
                                  onChange={(e) => handleChange('title', e.target.value)}
                                  placeholder="예: 회사소개, 제품소개, 연혁"
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>URL 슬러그 *</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={formData.slug}
                                  onChange={(e) => handleChange('slug', e.target.value)}
                                  placeholder="제목에서 자동 생성됩니다"
                                  required
                                />
                                <Form.Text className="text-muted">
                                  페이지 URL: /pages/{formData.slug || 'your-slug'}
                                </Form.Text>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-3">
                            <Form.Label>템플릿 선택</Form.Label>
                            <div className="template-grid">
                              {templates.map(template => (
                                <div
                                  key={template.id}
                                  className={`template-card ${formData.templateId === template.id ? 'selected' : ''}`}
                                  onClick={() => handleChange('templateId', template.id)}
                                >
                                  <div className="template-icon">
                                    <i className="fas fa-file-alt"></i>
                                  </div>
                                  <h6>{template.name}</h6>
                                  <p className="small text-muted">{template.description}</p>
                                </div>
                              ))}
                            </div>
                          </Form.Group>
                        </div>
                      </Tab>

                      <Tab eventKey="sections" title="섹션 편집">
                        <div className="pt-3">
                          {selectedTemplate ? (
                            selectedTemplate.sections.map(section => renderSectionEditor(section))
                          ) : (
                            <Alert variant="info">
                              먼저 템플릿을 선택해주세요.
                            </Alert>
                          )}
                        </div>
                      </Tab>

                      <Tab eventKey="seo" title="SEO 설정">
                        <div className="pt-3">
                          <Form.Group className="mb-3">
                            <Form.Label>Meta Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={formData.metaTitle}
                              onChange={(e) => handleChange('metaTitle', e.target.value)}
                              placeholder="검색엔진에 표시될 제목"
                            />
                            <Form.Text className="text-muted">
                              비워두면 페이지 제목이 사용됩니다.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Meta Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={formData.metaDescription}
                              onChange={(e) => handleChange('metaDescription', e.target.value)}
                              placeholder="검색엔진에 표시될 설명"
                            />
                            <Form.Text className="text-muted">
                              150-160자 권장
                            </Form.Text>
                          </Form.Group>
                        </div>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button
                    variant="outline-secondary"
                    onClick={() => router.back()}
                    disabled={loading}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner me-2"></span>
                        수정 중...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        페이지 수정
                      </>
                    )}
                  </Button>
                </div>
              </Col>

              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-cog me-2"></i>
                      페이지 설정
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="isPublished"
                        label="페이지 공개"
                        checked={formData.isPublished}
                        onChange={(e) => handleChange('isPublished', e.target.checked)}
                      />
                      <Form.Text className="text-muted">
                        비공개 페이지는 사용자에게 표시되지 않습니다.
                      </Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      템플릿 정보
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    {selectedTemplate ? (
                      <div>
                        <h6>{selectedTemplate.name}</h6>
                        <p className="small text-muted">{selectedTemplate.description}</p>
                        <hr />
                        <h6>포함된 섹션:</h6>
                        <ul className="small">
                          {selectedTemplate.sections.map(section => (
                            <li key={section.id}>{section.title || section.type}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-muted small">템플릿을 선택하면 정보가 표시됩니다.</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {/* 미리보기 모달 */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="xl" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>페이지 미리보기</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="preview-container">
            <div className="preview-header bg-light p-3 text-center">
              <h2>{formData.title}</h2>
              <p className="text-muted mb-0">URL: /pages/{formData.slug}</p>
            </div>
            <div className="preview-content">
              {selectedTemplate && selectedTemplate.sections.map(section => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  data={formData.sections}
                  isPreview={true}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .template-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .template-card {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .template-card:hover {
          border-color: var(--primary-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .template-card.selected {
          border-color: var(--primary-color);
          background-color: rgba(26, 84, 144, 0.05);
        }

        .template-icon {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .template-card h6 {
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .template-card p {
          margin: 0;
        }

        .preview-container {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .preview-content {
          background-color: white;
          max-width: 1200px;
          margin: 0 auto;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        :global(.loading-spinner) {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  )
}