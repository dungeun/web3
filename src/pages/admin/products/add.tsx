import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface ProductCategory {
  id: number
  code: string
  name: string
}

export default function AdminProductAdd() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    categoryId: '',
    specifications: '',
    price: '',
    isActive: true
  })

  const [images, setImages] = useState<Array<{ url: string; alt: string }>>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/products/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      setError('카테고리 목록을 불러올 수 없습니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryId: Number(formData.categoryId),
          price: formData.price ? Number(formData.price) : null,
          specifications: formData.specifications ? JSON.parse(formData.specifications) : null,
          images
        })
      })

      if (res.ok) {
        setMessage('상품이 성공적으로 추가되었습니다.')
        setTimeout(() => {
          router.push('/admin/products')
        }, 1500)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '상품 추가 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to create product:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const addImage = () => {
    setImages([...images, { url: '', alt: '' }])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const updateImage = (index: number, field: string, value: string) => {
    const newImages = [...images]
    newImages[index] = { ...newImages[index], [field]: value }
    setImages(newImages)
  }

  return (
    <AdminLayout title="상품 추가">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-plus me-3"></i>
                상품 추가
              </h2>
              <p className="text-muted mb-0">새로운 상품을 등록하세요</p>
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

          <Form onSubmit={handleSubmit}>
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
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>상품 코드 *</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.code}
                            onChange={(e) => handleChange('code', e.target.value)}
                            placeholder="예: A-610, B-100"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>카테고리 *</Form.Label>
                          <Form.Select
                            value={formData.categoryId}
                            onChange={(e) => handleChange('categoryId', e.target.value)}
                            required
                          >
                            <option value="">카테고리 선택</option>
                            {categories.map(category => (
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
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="상품명을 입력하세요"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>상품 설명</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="상품에 대한 상세 설명을 입력하세요"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>가격</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        placeholder="상품 가격 (선택사항)"
                        min="0"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>제품 사양 (JSON)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.specifications}
                        onChange={(e) => handleChange('specifications', e.target.value)}
                        placeholder='예: {"재질": "스테인리스", "크기": "100x50mm"}'
                      />
                      <Form.Text className="text-muted">
                        JSON 형태로 제품 사양을 입력하세요. (선택사항)
                      </Form.Text>
                    </Form.Group>

                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        id="isActive"
                        label="상품 활성화"
                        checked={formData.isActive}
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                      />
                      <Form.Text className="text-muted">
                        비활성화된 상품은 고객에게 표시되지 않습니다.
                      </Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fas fa-images me-2"></i>
                        상품 이미지
                      </h5>
                      <Button variant="outline-primary" size="sm" onClick={addImage}>
                        <i className="fas fa-plus me-2"></i>이미지 추가
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {images.length === 0 ? (
                      <p className="text-muted text-center py-3">
                        이미지가 등록되지 않았습니다. 이미지 추가 버튼을 클릭하세요.
                      </p>
                    ) : (
                      images.map((image, index) => (
                        <div key={index} className="border rounded p-3 mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0">이미지 {index + 1}</h6>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeImage(index)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                          <Row>
                            <Col md={8}>
                              <Form.Group className="mb-2">
                                <Form.Label>이미지 URL</Form.Label>
                                <Form.Control
                                  type="url"
                                  value={image.url}
                                  onChange={(e) => updateImage(index, 'url', e.target.value)}
                                  placeholder="이미지 URL을 입력하세요"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-2">
                                <Form.Label>Alt 텍스트</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={image.alt}
                                  onChange={(e) => updateImage(index, 'alt', e.target.value)}
                                  placeholder="이미지 설명"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      ))
                    )}
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card>
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
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="loading-spinner me-2"></span>
                            저장 중...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-plus me-2"></i>
                            상품 추가
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => router.back()}
                        disabled={loading}
                      >
                        취소
                      </Button>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="fas fa-lightbulb me-2"></i>
                      도움말
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="help-section">
                      <h6>상품 코드</h6>
                      <p className="small">
                        카테고리 코드와 일련번호를 조합하여 작성합니다.<br />
                        예: A-610, B-100, C-026
                      </p>
                      
                      <h6>이미지 URL</h6>
                      <p className="small">
                        이미지 파일의 전체 URL을 입력하세요.<br />
                        예: /images/products/A-610.jpg
                      </p>
                      
                      <h6>제품 사양</h6>
                      <p className="small">
                        JSON 형태로 입력하면 구조화된 데이터로 저장됩니다.
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