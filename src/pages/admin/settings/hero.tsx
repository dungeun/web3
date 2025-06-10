import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, Form, Alert, Image } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface HeroSettings {
  backgroundImage: string
  title: string
  subtitle: string
  isEnabled: boolean
  overlay: boolean
  overlayOpacity: number
}

export default function AdminHeroSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [settings, setSettings] = useState<HeroSettings>({
    backgroundImage: '/img/background/hero-bg.jpg',
    title: '대경하드웨어',
    subtitle: '최고 품질의 하드웨어 솔루션을 제공합니다',
    isEnabled: true,
    overlay: true,
    overlayOpacity: 0.6
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    fetchHeroSettings()
  }, [])

  const fetchHeroSettings = async () => {
    try {
      // 실제 API 연동 시 사용할 코드
      // const res = await fetch('/api/admin/settings/hero')
      // const data = await res.json()
      // setSettings(data)
      
      // 현재는 로컬스토리지에서 설정 불러오기
      const savedSettings = localStorage.getItem('heroSettings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error('Failed to fetch hero settings:', error)
      setError('히어로 설정을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setPreviewImage(imageUrl)
        setSettings(prev => ({ ...prev, backgroundImage: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      // 실제 API 연동 시 사용할 코드
      // await fetch('/api/admin/settings/hero', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // })

      // 현재는 로컬스토리지에 저장
      localStorage.setItem('heroSettings', JSON.stringify(settings))
      
      setMessage('히어로 설정이 저장되었습니다.')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Failed to save hero settings:', error)
      setError('히어로 설정 저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const resetToDefault = () => {
    const defaultSettings: HeroSettings = {
      backgroundImage: '/img/background/hero-bg.jpg',
      title: '대경하드웨어',
      subtitle: '최고 품질의 하드웨어 솔루션을 제공합니다',
      isEnabled: true,
      overlay: true,
      overlayOpacity: 0.6
    }
    setSettings(defaultSettings)
    setPreviewImage(null)
  }

  const presetImages = [
    { name: '기본 이미지', url: '/img/background/hero-bg.jpg' },
    { name: '공장 이미지', url: '/img/background/3.jpg' },
    { name: 'CTA 배경', url: '/img/background/cta-bg.jpg' }
  ]

  return (
    <AdminLayout title="히어로 섹션 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-image me-3"></i>
                히어로 섹션 관리
              </h2>
              <p className="text-muted mb-0">사이트 상단 히어로 섹션의 배경과 텍스트를 관리하세요</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={resetToDefault}>
                <i className="fas fa-undo me-2"></i>
                기본값으로 복원
              </Button>
              <Link href="/" target="_blank" className="btn btn-info">
                <i className="fas fa-external-link-alt me-2"></i>
                사이트 미리보기
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

          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-cog me-2"></i>
                    히어로 설정
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>메인 제목</Form.Label>
                          <Form.Control
                            type="text"
                            value={settings.title}
                            onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="메인 제목을 입력하세요"
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>부제목</Form.Label>
                          <Form.Control
                            type="text"
                            value={settings.subtitle}
                            onChange={(e) => setSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                            placeholder="부제목을 입력하세요"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>배경 이미지 업로드</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <Form.Text className="text-muted">
                        권장 크기: 1920x600px, 최대 파일 크기: 5MB
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>프리셋 이미지 선택</Form.Label>
                      <div className="d-flex gap-2 flex-wrap">
                        {presetImages.map((preset, index) => (
                          <Button
                            key={index}
                            variant={settings.backgroundImage === preset.url ? "primary" : "outline-secondary"}
                            size="sm"
                            onClick={() => {
                              setSettings(prev => ({ ...prev, backgroundImage: preset.url }))
                              setPreviewImage(null)
                            }}
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id="isEnabled"
                            label="히어로 섹션 활성화"
                            checked={settings.isEnabled}
                            onChange={(e) => setSettings(prev => ({ ...prev, isEnabled: e.target.checked }))}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id="overlay"
                            label="오버레이 사용"
                            checked={settings.overlay}
                            onChange={(e) => setSettings(prev => ({ ...prev, overlay: e.target.checked }))}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>오버레이 투명도</Form.Label>
                          <Form.Range
                            min={0}
                            max={1}
                            step={0.1}
                            value={settings.overlayOpacity}
                            onChange={(e) => setSettings(prev => ({ ...prev, overlayOpacity: parseFloat(e.target.value) }))}
                            disabled={!settings.overlay}
                          />
                          <Form.Text className="text-muted">
                            {Math.round(settings.overlayOpacity * 100)}%
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr />

                    <div className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-eye me-2"></i>
                    미리보기
                  </h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="hero-preview">
                    <div 
                      className="hero-preview-bg"
                      style={{
                        backgroundImage: `url(${previewImage || settings.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        position: 'relative'
                      }}
                    >
                      {settings.overlay && (
                        <div 
                          className="hero-overlay"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: `rgba(0, 0, 0, ${settings.overlayOpacity})`
                          }}
                        />
                      )}
                      
                      {settings.isEnabled && (
                        <div className="hero-content">
                          <h3 className="text-white fw-bold mb-2">{settings.title}</h3>
                          <p className="text-white-50 mb-0">{settings.subtitle}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    도움말
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      이미지는 자동으로 최적화됩니다
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      변경사항은 즉시 반영됩니다
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      오버레이로 텍스트 가독성 조절
                    </li>
                    <li>
                      <i className="fas fa-check text-success me-2"></i>
                      반응형 디자인 자동 적용
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <style jsx>{`
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 2;
        }

        .hero-preview-bg {
          border-radius: 0.375rem;
          overflow: hidden;
        }
      `}</style>
    </AdminLayout>
  )
}