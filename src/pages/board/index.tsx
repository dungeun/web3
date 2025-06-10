import React from 'react'
import Link from 'next/link'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Layout } from '@/components/Layout'

const boardCategories = [
  {
    id: 'notice',
    title: '공지사항',
    description: '대경하드웨어의 중요한 공지사항을 확인하세요.',
    icon: 'fas fa-bullhorn',
    color: '#e74c3c'
  },
  {
    id: 'news',
    title: '뉴스 & 소식',
    description: '업계 동향과 회사 소식을 전해드립니다.',
    icon: 'fas fa-newspaper',
    color: '#3498db'
  },
  {
    id: 'qna',
    title: 'Q&A',
    description: '궁금한 점을 문의하고 답변을 받아보세요.',
    icon: 'fas fa-question-circle',
    color: '#2ecc71'
  },
  {
    id: 'review',
    title: '고객 후기',
    description: '고객님들의 소중한 후기를 확인하세요.',
    icon: 'fas fa-star',
    color: '#f39c12'
  }
]

export default function BoardIndex() {
  return (
    <Layout 
      title="커뮤니티" 
      showPageHeader={true}
      parentPage="/"
      parentTitle="홈"
    >
      <section className="board-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2>커뮤니티 게시판</h2>
            <p className="text-muted">대경하드웨어와 소통하는 공간입니다.</p>
          </div>
          
          <Row>
            {boardCategories.map((category) => (
              <Col md={6} lg={3} className="mb-4" key={category.id}>
                <Link href={`/board/${category.id}`} style={{ textDecoration: 'none' }}>
                  <Card className="board-card h-100 text-center">
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <div 
                        className="board-icon mb-3" 
                        style={{ color: category.color }}
                      >
                        <i className={category.icon}></i>
                      </div>
                      <h4 className="mb-3">{category.title}</h4>
                      <p className="text-muted">{category.description}</p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      <style jsx>{`
        .board-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
          height: 250px;
        }
        
        .board-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .board-icon {
          font-size: 3rem;
        }
      `}</style>
    </Layout>
  )
}