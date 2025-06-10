import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap'
import Link from 'next/link'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface SiteConfig {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  businessNumber: string
  ceoName: string
  establishedDate: string
  heroType: string
  heroVideoUrl: string
  heroVideoOverlay: string
  heroTitle: string
  heroSubtitle: string
}

export default function AdminSiteSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [config, setConfig] = useState<SiteConfig>({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    businessNumber: '',
    ceoName: '',
    establishedDate: '',
    heroType: 'slides',
    heroVideoUrl: '',
    heroVideoOverlay: '10',
    heroTitle: '',
    heroSubtitle: ''
  })
  
  const [heroVideoEnabled, setHeroVideoEnabled] = useState(false)

  useEffect(() => {
    fetchSiteConfig()
  }, [])

  const fetchSiteConfig = async () => {
    try {
      // Fetch configurations from API
      const res = await fetch('/api/admin/site-config')
      const data = await res.json()
      
      if (res.ok) {
        const loadedConfig = {
          siteName: data.siteName || '대경하드웨어',
          siteDescription: data.siteDescription || '하드웨어 소재 전문기업',
          contactEmail: data.contactEmail || 'dkhw6789@naver.com',
          contactPhone: data.contactPhone || '055-333-6790~1',
          contactAddress: data.contactAddress || '경남 김해시 삼안로 112번길 9-14',
          businessNumber: data.businessNumber || '123-45-67890',
          ceoName: data.ceoName || '김대표',
          establishedDate: data.establishedDate || '1990-03-15',
          heroType: data.heroType || 'slides',
          heroVideoUrl: data.heroVideoUrl || '',
          heroVideoOverlay: data.heroVideoOverlay || '10',
          heroTitle: data.heroTitle || '대한민국 대표 하드웨어 소재 전문기업',
          heroSubtitle: data.heroSubtitle || '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.'
        }
        setConfig(loadedConfig)
        // 비디오 URL이 있고 heroType이 video면 토글 활성화
        setHeroVideoEnabled(loadedConfig.heroType === 'video' && !!loadedConfig.heroVideoUrl)
      }
    } catch (error) {
      console.error('Failed to fetch site config:', error)
      setError('사이트 설정을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      // Prepare configurations to update
      const configs = Object.entries(config).map(([key, value]) => ({
        key,
        value: String(value)
      }))

      // Save configurations via API
      const res = await fetch('/api/admin/site-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configs)
      })

      if (res.ok) {
        setMessage('사이트 설정이 성공적으로 저장되었습니다.')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to save configurations')
      }
    } catch (error) {
      console.error('Failed to save config:', error)
      setError('설정 저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof SiteConfig, value: string) => {
    setConfig({ ...config, [field]: value })
  }

  const handleVideoToggle = (checked: boolean) => {
    setHeroVideoEnabled(checked)
    if (checked && config.heroVideoUrl) {
      setConfig({ ...config, heroType: 'video' })
    } else {
      setConfig({ ...config, heroType: 'slides' })
    }
  }

  const handleVideoUrlChange = (url: string) => {
    handleChange('heroVideoUrl', url)
    // URL이 입력되면 자동으로 비디오 모드 활성화
    if (url && url.trim() !== '') {
      setHeroVideoEnabled(true)
      setConfig({ ...config, heroVideoUrl: url, heroType: 'video' })
    }
  }

  if (loading) {
    return (
      <AdminLayout title="사이트 설정">
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
    <AdminLayout title="사이트 설정">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div>
            <h2>
              <i className="fas fa-cog me-3"></i>
              사이트 설정
            </h2>
            <p className="text-muted mb-0">웹사이트의 기본 정보를 설정하세요</p>
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
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-globe me-2"></i>
                      사이트 기본 정보
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>사이트명 *</Form.Label>
                          <Form.Control
                            type="text"
                            value={config.siteName}
                            onChange={(e) => handleChange('siteName', e.target.value)}
                            placeholder="사이트 이름을 입력하세요"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>사이트 설명</Form.Label>
                          <Form.Control
                            type="text"
                            value={config.siteDescription}
                            onChange={(e) => handleChange('siteDescription', e.target.value)}
                            placeholder="사이트에 대한 간단한 설명"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>대표 이메일 *</Form.Label>
                          <Form.Control
                            type="email"
                            value={config.contactEmail}
                            onChange={(e) => handleChange('contactEmail', e.target.value)}
                            placeholder="contact@company.com"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>대표 전화번호 *</Form.Label>
                          <Form.Control
                            type="tel"
                            value={config.contactPhone}
                            onChange={(e) => handleChange('contactPhone', e.target.value)}
                            placeholder="055-333-6790"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>회사 주소 *</Form.Label>
                      <Form.Control
                        type="text"
                        value={config.contactAddress}
                        onChange={(e) => handleChange('contactAddress', e.target.value)}
                        placeholder="회사 주소를 입력하세요"
                        required
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-building me-2"></i>
                      회사 정보
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>사업자 등록번호</Form.Label>
                          <Form.Control
                            type="text"
                            value={config.businessNumber}
                            onChange={(e) => handleChange('businessNumber', e.target.value)}
                            placeholder="123-45-67890"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>대표자명</Form.Label>
                          <Form.Control
                            type="text"
                            value={config.ceoName}
                            onChange={(e) => handleChange('ceoName', e.target.value)}
                            placeholder="대표자 이름"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>설립일</Form.Label>
                      <Form.Control
                        type="date"
                        value={config.establishedDate}
                        onChange={(e) => handleChange('establishedDate', e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-desktop me-2"></i>
                      히어로 섹션 설정
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-4">
                      <Form.Label>YouTube 비디오 배경</Form.Label>
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <Form.Check
                          type="switch"
                          id="hero-video-toggle"
                          checked={heroVideoEnabled}
                          onChange={(e) => handleVideoToggle(e.target.checked)}
                          label={heroVideoEnabled ? "비디오 모드 활성" : "슬라이드 모드"}
                        />
                        {heroVideoEnabled && config.heroVideoUrl && (
                          <Badge bg="success">
                            <i className="fas fa-check-circle me-1"></i>
                            비디오 설정됨
                          </Badge>
                        )}
                      </div>
                      <Form.Control
                        type="text"
                        value={config.heroVideoUrl}
                        onChange={(e) => handleVideoUrlChange(e.target.value)}
                        placeholder="https://youtu.be/GLzhpKM7cuA"
                        className="mb-2"
                      />
                      <Form.Text className="text-muted">
                        YouTube URL을 입력하면 자동으로 비디오 모드가 활성화됩니다.
                      </Form.Text>
                    </Form.Group>

                    {heroVideoEnabled && (
                      <Form.Group className="mb-3">
                        <Form.Label>오버레이 투명도 ({config.heroVideoOverlay}%)</Form.Label>
                        <Form.Range
                          min="0"
                          max="50"
                          step="5"
                          value={config.heroVideoOverlay}
                          onChange={(e) => handleChange('heroVideoOverlay', e.target.value)}
                        />
                        <Form.Text className="text-muted">
                          텍스트 가독성을 위한 어두운 오버레이 (권장: 10-30%)
                        </Form.Text>
                      </Form.Group>
                    )}

                    <hr className="my-4" />

                    <Form.Group className="mb-3">
                      <Form.Label>히어로 타이틀</Form.Label>
                      <Form.Control
                        type="text"
                        value={config.heroTitle}
                        onChange={(e) => handleChange('heroTitle', e.target.value)}
                        placeholder="대한민국 대표 하드웨어 소재 전문기업"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>히어로 서브타이틀</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={config.heroSubtitle}
                        onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                        placeholder="대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로..."
                      />
                    </Form.Group>

                    {!heroVideoEnabled && (
                      <Alert variant="info" className="mt-3">
                        <i className="fas fa-info-circle me-2"></i>
                        슬라이드 모드에서는 <Link href="/admin/slides">슬라이드 관리</Link>에서 이미지를 설정할 수 있습니다.
                      </Alert>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-save me-2"></i>
                      저장
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span className="loading-spinner me-2"></span>
                            저장 중...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-2"></i>
                            설정 저장
                          </>
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      도움말
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="help-section">
                      <h6>필수 항목</h6>
                      <p className="small">
                        사이트명, 대표 이메일, 전화번호, 주소는 필수 입력 항목입니다.
                      </p>
                      
                      <h6>연락처 정보</h6>
                      <p className="small">
                        입력된 연락처 정보는 사이트의 연락처 페이지와 푸터에 표시됩니다.
                      </p>
                      
                      <h6>회사 정보</h6>
                      <p className="small">
                        사업자 등록번호와 대표자명은 법적 표시 의무가 있는 정보입니다.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </AdminLayout>
  )
}