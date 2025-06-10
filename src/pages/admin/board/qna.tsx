import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col, Card, Button, Table, Badge, Form, Modal, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface QnAItem {
  id: number
  title: string
  content: string
  author: string
  email: string
  isAnswered: boolean
  isPublic: boolean
  createdAt: string
  answer?: string
  answeredAt?: string
}

export default function AdminQnA() {
  const router = useRouter()
  const [qnaList, setQnaList] = useState<QnAItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedQnA, setSelectedQnA] = useState<QnAItem | null>(null)
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchQnAList()
  }, [])

  const fetchQnAList = async () => {
    try {
      // 실제 API 연동 시 사용할 코드
      // const res = await fetch('/api/admin/qna')
      // const data = await res.json()
      // setQnaList(data)
      
      // 임시 데이터
      const dummyData: QnAItem[] = [
        {
          id: 1,
          title: "제품 문의드립니다",
          content: "A-610 플랫 락 제품의 자세한 스펙을 알고 싶습니다.",
          author: "김고객",
          email: "customer@example.com",
          isAnswered: false,
          isPublic: true,
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          id: 2,
          title: "배송 관련 문의",
          content: "주문한 제품의 배송 현황을 확인하고 싶습니다.",
          author: "이구매",
          email: "buyer@example.com",
          isAnswered: true,
          isPublic: false,
          createdAt: "2024-01-14T14:20:00Z",
          answer: "주문하신 제품은 현재 배송 중이며, 내일 오전에 도착 예정입니다.",
          answeredAt: "2024-01-14T16:45:00Z"
        }
      ]
      setQnaList(dummyData)
    } catch (error) {
      console.error('Failed to fetch QnA list:', error)
      setError('QnA 목록을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (qna: QnAItem) => {
    setSelectedQnA(qna)
    setAnswer(qna.answer || '')
    setShowModal(true)
  }

  const handleSubmitAnswer = async () => {
    if (!selectedQnA || !answer.trim()) return

    try {
      // 실제 API 연동 시 사용할 코드
      // await fetch(`/api/admin/qna/${selectedQnA.id}/answer`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ answer })
      // })

      // 임시 처리
      setQnaList(prev => prev.map(item => 
        item.id === selectedQnA.id 
          ? { ...item, answer, isAnswered: true, answeredAt: new Date().toISOString() }
          : item
      ))

      setMessage('답변이 등록되었습니다.')
      setShowModal(false)
      setSelectedQnA(null)
      setAnswer('')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Failed to submit answer:', error)
      setError('답변 등록 중 오류가 발생했습니다.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  return (
    <AdminLayout title="QnA 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-question-circle me-3"></i>
                QnA 관리
              </h2>
              <p className="text-muted mb-0">고객 문의를 관리하고 답변하세요</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="success">
                <i className="fas fa-download me-2"></i>
                엑셀 다운로드
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

          {/* 통계 카드 */}
          <Row className="mb-4">
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-primary mb-3">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h3 className="stats-number text-primary">{qnaList.length}</h3>
                  <p className="stats-label">총 문의</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-warning mb-3">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3 className="stats-number text-warning">
                    {qnaList.filter(q => !q.isAnswered).length}
                  </h3>
                  <p className="stats-label">미답변</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-success mb-3">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="stats-number text-success">
                    {qnaList.filter(q => q.isAnswered).length}
                  </h3>
                  <p className="stats-label">답변 완료</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-info mb-3">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3 className="stats-number text-info">
                    {qnaList.filter(q => q.isPublic).length}
                  </h3>
                  <p className="stats-label">공개 문의</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                QnA 목록
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
                      <th style={{ width: '120px' }}>작성자</th>
                      <th className="text-center" style={{ width: '100px' }}>상태</th>
                      <th className="text-center" style={{ width: '100px' }}>공개여부</th>
                      <th className="text-center" style={{ width: '120px' }}>작성일</th>
                      <th className="text-center" style={{ width: '120px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qnaList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          등록된 QnA가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      qnaList.map((qna) => (
                        <tr key={qna.id}>
                          <td>{qna.id}</td>
                          <td>
                            <div>
                              <strong>{qna.title}</strong>
                              <br />
                              <small className="text-muted">
                                {qna.content.length > 50 
                                  ? `${qna.content.substring(0, 50)}...`
                                  : qna.content
                                }
                              </small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <strong>{qna.author}</strong>
                              <br />
                              <small className="text-muted">{qna.email}</small>
                            </div>
                          </td>
                          <td className="text-center">
                            {qna.isAnswered ? (
                              <Badge bg="success">답변완료</Badge>
                            ) : (
                              <Badge bg="warning">미답변</Badge>
                            )}
                          </td>
                          <td className="text-center">
                            {qna.isPublic ? (
                              <Badge bg="info">공개</Badge>
                            ) : (
                              <Badge bg="secondary">비공개</Badge>
                            )}
                          </td>
                          <td className="text-center">
                            {formatDate(qna.createdAt)}
                          </td>
                          <td className="text-center">
                            <Button
                              variant={qna.isAnswered ? "outline-primary" : "primary"}
                              size="sm"
                              onClick={() => handleAnswer(qna)}
                            >
                              {qna.isAnswered ? (
                                <i className="fas fa-edit"></i>
                              ) : (
                                <i className="fas fa-reply"></i>
                              )}
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

      {/* 답변 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-reply me-2"></i>
            {selectedQnA?.isAnswered ? '답변 수정' : '답변 작성'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQnA && (
            <>
              <div className="mb-4 p-3 bg-light rounded">
                <h6 className="fw-bold">{selectedQnA.title}</h6>
                <p className="mb-2">{selectedQnA.content}</p>
                <small className="text-muted">
                  작성자: {selectedQnA.author} ({selectedQnA.email}) | 
                  작성일: {formatDate(selectedQnA.createdAt)}
                </small>
              </div>
              
              <Form.Group>
                <Form.Label>답변 내용</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="답변을 입력하세요..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            취소
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmitAnswer}
            disabled={!answer.trim()}
          >
            <i className="fas fa-save me-2"></i>
            답변 저장
          </Button>
        </Modal.Footer>
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