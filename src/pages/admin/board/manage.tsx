import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, Table, Badge, Form, Modal, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface BoardItem {
  id: number
  title: string
  content: string
  type: 'notice' | 'news' | 'event'
  isPublished: boolean
  isPinned: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

export default function AdminBoardManage() {
  const router = useRouter()
  const [boardList, setBoardList] = useState<BoardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBoard, setEditingBoard] = useState<BoardItem | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'notice' as 'notice' | 'news' | 'event',
    isPublished: true,
    isPinned: false
  })

  useEffect(() => {
    fetchBoardList()
  }, [])

  const fetchBoardList = async () => {
    try {
      // 실제 API 연동 시 사용할 코드
      // const res = await fetch('/api/admin/board')
      // const data = await res.json()
      // setBoardList(data)
      
      // 임시 데이터
      const dummyData: BoardItem[] = [
        {
          id: 1,
          title: "신제품 출시 안내",
          content: "새로운 핸들 락 시리즈가 출시되었습니다.",
          type: "notice",
          isPublished: true,
          isPinned: true,
          viewCount: 125,
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "2024년 하드웨어 전시회 참가",
          content: "대경하드웨어가 2024년 국제 하드웨어 전시회에 참가합니다.",
          type: "news",
          isPublished: true,
          isPinned: false,
          viewCount: 89,
          createdAt: "2024-01-14T14:20:00Z",
          updatedAt: "2024-01-14T14:20:00Z"
        },
        {
          id: 3,
          title: "신년 할인 이벤트",
          content: "신년을 맞아 모든 제품 20% 할인 이벤트를 진행합니다.",
          type: "event",
          isPublished: false,
          isPinned: false,
          viewCount: 0,
          createdAt: "2024-01-13T09:15:00Z",
          updatedAt: "2024-01-13T09:15:00Z"
        }
      ]
      setBoardList(dummyData)
    } catch (error) {
      console.error('Failed to fetch board list:', error)
      setError('게시글 목록을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    
    try {
      // 실제 API 연동 시 사용할 코드
      // const url = editingBoard 
      //   ? `/api/admin/board/${editingBoard.id}`
      //   : '/api/admin/board'
      // const method = editingBoard ? 'PUT' : 'POST'
      // await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // 임시 처리
      if (editingBoard) {
        setBoardList(prev => prev.map(item => 
          item.id === editingBoard.id 
            ? { ...item, ...formData, updatedAt: new Date().toISOString() }
            : item
        ))
        setMessage('게시글이 수정되었습니다.')
      } else {
        const newBoard: BoardItem = {
          id: Date.now(),
          ...formData,
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setBoardList(prev => [newBoard, ...prev])
        setMessage('게시글이 등록되었습니다.')
      }

      setShowModal(false)
      resetForm()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Failed to save board:', error)
      setError('게시글 저장 중 오류가 발생했습니다.')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'notice',
      isPublished: true,
      isPinned: false
    })
    setEditingBoard(null)
  }

  const handleEdit = (board: BoardItem) => {
    setFormData({
      title: board.title,
      content: board.content,
      type: board.type,
      isPublished: board.isPublished,
      isPinned: board.isPinned
    })
    setEditingBoard(board)
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      // 실제 API 연동 시 사용할 코드
      // await fetch(`/api/admin/board/${id}`, { method: 'DELETE' })

      // 임시 처리
      setBoardList(prev => prev.filter(item => item.id !== id))
      setMessage('게시글이 삭제되었습니다.')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Failed to delete board:', error)
      setError('게시글 삭제 중 오류가 발생했습니다.')
    }
  }

  const getTypeLabel = (type: string) => {
    const types = {
      notice: { label: '공지사항', color: 'primary' },
      news: { label: '뉴스', color: 'info' },
      event: { label: '이벤트', color: 'success' }
    }
    return types[type as keyof typeof types] || { label: '기타', color: 'secondary' }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  return (
    <AdminLayout title="게시판 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-clipboard-list me-3"></i>
                게시판 관리
              </h2>
              <p className="text-muted mb-0">공지사항, 뉴스, 이벤트를 관리하세요</p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <i className="fas fa-plus me-2"></i>게시글 추가
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
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h3 className="stats-number text-primary">{boardList.length}</h3>
                  <p className="stats-label">총 게시글</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-success mb-3">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3 className="stats-number text-success">
                    {boardList.filter(b => b.isPublished).length}
                  </h3>
                  <p className="stats-label">게시중</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-warning mb-3">
                    <i className="fas fa-thumbtack"></i>
                  </div>
                  <h3 className="stats-number text-warning">
                    {boardList.filter(b => b.isPinned).length}
                  </h3>
                  <p className="stats-label">고정글</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-info mb-3">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3 className="stats-number text-info">
                    {boardList.reduce((sum, b) => sum + b.viewCount, 0)}
                  </h3>
                  <p className="stats-label">총 조회수</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                게시글 목록
              </h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>#</th>
                      <th>제목</th>
                      <th className="text-center" style={{ width: '100px' }}>분류</th>
                      <th className="text-center" style={{ width: '80px' }}>상태</th>
                      <th className="text-center" style={{ width: '80px' }}>조회수</th>
                      <th className="text-center" style={{ width: '120px' }}>작성일</th>
                      <th className="text-center" style={{ width: '150px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          등록된 게시글이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      boardList.map((board) => (
                        <tr key={board.id}>
                          <td>
                            {board.isPinned && (
                              <i className="fas fa-thumbtack text-warning me-1"></i>
                            )}
                            {board.id}
                          </td>
                          <td>
                            <div>
                              <strong>{board.title}</strong>
                              <br />
                              <small className="text-muted">
                                {board.content.length > 50 
                                  ? `${board.content.substring(0, 50)}...`
                                  : board.content
                                }
                              </small>
                            </div>
                          </td>
                          <td className="text-center">
                            <Badge bg={getTypeLabel(board.type).color}>
                              {getTypeLabel(board.type).label}
                            </Badge>
                          </td>
                          <td className="text-center">
                            {board.isPublished ? (
                              <Badge bg="success">게시중</Badge>
                            ) : (
                              <Badge bg="secondary">비공개</Badge>
                            )}
                          </td>
                          <td className="text-center">{board.viewCount}</td>
                          <td className="text-center">
                            {formatDate(board.createdAt)}
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEdit(board)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(board.id)}
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

      {/* 게시글 추가/수정 모달 */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            {editingBoard ? '게시글 수정' : '게시글 추가'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>제목 *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="게시글 제목을 입력하세요"
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>분류 *</Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  >
                    <option value="notice">공지사항</option>
                    <option value="news">뉴스</option>
                    <option value="event">이벤트</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>내용 *</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="게시글 내용을 입력하세요"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="isPublished"
                    label="즉시 게시"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="isPinned"
                    label="상단 고정"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                취소
              </Button>
              <Button type="submit" variant="primary">
                <i className="fas fa-save me-2"></i>
                {editingBoard ? '수정' : '등록'}
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
      `}</style>
    </AdminLayout>
  )
}