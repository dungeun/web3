import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, Form, Button, Alert, Row, Col, Badge, ProgressBar } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface PageData {
  id: number
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminSEOEdit() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [pageData, setPageData] = useState<PageData | null>(null)
  
  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
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
        setPageData(page)
        setFormData({
          metaTitle: page.metaTitle || '',
          metaDescription: page.metaDescription || '',
          keywords: '',
          ogTitle: page.metaTitle || page.title,
          ogDescription: page.metaDescription || '',
          ogImage: ''
        })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription
        })
      })

      if (res.ok) {
        setMessage('SEO 설정이 성공적으로 저장되었습니다.')
        setTimeout(() => {
          router.push('/admin/seo')
        }, 1500)
      } else {
        const errorData = await res.json()
        setError(errorData.message || 'SEO 설정 저장 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to update SEO:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const getSEOScore = () => {
    if (!pageData) return 0
    let score = 0
    if (formData.metaTitle) score += 30
    if (formData.metaDescription) score += 30
    if (pageData.slug && pageData.slug.length > 0) score += 20
    if (pageData.title && pageData.title.length > 0) score += 20
    return score
  }

  const getSEORecommendations = () => {
    const recommendations = []
    if (!formData.metaTitle) {
      recommendations.push('Meta Title을 설정하세요 (30점)')
    } else if (formData.metaTitle.length < 30 || formData.metaTitle.length > 60) {
      recommendations.push('Meta Title을 30-60자로 조정하세요')
    }
    
    if (!formData.metaDescription) {
      recommendations.push('Meta Description을 설정하세요 (30점)')
    } else if (formData.metaDescription.length < 120 || formData.metaDescription.length > 160) {
      recommendations.push('Meta Description을 120-160자로 조정하세요')
    }
    
    return recommendations
  }

  if (pageLoading) {
    return (
      <AdminLayout title="SEO 설정">
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

  if (!pageData) {
    return (
      <AdminLayout title="SEO 설정">
        <AdminSidebar />
        <div className="admin-content">
          <div className="content-body">
            <Alert variant="danger">
              페이지를 찾을 수 없습니다.
            </Alert>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const seoScore = getSEOScore()
  const recommendations = getSEORecommendations()

  return (
    <AdminLayout title="SEO 설정">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-search me-3"></i>
                SEO 설정
              </h2>
              <p className="text-muted mb-0">{pageData.title} 페이지의 SEO를 최적화하세요</p>
            </div>
            <Button variant="outline-secondary" onClick={() => router.back()}>
              <i className="fas fa-arrow-left me-2"></i>뒤로가기
            </Button>
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

          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-edit me-2"></i>
                    기본 SEO 설정
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Meta Title *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => handleChange('metaTitle', e.target.value)}
                        placeholder="검색엔진에 표시될 제목 (30-60자 권장)"
                        maxLength={60}
                      />
                      <div className="d-flex justify-content-between">
                        <Form.Text className="text-muted">
                          검색 결과에 표시되는 제목입니다.
                        </Form.Text>
                        <small className={`${formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60 ? 'text-success' : 'text-warning'}`}>
                          {formData.metaTitle.length}/60자
                        </small>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Meta Description *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.metaDescription}
                        onChange={(e) => handleChange('metaDescription', e.target.value)}
                        placeholder="검색엔진에 표시될 설명 (120-160자 권장)"
                        maxLength={160}
                      />
                      <div className="d-flex justify-content-between">
                        <Form.Text className="text-muted">
                          검색 결과에 표시되는 설명입니다.
                        </Form.Text>
                        <small className={`${formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'text-success' : 'text-warning'}`}>
                          {formData.metaDescription.length}/160자
                        </small>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>키워드</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => handleChange('keywords', e.target.value)}
                        placeholder="관련 키워드를 쉼표로 구분하여 입력"
                      />
                      <Form.Text className="text-muted">
                        예: 회사소개, 기업정보, 대경하드웨어
                      </Form.Text>
                    </Form.Group>

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
                            저장 중...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-2"></i>
                            SEO 설정 저장
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* 검색 결과 미리보기 */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-eye me-2"></i>
                    검색 결과 미리보기
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="search-preview">
                    <div className="search-url text-success small">
                      https://your-domain.com/pages/{pageData.slug}
                    </div>
                    <div className="search-title text-primary">
                      <strong>{formData.metaTitle || pageData.title}</strong>
                    </div>
                    <div className="search-description text-muted small">
                      {formData.metaDescription || '이 페이지에 대한 설명이 없습니다.'}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              {/* SEO 점수 */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-chart-line me-2"></i>
                    SEO 점수
                  </h5>
                </Card.Header>
                <Card.Body className="text-center">
                  <div className="seo-score-circle mb-3">
                    <h2 className={`${seoScore >= 80 ? 'text-success' : seoScore >= 60 ? 'text-warning' : 'text-danger'}`}>
                      {seoScore}점
                    </h2>
                  </div>
                  <ProgressBar 
                    now={seoScore} 
                    variant={seoScore >= 80 ? 'success' : seoScore >= 60 ? 'warning' : 'danger'}
                    className="mb-3"
                  />
                  <Badge bg={seoScore >= 80 ? 'success' : seoScore >= 60 ? 'warning' : 'danger'}>
                    {seoScore >= 80 ? 'SEO 우수' : seoScore >= 60 ? 'SEO 보통' : '개선 필요'}
                  </Badge>
                </Card.Body>
              </Card>

              {/* SEO 권장사항 */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-lightbulb me-2"></i>
                    SEO 권장사항
                  </h5>
                </Card.Header>
                <Card.Body>
                  {recommendations.length === 0 ? (
                    <div className="text-success">
                      <i className="fas fa-check-circle me-2"></i>
                      모든 SEO 설정이 완료되었습니다!
                    </div>
                  ) : (
                    <ul className="list-unstyled mb-0">
                      {recommendations.map((recommendation, index) => (
                        <li key={index} className="mb-2">
                          <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                          <small>{recommendation}</small>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card.Body>
              </Card>

              {/* 페이지 정보 */}
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    페이지 정보
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="page-info">
                    <div className="mb-2">
                      <strong>제목:</strong> {pageData.title}
                    </div>
                    <div className="mb-2">
                      <strong>URL:</strong> <code>/pages/{pageData.slug}</code>
                    </div>
                    <div className="mb-2">
                      <strong>상태:</strong>{' '}
                      <Badge bg={pageData.isPublished ? 'success' : 'secondary'}>
                        {pageData.isPublished ? '공개' : '비공개'}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <strong>생성일:</strong> {new Date(pageData.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                    <div>
                      <strong>수정일:</strong> {new Date(pageData.updatedAt).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <style jsx>{`
        .search-preview {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 15px;
          background: #f8f9fa;
        }

        .search-url {
          line-height: 1.2;
        }

        .search-title {
          font-size: 18px;
          line-height: 1.2;
          margin: 4px 0;
        }

        .search-description {
          line-height: 1.4;
        }

        .seo-score-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .page-info {
          font-size: 14px;
        }
      `}</style>
    </AdminLayout>
  )
}