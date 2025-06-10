import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

export default function AdminPageHome() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [pageData, setPageData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    aboutTitle: '',
    aboutContent: '',
    productsTitle: '',
    productsSubtitle: '',
    ctaTitle: '',
    ctaSubtitle: ''
  })

  useEffect(() => {
    fetchHomePage()
  }, [])

  const fetchHomePage = async () => {
    try {
      const res = await fetch('/api/admin/pages/home')
      if (res.ok) {
        const data = await res.json()
        if (data.content) {
          setPageData({
            heroTitle: data.content.heroTitle || '',
            heroSubtitle: data.content.heroSubtitle || '',
            aboutTitle: data.content.aboutTitle || '',
            aboutContent: data.content.aboutContent || '',
            productsTitle: data.content.productsTitle || '제품 카테고리',
            productsSubtitle: data.content.productsSubtitle || '대경하드웨어는 다양한 산업 분야에 적용 가능한 고품질 하드웨어 소재를 제공합니다.',
            ctaTitle: data.content.ctaTitle || '하드웨어 소재에 관한 문의가 있으신가요?',
            ctaSubtitle: data.content.ctaSubtitle || '대경하드웨어의 전문가들이 고객님에게 최적화된 하드웨어 소재를 제안해 드립니다.'
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch home page:', error)
      setError('홈페이지 정보를 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setPageData({
      ...pageData,
      [field]: value
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/admin/pages/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '홈페이지',
          content: pageData,
          metadata: {
            title: '대경하드웨어 - 하드웨어 소재 전문기업',
            description: '30년 전통의 하드웨어 소재 전문기업 대경하드웨어',
            keywords: '하드웨어, 힌지, 핸들, 락커, 패스너'
          }
        })
      })

      if (res.ok) {
        setMessage('홈페이지가 성공적으로 업데이트되었습니다.')
        setTimeout(() => setMessage(''), 3000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '저장 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to save home page:', error)
      setError('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="홈페이지 편집">
        <AdminSidebar />
        <div className="admin-content">
          <div className="content-body">
            <div className="text-center py-5">로딩 중...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="홈페이지 편집">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-home me-3"></i>
                홈페이지 편집
              </h2>
              <p className="text-muted mb-0">홈페이지의 콘텐츠를 섹션별로 편집하세요</p>
            </div>
            <div>
              <Link href="/" className="btn btn-outline-secondary me-2" target="_blank">
                <i className="fas fa-eye me-2"></i>미리보기
              </Link>
              <Button 
                variant="primary" 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>저장 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>저장하기
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="content-body">

            {message && (
              <Alert variant="success" className="mb-4">
                {message}
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Tabs defaultActiveKey="hero" className="mb-4">
              <Tab eventKey="hero" title="히어로 섹션">
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>메인 타이틀</Form.Label>
                        <Form.Control
                          type="text"
                          value={pageData.heroTitle}
                          onChange={(e) => handleChange('heroTitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>서브 타이틀</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={pageData.heroSubtitle}
                          onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>배경 이미지</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                        <Form.Text className="text-muted">
                          현재 이미지: /images/background/hero-bg.jpg
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="about" title="회사 소개 섹션">
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>섹션 타이틀</Form.Label>
                        <Form.Control
                          type="text"
                          value={pageData.aboutTitle}
                          onChange={(e) => handleChange('aboutTitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          value={pageData.aboutContent}
                          onChange={(e) => handleChange('aboutContent', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>이미지</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                        <Form.Text className="text-muted">
                          현재 이미지: /images/background/3.jpg
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="products" title="제품 섹션">
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>섹션 타이틀</Form.Label>
                        <Form.Control
                          type="text"
                          value={pageData.productsTitle}
                          onChange={(e) => handleChange('productsTitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>서브 타이틀</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={pageData.productsSubtitle}
                          onChange={(e) => handleChange('productsSubtitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Alert variant="info">
                        제품 카테고리는 제품 관리 메뉴에서 수정할 수 있습니다.
                      </Alert>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="cta" title="CTA 섹션">
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>CTA 타이틀</Form.Label>
                        <Form.Control
                          type="text"
                          value={pageData.ctaTitle}
                          onChange={(e) => handleChange('ctaTitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>CTA 서브타이틀</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={pageData.ctaSubtitle}
                          onChange={(e) => handleChange('ctaSubtitle', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>버튼 텍스트</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue="견적 문의하기"
                        />
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}

