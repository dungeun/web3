import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Table, Badge, Form, InputGroup, Modal, Alert, Row, Col } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Post {
  id: number
  title: string
  content: string
  author: string
  isPublished: boolean
  isPinned: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

export default function AdminNoticeBoard() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPublished: true,
    isPinned: false
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      // 실제로는 API 호출
      // const res = await fetch('/api/admin/board/notice')
      // const data = await res.json()
      
      // 더미 데이터
      const dummyPosts: Post[] = [
        {
          id: 1,
          title: '2024년 신년 인사말',
          content: '대경하드웨어를 아껴주시는 고객 여러분께 감사드립니다.',
          author: '관리자',
          isPublished: true,
          isPinned: true,
          viewCount: 245,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          title: '홈페이지 리뉴얼 안내',
          content: '더 나은 서비스 제공을 위해 홈페이지를 새롭게 단장했습니다.',
          author: '관리자',
          isPublished: true,
          isPinned: false,
          viewCount: 156,
          createdAt: '2024-01-10T00:00:00Z',
          updatedAt: '2024-01-10T00:00:00Z'
        }
      ]
      
      setPosts(dummyPosts)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      setError('게시글 목록을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // API 호출 로직
      setMessage(editingPost ? '게시글이 수정되었습니다.' : '게시글이 등록되었습니다.')
      setShowModal(false)
      resetForm()
      fetchPosts()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setError('저장 중 오류가 발생했습니다.')
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      isPublished: post.isPublished,
      isPinned: post.isPinned
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" 게시글을 정말 삭제하시겠습니까?`)) return

    try {
      // API 호출 로직
      setMessage('게시글이 삭제되었습니다.')
      fetchPosts()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setError('삭제 중 오류가 발생했습니다.')
    }
  }

  const resetForm = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      content: '',
      isPublished: true,
      isPinned: false
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout title="공지사항 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-bullhorn me-3"></i>
                공지사항 관리
              </h2>
              <p className="text-muted mb-0">공지사항을 작성하고 관리하세요</p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <i className="fas fa-plus me-2"></i>공지사항 작성
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

          {/* 검색 */}
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>검색</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="제목 또는 내용으로 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button variant="outline-secondary">
                        <i className="fas fa-search"></i>
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className="d-flex align-items-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setSearchTerm('')}
                    disabled={!searchTerm}
                  >
                    초기화
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                공지사항 목록 ({filteredPosts.length}개)
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
                      <th style={{ width: '50px' }}>No</th>
                      <th>제목</th>
                      <th className="text-center" style={{ width: '80px' }}>상태</th>
                      <th className="text-center" style={{ width: '80px' }}>고정</th>
                      <th className="text-center" style={{ width: '80px' }}>조회수</th>
                      <th className="text-center" style={{ width: '100px' }}>작성일</th>
                      <th className="text-center" style={{ width: '120px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          {searchTerm ? '검색 결과가 없습니다.' : '등록된 공지사항이 없습니다.'}
                        </td>
                      </tr>
                    ) : (
                      filteredPosts.map((post, index) => (
                        <tr key={post.id}>
                          <td>{filteredPosts.length - index}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {post.isPinned && (
                                <i className="fas fa-thumbtack text-warning me-2" title="고정됨"></i>
                              )}
                              <strong>{post.title}</strong>
                            </div>
                          </td>
                          <td className="text-center">
                            <Badge bg={post.isPublished ? 'success' : 'secondary'}>
                              {post.isPublished ? '공개' : '비공개'}
                            </Badge>
                          </td>
                          <td className="text-center">
                            {post.isPinned ? (
                              <i className="fas fa-check text-success"></i>
                            ) : (
                              <i className="fas fa-times text-muted"></i>
                            )}
                          </td>
                          <td className="text-center">{post.viewCount.toLocaleString()}</td>
                          <td className="text-center">
                            <small>{formatDate(post.createdAt)}</small>
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEdit(post)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(post.id, post.title)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
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

      {/* 게시글 작성/수정 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            {editingPost ? '공지사항 수정' : '공지사항 작성'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>제목 *</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="공지사항 제목을 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>내용 *</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="공지사항 내용을 입력하세요"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="isPublished"
                    label="공개 게시"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  <Form.Text className="text-muted">
                    체크하면 즉시 공개됩니다.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="isPinned"
                    label="상단 고정"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  />
                  <Form.Text className="text-muted">
                    체크하면 목록 상단에 고정됩니다.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowModal(false)
              resetForm()
            }}>
              취소
            </Button>
            <Button variant="primary" type="submit">
              <i className="fas fa-save me-2"></i>
              {editingPost ? '수정' : '등록'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </AdminLayout>
  )
}