import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Table, Button, Form, InputGroup, Pagination } from 'react-bootstrap'
import { Layout } from '@/components/Layout'

// 게시물 타입 정의
interface BasePost {
  id: number
  title: string
  author: string
  date: string
  views: number
}

interface QnaPost extends BasePost {
  answered: boolean
}

interface ReviewPost extends BasePost {
  rating: number
}

type Post = BasePost | QnaPost | ReviewPost

// 임시 데이터 (나중에 API로 대체)
const mockData = {
  notice: [
    { id: 1, title: '2024년 신년 인사말', author: '관리자', date: '2024-01-02', views: 153 },
    { id: 2, title: '설 연휴 배송 안내', author: '관리자', date: '2024-01-15', views: 89 },
    { id: 3, title: '신제품 출시 안내', author: '관리자', date: '2024-01-10', views: 234 },
  ],
  news: [
    { id: 1, title: '대경하드웨어, ISO 9001 재인증 획득', author: '홍보팀', date: '2024-01-20', views: 98 },
    { id: 2, title: '2023년 매출 전년 대비 20% 성장', author: '홍보팀', date: '2024-01-05', views: 156 },
  ],
  qna: [
    { id: 1, title: '제품 견적 문의드립니다', author: '김철수', date: '2024-01-18', views: 45, answered: true },
    { id: 2, title: '대량 주문 시 할인 가능한가요?', author: '이영희', date: '2024-01-17', views: 67, answered: false },
  ],
  review: [
    { id: 1, title: '품질이 정말 좋습니다!', author: '박민수', date: '2024-01-16', views: 123, rating: 5 },
    { id: 2, title: '빠른 배송 감사합니다', author: '정지원', date: '2024-01-14', views: 89, rating: 4 },
  ]
}

const boardTitles: { [key: string]: string } = {
  notice: '공지사항',
  news: '뉴스 & 소식',
  qna: 'Q&A',
  review: '고객 후기'
}

export default function BoardList() {
  const router = useRouter()
  const { type } = router.query as { type: string }
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const boardTitle = boardTitles[type] || '게시판'
  const posts = mockData[type as keyof typeof mockData] || []
  
  return (
    <Layout 
      title={boardTitle}
      showPageHeader={true}
      parentPage="/board"
      parentTitle="커뮤니티"
    >
      <section className="board-list-section py-5">
        <Container>
          {/* 검색 영역 */}
          <div className="search-area mb-4">
            <Row>
              <Col md={6}>
                <h3>{boardTitle}</h3>
              </Col>
              <Col md={6}>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="검색어를 입력하세요"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary">
                      <i className="fas fa-search"></i> 검색
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </div>
          
          {/* 게시판 목록 */}
          <Table hover responsive>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '120px' }}>작성자</th>
                <th style={{ width: '120px' }}>작성일</th>
                <th style={{ width: '80px' }}>조회수</th>
                {type === 'review' && <th style={{ width: '100px' }}>평점</th>}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{posts.length - index}</td>
                  <td>
                    <Link href={`/board/${type}/${post.id}`}>
                      {post.title}
                      {type === 'qna' && 'answered' in post && (
                        <span className={`ms-2 badge ${post.answered ? 'bg-success' : 'bg-warning'}`}>
                          {post.answered ? '답변완료' : '답변대기'}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>{post.views}</td>
                  {type === 'review' && (
                    <td>
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < ('rating' in post ? post.rating : 0) ? 'text-warning' : 'text-muted'}`}
                        ></i>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          
          {/* 글쓰기 버튼 */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              총 <strong>{posts.length}</strong>개의 글이 있습니다.
            </div>
            <Button variant="primary">
              <i className="fas fa-pen"></i> 글쓰기
            </Button>
          </div>
          
          {/* 페이지네이션 */}
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

// 필요한 import 추가
import { Row, Col } from 'react-bootstrap'