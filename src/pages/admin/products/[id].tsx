import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, Form, Alert, Image } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Product {
  id: number
  code: string
  name: string
  description: string
  specifications: string
  price: number | null
  isActive: boolean
  category: {
    id: number
    code: string
    name: string
    nameKo: string
  }
  images: {
    id: number
    url: string
    alt: string
    orderIndex: number
  }[]
}

interface ProductCategory {
  id: number
  code: string
  name: string
  level: number
}

export default function AdminProductEdit() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    specifications: '',
    price: '',
    categoryId: '',
    isActive: true
  })

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchProduct(),
        fetchCategories()
      ]).finally(() => setLoading(false))
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/admin/products/${id}`)
      const data = await res.json()
      
      if (res.ok) {
        setProduct(data)
        setFormData({
          code: data.code || '',
          name: data.name || '',
          description: data.description || '',
          specifications: data.specifications || '',
          price: data.price ? data.price.toString() : '',
          categoryId: data.category.id.toString(),
          isActive: data.isActive
        })
      } else {
        setError(data.message || '상품을 불러올 수 없습니다.')
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
      setError('상품을 불러올 수 없습니다.')
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/products/categories?flat=true')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      setCategories([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
          categoryId: parseInt(formData.categoryId),
          images: product?.images || []
        })
      })

      if (res.ok) {
        setMessage('상품이 수정되었습니다.')
        setTimeout(() => {
          router.push('/admin/products')
        }, 2000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to save product:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('정말 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setMessage('상품이 삭제되었습니다.')
        setTimeout(() => {
          router.push('/admin/products')
        }, 1500)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '삭제 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
      setError('서버 오류가 발생했습니다.')
    }
  }

  if (loading) {
    return (
      <AdminLayout title="상품 수정">
        <AdminSidebar />
        <div className="admin-content">
          <div className="text-center py-5">로딩 중...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!product) {
    return (
      <AdminLayout title="상품 수정">
        <AdminSidebar />
        <div className="admin-content">
          <div className="text-center py-5">
            <h4>상품을 찾을 수 없습니다.</h4>
            <Link href="/admin/products" className="btn btn-primary mt-3">
              상품 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="상품 수정">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-edit me-3"></i>
                상품 수정
              </h2>
              <p className="text-muted mb-0">상품 정보를 수정하고 이미지를 관리하세요</p>
            </div>
            <div>
              <Link href="/admin/products" className="btn btn-outline-secondary me-2">
                <i className="fas fa-arrow-left me-2"></i>목록으로
              </Link>
              <Button variant="danger" onClick={handleDelete}>
                <i className="fas fa-trash me-2"></i>삭제
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

          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    기본 정보
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>상품 코드</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.code}
                            onChange={(e) => setFormData({...formData, code: e.target.value})}
                            placeholder="예: A-610"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>카테고리 *</Form.Label>
                          <Form.Select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                            required
                          >
                            <option value="">카테고리 선택</option>
                            {Array.isArray(categories) && categories.map(category => (
                              <option key={category.id} value={category.id}>
                                [{category.code}] {category.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>상품명 *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="상품명을 입력하세요"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>상품 설명</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="상품에 대한 설명을 입력하세요"
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>가격 (원)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            placeholder="0"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>상태</Form.Label>
                          <Form.Check
                            type="switch"
                            id="isActive"
                            label={formData.isActive ? "활성" : "비활성"}
                            checked={formData.isActive}
                            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                            className="mt-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>제품 사양 (JSON)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.specifications}
                        onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                        placeholder='{"재질": "스테인리스", "크기": "50mm x 30mm"}'
                      />
                      <Form.Text className="text-muted">
                        JSON 형태로 제품 사양을 입력하세요 (선택사항)
                      </Form.Text>
                    </Form.Group>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button
                        variant="secondary"
                        onClick={() => router.push('/admin/products')}
                        disabled={saving}
                      >
                        취소
                      </Button>
                      <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            저장 중...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-2"></i>
                            수정 완료
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
                    <i className="fas fa-images me-2"></i>
                    상품 이미지 ({product.images.length}개)
                  </h5>
                </Card.Header>
                <Card.Body>
                  {product.images.length > 0 ? (
                    <div className="row g-2">
                      {product.images.map((image, index) => (
                        <div key={image.id} className="col-6">
                          <div className="position-relative">
                            <Image
                              src={image.url}
                              alt={image.alt}
                              className="w-100 rounded"
                              style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                            />
                            <div className="position-absolute top-0 start-0 m-1">
                              <span className="badge bg-primary">{index + 1}</span>
                            </div>
                          </div>
                          <small className="text-muted d-block mt-1 text-truncate">
                            {image.alt}
                          </small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-image text-muted fa-3x mb-3"></i>
                      <p className="text-muted">등록된 이미지가 없습니다.</p>
                    </div>
                  )}
                  
                  <div className="mt-3 pt-3 border-top">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      이미지는 폴더 구조와 자동으로 연결됩니다.
                    </small>
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