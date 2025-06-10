import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

export default function AdminSlideAdd() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonUrl: '',
    mediaType: 'IMAGE' as 'IMAGE' | 'VIDEO',
    mediaUrl: '',
    overlay: 10,
    orderIndex: 0,
    isActive: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      })
    } else if (name === 'overlay' || name === 'orderIndex') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/slides')
      } else {
        setError(data.error || '슬라이드 추가 중 오류가 발생했습니다')
      }
    } catch (error) {
      console.error('Failed to add slide:', error)
      setError('슬라이드 추가 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = extractYouTubeId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  return (
    <AdminLayout title="슬라이드 추가">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-plus-circle me-3"></i>
                슬라이드 추가
              </h2>
              <p className="text-muted mb-0">새로운 히어로 슬라이드를 추가하세요</p>
            </div>
            <Link href="/admin/slides" className="btn btn-outline-secondary">
              <i className="fas fa-arrow-left me-2"></i>목록으로
            </Link>
          </div>
        </div>

        <div className="content-body">
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">기본 정보</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>제목 <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="슬라이드 제목을 입력하세요"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>부제목</Form.Label>
                      <Form.Control
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="부제목을 입력하세요 (선택사항)"
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>버튼 텍스트</Form.Label>
                          <Form.Control
                            type="text"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            placeholder="예: 자세히 보기"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>버튼 링크</Form.Label>
                          <Form.Control
                            type="text"
                            name="buttonUrl"
                            value={formData.buttonUrl}
                            onChange={handleChange}
                            placeholder="예: /products"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">미디어 설정</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>미디어 타입 <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="mediaType"
                        value={formData.mediaType}
                        onChange={handleChange}
                      >
                        <option value="IMAGE">이미지</option>
                        <option value="VIDEO">YouTube 비디오</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        {formData.mediaType === 'IMAGE' ? '이미지 URL' : 'YouTube URL'} 
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mediaUrl"
                        value={formData.mediaUrl}
                        onChange={handleChange}
                        required
                        placeholder={
                          formData.mediaType === 'IMAGE' 
                            ? '이미지 URL을 입력하세요' 
                            : 'YouTube 비디오 URL을 입력하세요'
                        }
                      />
                      {formData.mediaType === 'VIDEO' && (
                        <Form.Text className="text-muted">
                          예: https://www.youtube.com/watch?v=VIDEO_ID
                        </Form.Text>
                      )}
                    </Form.Group>

                    {formData.mediaUrl && (
                      <div className="mb-3">
                        <Form.Label>미리보기</Form.Label>
                        <div className="border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                          {formData.mediaType === 'IMAGE' ? (
                            <img 
                              src={formData.mediaUrl} 
                              alt="미리보기"
                              style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                                e.currentTarget.parentElement?.insertAdjacentHTML(
                                  'beforeend', 
                                  '<div class="text-center text-muted py-5">이미지를 불러올 수 없습니다</div>'
                                )
                              }}
                            />
                          ) : (
                            <div className="ratio ratio-16x9">
                              <iframe
                                src={getYouTubeEmbedUrl(formData.mediaUrl)}
                                title="YouTube video"
                                allowFullScreen
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <Form.Group className="mb-3">
                      <Form.Label>오버레이 투명도 ({formData.overlay}%)</Form.Label>
                      <Form.Range
                        name="overlay"
                        value={formData.overlay}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="5"
                      />
                      <Form.Text className="text-muted">
                        텍스트 가독성을 위한 어두운 오버레이 설정 (0: 없음, 100: 완전 불투명)
                      </Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">게시 설정</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>표시 순서</Form.Label>
                      <Form.Control
                        type="number"
                        name="orderIndex"
                        value={formData.orderIndex}
                        onChange={handleChange}
                        min="0"
                      />
                      <Form.Text className="text-muted">
                        숫자가 작을수록 먼저 표시됩니다
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="isActive"
                        name="isActive"
                        label="활성화"
                        checked={formData.isActive}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <div className="d-grid gap-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        추가 중...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        슬라이드 추가
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary"
                    onClick={() => router.push('/admin/slides')}
                    disabled={loading}
                  >
                    취소
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </AdminLayout>
  )
}