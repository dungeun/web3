import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Table, Badge, Form, Alert, Row, Col } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface PageSEO {
  id: number
  title: string
  slug: string
  metaTitle?: string
  metaDescription?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminSEOList() {
  const router = useRouter()
  const [pages, setPages] = useState<PageSEO[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages')
      const data = await res.json()
      setPages(data)
    } catch (error) {
      console.error('Failed to fetch pages:', error)
      setError('페이지 목록을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const getSEOScore = (page: PageSEO) => {
    let score = 0
    if (page.metaTitle) score += 30
    if (page.metaDescription) score += 30
    if (page.slug && page.slug.length > 0) score += 20
    if (page.title && page.title.length > 0) score += 20
    return score
  }

  const getSEOBadge = (score: number) => {
    if (score >= 80) return { variant: 'success', text: '우수' }
    if (score >= 60) return { variant: 'warning', text: '보통' }
    return { variant: 'danger', text: '개선필요' }
  }

  return (
    <AdminLayout title="SEO 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-search me-3"></i>
                SEO 관리
              </h2>
              <p className="text-muted mb-0">검색엔진 최적화 설정을 관리하세요</p>
            </div>
            <div className="d-flex gap-2">
              <Link href="/admin/seo/settings" className="btn btn-outline-primary">
                <i className="fas fa-cog me-2"></i>SEO 설정
              </Link>
              <Link href="/admin/pages/add" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>페이지 추가
              </Link>
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

          {/* SEO 요약 통계 */}
          <Row className="mb-4">
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-primary mb-3">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h3 className="stats-number text-primary">{pages.length}</h3>
                  <p className="stats-label">총 페이지</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-success mb-3">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="stats-number text-success">
                    {pages.filter(p => getSEOScore(p) >= 80).length}
                  </h3>
                  <p className="stats-label">SEO 우수</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-warning mb-3">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h3 className="stats-number text-warning">
                    {pages.filter(p => getSEOScore(p) >= 60 && getSEOScore(p) < 80).length}
                  </h3>
                  <p className="stats-label">SEO 보통</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-danger mb-3">
                    <i className="fas fa-times-circle"></i>
                  </div>
                  <h3 className="stats-number text-danger">
                    {pages.filter(p => getSEOScore(p) < 60).length}
                  </h3>
                  <p className="stats-label">개선 필요</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                페이지별 SEO 현황 ({pages.length}개)
              </h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <div className="loading-spinner me-2"></div>
                  로딩 중...
                </div>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>페이지 제목</th>
                      <th>URL</th>
                      <th className="text-center">Meta Title</th>
                      <th className="text-center">Meta Description</th>
                      <th className="text-center">SEO 점수</th>
                      <th className="text-center">상태</th>
                      <th className="text-center" style={{ width: '150px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          등록된 페이지가 없습니다.
                          <br />
                          <Link href="/admin/pages/add" className="btn btn-primary mt-2">
                            <i className="fas fa-plus me-2"></i>첫 번째 페이지 추가
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      pages.map((page) => {
                        const seoScore = getSEOScore(page)
                        const seoBadge = getSEOBadge(seoScore)
                        
                        return (
                          <tr key={page.id}>
                            <td>
                              <strong>{page.title}</strong>
                              <br />
                              <small className="text-muted">ID: {page.id}</small>
                            </td>
                            <td>
                              <code>/pages/{page.slug}</code>
                            </td>
                            <td className="text-center">
                              {page.metaTitle ? (
                                <i className="fas fa-check text-success" title={page.metaTitle}></i>
                              ) : (
                                <i className="fas fa-times text-danger" title="Meta Title 없음"></i>
                              )}
                            </td>
                            <td className="text-center">
                              {page.metaDescription ? (
                                <i className="fas fa-check text-success" title={page.metaDescription}></i>
                              ) : (
                                <i className="fas fa-times text-danger" title="Meta Description 없음"></i>
                              )}
                            </td>
                            <td className="text-center">
                              <Badge bg={seoBadge.variant}>
                                {seoScore}점
                              </Badge>
                            </td>
                            <td className="text-center">
                              <Badge bg={page.isPublished ? 'success' : 'secondary'}>
                                {page.isPublished ? '공개' : '비공개'}
                              </Badge>
                            </td>
                            <td className="text-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-1"
                                onClick={() => router.push(`/admin/seo/edit/${page.id}`)}
                                title="SEO 설정 수정"
                              >
                                <i className="fas fa-search"></i>
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => router.push(`/admin/pages/edit/${page.id}`)}
                                title="페이지 수정"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .stats-card {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        }

        .stats-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          color: white;
          font-size: 1.5rem;
        }

        .stats-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stats-label {
          font-weight: 600;
          color: #6c757d;
          margin-bottom: 0;
        }
      `}</style>
    </AdminLayout>
  )
}