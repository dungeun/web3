import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Table, Badge, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Page {
  id: number
  title: string
  slug: string
  content: string
  templateId?: string
  sections?: string
  metaTitle?: string
  metaDescription?: string
  menuId?: number
  menu?: {
    id: number
    title: string
    path: string
  }
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminPages() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setMessage('페이지가 삭제되었습니다.')
        setTimeout(() => setMessage(''), 3000)
        fetchPages()
      } else {
        const error = await res.json()
        alert(error.message || '삭제 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to delete page:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AdminLayout title="페이지 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-file-alt me-3"></i>
                페이지 관리
              </h2>
              <p className="text-muted mb-0">웹사이트의 페이지 콘텐츠를 관리하세요</p>
            </div>
            <Link href="/admin/pages/add" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>페이지 추가
            </Link>
          </div>
        </div>

        <div className="content-body">
          {error && (
            <Alert variant="danger" className="mb-4">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          )}

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                페이지 목록 ({pages.length}개)
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
                      <th>URL (Slug)</th>
                      <th>제목</th>
                      <th>템플릿 / 내용</th>
                      <th className="text-center">상태</th>
                      <th className="text-center">수정일</th>
                      <th className="text-center" style={{ width: '150px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-muted">
                          등록된 페이지가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      pages.map(page => (
                        <tr key={page.id}>
                          <td>
                            <Badge bg={page.slug === 'home' ? 'primary' : 'secondary'}>
                              {page.slug}
                            </Badge>
                          </td>
                          <td>
                            <strong>{page.title}</strong>
                            {page.slug === 'home' && (
                              <Badge bg="info" className="ms-2">홈페이지</Badge>
                            )}
                          </td>
                          <td>
                            <div style={{ 
                              maxWidth: '300px', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontSize: '0.9rem',
                              color: '#6c757d'
                            }}>
                              {page.templateId ? `템플릿: ${page.templateId}` : (page.content || '').substring(0, 100)}
                            </div>
                          </td>
                          <td className="text-center">
                            {page.isPublished ? (
                              <Badge bg="success">공개</Badge>
                            ) : (
                              <Badge bg="secondary">비공개</Badge>
                            )}
                          </td>
                          <td className="text-center">
                            <small>{formatDate(page.updatedAt)}</small>
                          </td>
                          <td className="text-center">
                            <Link href={`/admin/pages/edit/${page.id}`} className="btn btn-outline-primary btn-sm me-1">
                              <i className="fas fa-edit"></i>
                            </Link>
                            {page.slug !== 'home' && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(page.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}