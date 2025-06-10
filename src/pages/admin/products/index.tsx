import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Table, Badge, Form, InputGroup, Pagination, Row, Col } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Product {
  id: number
  code: string
  name: string
  description: string
  price: number | null
  isActive: boolean
  category: {
    id: number
    code: string
    name: string
  }
  images: {
    url: string
    alt: string
  }[]
}

interface ProductCategory {
  id: number
  code: string
  name: string
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}

export default function AdminProducts() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState({
    categoryId: '',
    search: '',
    page: 1
  })

  useEffect(() => {
    Promise.all([
      fetchProducts(),
      fetchCategories()
    ]).finally(() => setLoading(false))
  }, [filters])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.categoryId) params.append('categoryId', filters.categoryId)
      if (filters.search) params.append('search', filters.search)
      params.append('page', filters.page.toString())
      
      const res = await fetch(`/api/admin/products?${params}`)
      const data = await res.json()
      
      if (res.ok) {
        setProducts(data.products || [])
        setPagination(data.pagination || {
          page: 1,
          limit: 20,
          totalCount: 0,
          totalPages: 0
        })
      } else {
        console.error('API Error:', data.message)
        setProducts([])
        setPagination({
          page: 1,
          limit: 20,
          totalCount: 0,
          totalPages: 0
        })
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
      setPagination({
        page: 1,
        limit: 20,
        totalCount: 0,
        totalPages: 0
      })
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

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      })
      fetchProducts()
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const formatPrice = (price: number | null) => {
    if (!price) return '가격 미정'
    return new Intl.NumberFormat('ko-KR').format(price) + '원'
  }

  return (
    <AdminLayout title="상품 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-box me-3"></i>
                상품 관리
              </h2>
              <p className="text-muted mb-0">등록된 상품을 관리하고 새로운 상품을 추가하세요</p>
            </div>
            <Link href="/admin/products/add" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>상품 추가
            </Link>
          </div>
        </div>

        <div className="content-body">

            {/* 검색 및 필터 */}
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>카테고리</Form.Label>
                      <Form.Select
                        value={filters.categoryId}
                        onChange={(e) => setFilters({ ...filters, categoryId: e.target.value, page: 1 })}
                      >
                        <option value="">전체 카테고리</option>
                        {Array.isArray(categories) && categories.map(category => (
                          <option key={category.id} value={category.id}>
                            [{category.code}] {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>검색</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="상품명, 설명, 코드로 검색"
                          value={filters.search}
                          onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                        />
                        <Button variant="outline-secondary">
                          <i className="fas fa-search"></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Button 
                      variant="outline-secondary" 
                      className="w-100"
                      onClick={() => setFilters({ categoryId: '', search: '', page: 1 })}
                    >
                      초기화
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">로딩 중...</div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span>총 {pagination?.totalCount || 0}개의 상품</span>
                      <span>{pagination?.page || 1} / {pagination?.totalPages || 1} 페이지</span>
                    </div>
                    
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th style={{ width: '80px' }}>이미지</th>
                          <th>코드</th>
                          <th>상품명</th>
                          <th>카테고리</th>
                          <th className="text-center">가격</th>
                          <th className="text-center">상태</th>
                          <th className="text-center" style={{ width: '120px' }}>작업</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td>
                              {product.images.length > 0 ? (
                                <img 
                                  src={product.images[0].url} 
                                  alt={product.images[0].alt}
                                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                  className="rounded"
                                />
                              ) : (
                                <div 
                                  style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    backgroundColor: '#f8f9fa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                  className="rounded"
                                >
                                  <i className="fas fa-image text-muted"></i>
                                </div>
                              )}
                            </td>
                            <td>
                              <Badge bg="secondary">{product.code}</Badge>
                            </td>
                            <td>
                              <strong>{product.name}</strong>
                              {product.description && (
                                <div className="text-muted small">
                                  {product.description.length > 50 
                                    ? product.description.substring(0, 50) + '...'
                                    : product.description
                                  }
                                </div>
                              )}
                            </td>
                            <td>
                              <Badge bg="info">
                                [{product.category.code}] {product.category.name}
                              </Badge>
                            </td>
                            <td className="text-center">{formatPrice(product.price)}</td>
                            <td className="text-center">
                              <Badge bg={product.isActive ? 'success' : 'danger'}>
                                {product.isActive ? '활성' : '비활성'}
                              </Badge>
                            </td>
                            <td className="text-center">
                              <Link href={`/admin/products/${product.id}`} passHref legacyBehavior>
                                <Button variant="outline-primary" size="sm" className="me-1">
                                  <i className="fas fa-edit"></i>
                                </Button>
                              </Link>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(product.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    {/* 페이지네이션 */}
                    {pagination && pagination.totalPages > 1 && (
                      <div className="d-flex justify-content-center mt-4">
                        <Pagination>
                          <Pagination.First 
                            disabled={(pagination?.page || 1) === 1}
                            onClick={() => handlePageChange(1)}
                          />
                          <Pagination.Prev 
                            disabled={(pagination?.page || 1) === 1}
                            onClick={() => handlePageChange((pagination?.page || 1) - 1)}
                          />
                          
                          {Array.from({ length: Math.min(5, pagination?.totalPages || 1) }, (_, i) => {
                            const page = (pagination?.page || 1) - 2 + i
                            if (page > 0 && page <= (pagination?.totalPages || 1)) {
                              return (
                                <Pagination.Item
                                  key={page}
                                  active={page === (pagination?.page || 1)}
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </Pagination.Item>
                              )
                            }
                            return null
                          })}
                          
                          <Pagination.Next 
                            disabled={(pagination?.page || 1) === (pagination?.totalPages || 1)}
                            onClick={() => handlePageChange((pagination?.page || 1) + 1)}
                          />
                          <Pagination.Last 
                            disabled={(pagination?.page || 1) === (pagination?.totalPages || 1)}
                            onClick={() => handlePageChange(pagination?.totalPages || 1)}
                          />
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
        </div>
      </div>
    </AdminLayout>
  )
}