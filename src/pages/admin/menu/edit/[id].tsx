import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Menu {
  id: number
  title: string
  path: string
  type: string
  target: string
  parentId?: number
  orderIndex: number
  isActive: boolean
}

export default function AdminMenuEdit() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [parentMenus, setParentMenus] = useState<Menu[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    type: 'internal',
    target: '_self',
    parentId: '',
    orderIndex: 0,
    isActive: true
  })

  useEffect(() => {
    if (id) {
      fetchMenu()
      fetchParentMenus()
    }
  }, [id])

  const fetchMenu = async () => {
    try {
      const res = await fetch(`/api/admin/menus/${id}`)
      if (res.ok) {
        const menu = await res.json()
        setFormData({
          title: menu.title,
          path: menu.path,
          type: menu.type,
          target: menu.target,
          parentId: menu.parentId ? menu.parentId.toString() : '',
          orderIndex: menu.orderIndex,
          isActive: menu.isActive
        })
      } else {
        setError('메뉴를 불러올 수 없습니다.')
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setPageLoading(false)
    }
  }

  const fetchParentMenus = async () => {
    try {
      const res = await fetch('/api/admin/menus')
      const data = await res.json()
      // 현재 수정 중인 메뉴는 상위 메뉴 목록에서 제외
      setParentMenus(data.filter((menu: any) => !menu.parentId && menu.id !== Number(id)))
    } catch (error) {
      console.error('Failed to fetch parent menus:', error)
    }
  }

  // 슬러그 생성 함수
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '') // 특수문자 제거
      .replace(/\s+/g, '-') // 공백을 하이픈으로
      .replace(/-+/g, '-') // 연속 하이픈 제거
      .trim()
      .replace(/^-|-$/g, '') // 시작/끝 하이픈 제거
  }

  // 한국어를 영어 슬러그로 변환하는 매핑
  const koreanToSlug: { [key: string]: string } = {
    '홈': '',
    '메인': '',
    '회사소개': 'company',
    '회사개요': 'company',
    '회사정보': 'company',
    '인사말': 'greeting',
    '사업장소개': 'location',
    '오시는길': 'location',
    '찾아오는길': 'location',
    '제품소개': 'products',
    '제품': 'products',
    '상품': 'products',
    '카탈로그': 'catalog',
    '인증정보': 'certification',
    '인증': 'certification',
    '특허': 'patents',
    '견적문의': 'inquiry',
    '문의': 'inquiry',
    '연락처': 'contact',
    '커뮤니티': 'community',
    '게시판': 'board',
    '공지사항': 'notice',
    '공지': 'notice',
    '뉴스': 'news',
    '소식': 'news',
    '갤러리': 'gallery',
    '포트폴리오': 'portfolio',
    '이벤트': 'event',
    '고객후기': 'review',
    '후기': 'review',
    '리뷰': 'review'
  }

  const generatePathFromTitle = (title: string): string => {
    const trimmedTitle = title.trim()
    
    // 한국어 매핑 확인
    if (koreanToSlug[trimmedTitle]) {
      return koreanToSlug[trimmedTitle] === '' ? '/' : `/${koreanToSlug[trimmedTitle]}`
    }
    
    // 영어인 경우 소문자로 변환
    if (/^[a-zA-Z\s-]+$/.test(trimmedTitle)) {
      const slug = generateSlug(trimmedTitle)
      return slug ? `/${slug}` : '/'
    }
    
    // 기타 한국어는 영문 슬러그로 변환
    const slug = generateSlug(trimmedTitle)
    return slug ? `/${slug}` : '/'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch(`/api/admin/menus/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId ? Number(formData.parentId) : null
        })
      })

      if (res.ok) {
        setMessage('메뉴가 성공적으로 수정되었습니다.')
        setTimeout(() => {
          router.push('/admin/menu')
        }, 1500)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '메뉴 수정 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to update menu:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    const newFormData = { ...formData, [field]: value }
    
    // 제목이 변경될 때 자동으로 경로 생성 (사용자가 직접 수정하지 않은 경우만)
    if (field === 'title' && value) {
      const autoPath = generatePathFromTitle(value)
      // 현재 경로가 이전 제목에서 자동 생성된 것과 같다면 새로 업데이트
      if (!formData.path || formData.path === generatePathFromTitle(formData.title)) {
        newFormData.path = autoPath
      }
    }
    
    setFormData(newFormData)
  }

  if (pageLoading) {
    return (
      <AdminLayout title="메뉴 수정">
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
    <AdminLayout title="메뉴 수정">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-edit me-3"></i>
                메뉴 수정
              </h2>
              <p className="text-muted mb-0">메뉴 정보를 수정하세요</p>
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
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-edit me-2"></i>
                    메뉴 정보
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>메뉴명 *</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="예: 회사소개, 제품소개, 견적문의"
                            required
                          />
                          <Form.Text className="text-muted">
                            메뉴명을 입력하면 URL이 자동으로 생성됩니다.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>경로 *</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.path}
                            onChange={(e) => handleChange('path', e.target.value)}
                            placeholder="메뉴명에서 자동 생성됩니다"
                            required
                          />
                          <Form.Text className="text-muted">
                            메뉴명을 입력하면 자동으로 생성됩니다. 필요시 직접 수정 가능합니다.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>메뉴 타입</Form.Label>
                          <Form.Select
                            value={formData.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                          >
                            <option value="internal">내부 링크</option>
                            <option value="external">외부 링크</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>타겟</Form.Label>
                          <Form.Select
                            value={formData.target}
                            onChange={(e) => handleChange('target', e.target.value)}
                          >
                            <option value="_self">같은 창</option>
                            <option value="_blank">새 창</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>상위 메뉴</Form.Label>
                          <Form.Select
                            value={formData.parentId}
                            onChange={(e) => handleChange('parentId', e.target.value)}
                          >
                            <option value="">최상위 메뉴</option>
                            {parentMenus.map(menu => (
                              <option key={menu.id} value={menu.id}>
                                {menu.title}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Text className="text-muted">
                            하위 메뉴로 만들려면 상위 메뉴를 선택하세요.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>정렬 순서</Form.Label>
                          <Form.Control
                            type="number"
                            value={formData.orderIndex}
                            onChange={(e) => handleChange('orderIndex', parseInt(e.target.value) || 0)}
                            min="0"
                          />
                          <Form.Text className="text-muted">
                            숫자가 작을수록 먼저 표시됩니다.
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        id="isActive"
                        label="메뉴 활성화"
                        checked={formData.isActive}
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                      />
                      <Form.Text className="text-muted">
                        비활성화된 메뉴는 사용자에게 표시되지 않습니다.
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
                            수정 중...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-2"></i>
                            메뉴 수정
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
                    <i className="fas fa-info-circle me-2"></i>
                    도움말
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="help-section">
                    <h6>메뉴 타입</h6>
                    <ul className="small">
                      <li><strong>내부 링크:</strong> 같은 사이트 내의 페이지</li>
                      <li><strong>외부 링크:</strong> 다른 사이트로의 링크</li>
                    </ul>
                    
                    <h6 className="mt-3">자동 경로 생성</h6>
                    <ul className="small">
                      <li>회사소개 → <code>/company</code></li>
                      <li>제품소개 → <code>/products</code></li>
                      <li>견적문의 → <code>/inquiry</code></li>
                      <li>갤러리 → <code>/gallery</code></li>
                    </ul>
                    <p className="small mt-2">
                      메뉴명을 입력하면 자동으로 URL이 생성됩니다.
                    </p>
                    
                    <h6 className="mt-3">메뉴 계층</h6>
                    <p className="small">
                      상위 메뉴를 선택하면 드롭다운 형태의 하위 메뉴가 됩니다.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </AdminLayout>
  )
}