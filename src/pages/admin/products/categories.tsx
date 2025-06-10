import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, Table, Badge, Form, Modal, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface ProductCategory {
  id: number
  code: string
  name: string
  nameKo?: string
  description: string
  level: number
  parentId?: number
  orderIndex: number
  isActive: boolean
  children?: ProductCategory[]
  _count?: {
    products: number
  }
}

export default function AdminProductCategories() {
  const router = useRouter()
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set())
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    nameKo: '',
    description: '',
    level: 1,
    parentId: '',
    orderIndex: 0,
    isActive: true
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/products/categories')
      const data = await res.json()
      setCategories(data)
      
      // 초기에 모든 카테고리를 펼친 상태로 설정
      if (Array.isArray(data)) {
        const allCategoryIds = new Set(data.map((cat: ProductCategory) => cat.id))
        setExpandedCategories(allCategoryIds)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      setError('카테고리 목록을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    
    try {
      const url = editingCategory 
        ? `/api/admin/products/categories/${editingCategory.id}`
        : '/api/admin/products/categories'
      
      const method = editingCategory ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId ? Number(formData.parentId) : null
        })
      })

      if (res.ok) {
        setMessage(editingCategory ? '카테고리가 수정되었습니다.' : '카테고리가 추가되었습니다.')
        setShowModal(false)
        resetForm()
        fetchCategories()
        setTimeout(() => setMessage(''), 3000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to save category:', error)
      setError('서버 오류가 발생했습니다.')
    }
  }

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      nameKo: '',
      description: '',
      level: 1,
      parentId: '',
      orderIndex: 0,
      isActive: true
    })
    setEditingCategory(null)
  }

  const handleEdit = (category: ProductCategory) => {
    setFormData({
      code: category.code,
      name: category.name,
      nameKo: category.nameKo || '',
      description: category.description || '',
      level: category.level,
      parentId: category.parentId ? category.parentId.toString() : '',
      orderIndex: category.orderIndex,
      isActive: category.isActive
    })
    setEditingCategory(category)
    setShowModal(true)
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" 카테고리를 정말 삭제하시겠습니까?`)) return

    try {
      await fetch(`/api/admin/products/categories/${id}`, {
        method: 'DELETE'
      })
      setMessage('카테고리가 삭제되었습니다.')
      fetchCategories()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Failed to delete category:', error)
      setError('카테고리 삭제 중 오류가 발생했습니다.')
    }
  }

  // 카테고리 토글
  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  // 총 카테고리 수 계산
  const getTotalCount = () => {
    if (!Array.isArray(categories)) return 0
    let total = categories.length
    categories.forEach(cat => {
      if (cat.children) total += cat.children.length
    })
    return total
  }

  return (
    <AdminLayout title="카테고리 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-tags me-3"></i>
                상품 카테고리 관리
              </h2>
              <p className="text-muted mb-0">제품 분류 체계를 관리하세요</p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <i className="fas fa-plus me-2"></i>카테고리 추가
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

          {/* 통계 카드 */}
          <Row className="mb-4">
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-primary mb-3">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <h3 className="stats-number text-primary">{getTotalCount()}</h3>
                  <p className="stats-label">총 카테고리</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-success mb-3">
                    <i className="fas fa-folder"></i>
                  </div>
                  <h3 className="stats-number text-success">{Array.isArray(categories) ? categories.length : 0}</h3>
                  <p className="stats-label">대분류</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-info mb-3">
                    <i className="fas fa-folder-open"></i>
                  </div>
                  <h3 className="stats-number text-info">
                    {Array.isArray(categories) ? categories.reduce((total, cat) => total + (cat.children?.length || 0), 0) : 0}
                  </h3>
                  <p className="stats-label">중분류</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-warning mb-3">
                    <i className="fas fa-box"></i>
                  </div>
                  <h3 className="stats-number text-warning">
                    {Array.isArray(categories) ? categories.reduce((total, cat) => {
                      const mainProducts = cat._count?.products || 0
                      const childProducts = cat.children?.reduce((sum, child) => sum + (child._count?.products || 0), 0) || 0
                      return total + mainProducts + childProducts
                    }, 0) : 0}
                  </h3>
                  <p className="stats-label">총 상품</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                카테고리 목록 (계층구조)
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
                      <th style={{ width: '120px' }}>코드</th>
                      <th>카테고리명</th>
                      <th>설명</th>
                      <th className="text-center" style={{ width: '100px' }}>레벨</th>
                      <th className="text-center" style={{ width: '100px' }}>상품 수</th>
                      <th className="text-center" style={{ width: '150px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!Array.isArray(categories) || categories.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-muted">
                          등록된 카테고리가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      Array.isArray(categories) && categories.map((category) => (
                        <React.Fragment key={category.id}>
                          {/* 대분류 */}
                          <tr className="bg-light" style={{ cursor: 'pointer' }}>
                            <td onClick={() => toggleCategory(category.id)}>
                              <code className="bg-primary text-white px-2 py-1 rounded fw-bold">{category.code}</code>
                            </td>
                            <td onClick={() => toggleCategory(category.id)}>
                              <strong className="text-dark">
                                <i className={`fas fa-folder${expandedCategories.has(category.id) ? '-open' : ''} me-2 text-primary`}></i>
                                {category.nameKo || category.name}
                                {category.children && category.children.length > 0 && (
                                  <span className="ms-2 text-muted">({category.children.length})</span>
                                )}
                              </strong>
                              <br />
                              <small className="text-muted">{category.name}</small>
                            </td>
                            <td onClick={() => toggleCategory(category.id)} className="text-muted">{category.description || '-'}</td>
                            <td onClick={() => toggleCategory(category.id)} className="text-center">
                              <Badge bg="primary">대분류</Badge>
                            </td>
                            <td onClick={() => toggleCategory(category.id)} className="text-center">
                              <Badge bg="secondary">{category._count?.products || 0}</Badge>
                            </td>
                            <td className="text-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-1"
                                onClick={() => handleEdit(category)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(category.id, category.nameKo || category.name)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                          
                          {/* 중분류 */}
                          {category.children && expandedCategories.has(category.id) && category.children.map((child) => (
                            <tr key={child.id}>
                              <td>
                                <div className="ms-3">
                                  <code className="bg-light text-secondary px-2 py-1 rounded">{child.code}</code>
                                </div>
                              </td>
                              <td>
                                <div className="ms-3">
                                  <i className="fas fa-level-up-alt fa-rotate-90 text-muted me-2"></i>
                                  <strong>{child.nameKo || child.name}</strong>
                                  <br />
                                  <small className="text-muted ms-4">{child.name}</small>
                                </div>
                              </td>
                              <td className="text-muted">{child.description || '-'}</td>
                              <td className="text-center">
                                <Badge bg="info" text="white">중분류</Badge>
                              </td>
                              <td className="text-center">
                                <Badge bg="light" text="dark">{child._count?.products || 0}</Badge>
                              </td>
                              <td className="text-center">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                  onClick={() => handleEdit(child)}
                                >
                                  <i className="fas fa-edit"></i>
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDelete(child.id, child.nameKo || child.name)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* 카테고리 추가/수정 모달 */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-tags me-2"></i>
            {editingCategory ? '카테고리 수정' : '카테고리 추가'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>카테고리 코드 *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="예: A, A-1, B-2"
                    required
                  />
                  <Form.Text className="text-muted">
                    고유한 코드를 입력하세요 (예: A, B, C 또는 A-1, A-2)
                  </Form.Text>
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
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>영문명 *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="예: Handlelocker & Fasterner"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>한글명</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nameKo}
                    onChange={(e) => setFormData({...formData, nameKo: e.target.value})}
                    placeholder="예: 핸들로커 및 패스너"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>설명</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="카테고리에 대한 설명을 입력하세요"
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>레벨 *</Form.Label>
                  <Form.Select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: parseInt(e.target.value), parentId: ''})}
                  >
                    <option value={1}>대분류</option>
                    <option value={2}>중분류</option>
                    <option value={3}>소분류</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>상위 카테고리</Form.Label>
                  <Form.Select
                    value={formData.parentId}
                    onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                    disabled={formData.level === 1}
                  >
                    <option value="">선택 안함</option>
                    {Array.isArray(categories) && categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameKo || cat.name} ({cat.code})
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    {formData.level === 1 ? '대분류는 상위 카테고리가 없습니다.' : '중분류/소분류는 상위 카테고리를 선택하세요.'}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="isActive"
                label="활성화"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
            </Form.Group>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                취소
              </Button>
              <Button type="submit" variant="primary">
                <i className="fas fa-save me-2"></i>
                {editingCategory ? '수정' : '추가'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

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

        .table-secondary {
          background-color: rgba(108, 117, 125, 0.1) !important;
          transition: background-color 0.2s ease;
        }
        
        .table-secondary:hover {
          background-color: rgba(108, 117, 125, 0.15) !important;
        }

        .table-light {
          background-color: rgba(248, 249, 250, 0.5) !important;
        }
      `}</style>
    </AdminLayout>
  )
}