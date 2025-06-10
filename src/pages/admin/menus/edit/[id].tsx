import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Menu {
  id: number
  title: string
  path: string
  parentId: number | null
  orderIndex: number
  isActive: boolean
  target: string
  type: string
}

export default function EditMenu() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [menus, setMenus] = useState<Menu[]>([])
  
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    parentId: '',
    orderIndex: 0,
    isActive: true,
    target: '_self',
    type: 'internal'
  })

  useEffect(() => {
    if (id) {
      fetchMenu()
      fetchMenus()
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
          parentId: menu.parentId ? menu.parentId.toString() : '',
          orderIndex: menu.orderIndex,
          isActive: menu.isActive,
          target: menu.target || '_self',
          type: menu.type || 'internal'
        })
      } else {
        throw new Error('Menu not found')
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error)
      setError('메뉴를 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/admin/menus')
      if (res.ok) {
        const data = await res.json()
        // 현재 메뉴와 그 하위 메뉴를 제외
        const filteredMenus = data.filter((menu: Menu) => 
          menu.id !== parseInt(id as string) && menu.parentId !== parseInt(id as string)
        )
        setMenus(filteredMenus)
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch(`/api/admin/menus/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId ? parseInt(formData.parentId) : null,
          orderIndex: parseInt(formData.orderIndex.toString())
        })
      })

      if (res.ok) {
        setMessage('메뉴가 수정되었습니다.')
        setTimeout(() => {
          router.push('/admin/menus')
        }, 1500)
      } else {
        throw new Error('Failed to update menu')
      }
    } catch (error) {
      console.error('Failed to update menu:', error)
      setError('메뉴 수정 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="메뉴 수정">
        <AdminSidebar />
        <div className="admin-content">
          <div className="content-body">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
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
              <p className="text-muted mb-0">메뉴 정보를 수정합니다</p>
            </div>
            <Link href="/admin/menus" className="btn btn-secondary">
              <i className="fas fa-arrow-left me-2"></i>
              목록으로
            </Link>
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

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>메뉴 제목 *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="메뉴 제목을 입력하세요"
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>경로 *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.path}
                        onChange={(e) => setFormData({...formData, path: e.target.value})}
                        placeholder="/company 또는 https://example.com"
                        required
                      />
                      <Form.Text className="text-muted">
                        내부 링크는 /로 시작, 외부 링크는 http://로 시작
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>상위 메뉴</Form.Label>
                      <Form.Select
                        value={formData.parentId}
                        onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                      >
                        <option value="">최상위 메뉴</option>
                        {menus.filter(m => !m.parentId).map((menu) => (
                          <option key={menu.id} value={menu.id}>
                            {menu.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>정렬 순서</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.orderIndex}
                        onChange={(e) => setFormData({...formData, orderIndex: parseInt(e.target.value) || 0})}
                        min="0"
                      />
                      <Form.Text className="text-muted">
                        숫자가 작을수록 앞에 표시됩니다
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>링크 타입</Form.Label>
                      <Form.Select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="internal">내부 링크</option>
                        <option value="external">외부 링크</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>링크 타겟</Form.Label>
                      <Form.Select
                        value={formData.target}
                        onChange={(e) => setFormData({...formData, target: e.target.value})}
                      >
                        <option value="_self">현재 창</option>
                        <option value="_blank">새 창</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>상태</Form.Label>
                      <div className="mt-2">
                        <Form.Check
                          type="switch"
                          id="isActive"
                          label={formData.isActive ? '활성' : '비활성'}
                          checked={formData.isActive}
                          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <hr />

                <div className="d-flex justify-content-end gap-2">
                  <Link href="/admin/menus" className="btn btn-secondary">
                    취소
                  </Link>
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
                        저장
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}