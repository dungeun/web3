import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Row, Col, Card } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    todayVisitors: 0,
    totalPages: 0,
    totalProducts: 0,
    totalCategories: 0
  })

  useEffect(() => {
    // 로그인 확인
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      fetchDashboardStats()
    }
  }, [router])

  const fetchDashboardStats = async () => {
    try {
      // 실제 통계 데이터를 가져오는 API 호출
      // 현재는 더미 데이터로 설정
      setStats({
        todayVisitors: 24,
        totalPages: 7,
        totalProducts: 156,
        totalCategories: 6
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <AdminLayout title="대시보드">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <h2>
            <i className="fas fa-tachometer-alt me-3"></i>
            대시보드
          </h2>
          <p className="text-muted mb-0">시스템 현황을 한눈에 확인하세요</p>
        </div>

        <div className="content-body">
          {/* 통계 카드들 */}
          <Row className="mb-4">
            <Col lg={3} md={6} className="mb-4">
              <Card className="stats-card">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-primary">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="stats-number text-primary">{stats.todayVisitors}</h3>
                  <p className="stats-label">오늘 방문자</p>
                  <small className="text-muted">
                    <i className="fas fa-arrow-up text-success me-1"></i>
                    전일 대비 +12%
                  </small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="stats-card">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-success">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h3 className="stats-number text-success">{stats.totalPages}</h3>
                  <p className="stats-label">관리 페이지</p>
                  <small className="text-muted">
                    <i className="fas fa-check-circle text-success me-1"></i>
                    모두 정상 운영
                  </small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="stats-card">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-info">
                    <i className="fas fa-box"></i>
                  </div>
                  <h3 className="stats-number text-info">{stats.totalProducts}</h3>
                  <p className="stats-label">등록 상품</p>
                  <small className="text-muted">
                    <i className="fas fa-plus text-info me-1"></i>
                    최근 5개 추가
                  </small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="stats-card">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-warning">
                    <i className="fas fa-tags"></i>
                  </div>
                  <h3 className="stats-number text-warning">{stats.totalCategories}</h3>
                  <p className="stats-label">상품 카테고리</p>
                  <small className="text-muted">
                    <i className="fas fa-layer-group text-warning me-1"></i>
                    A-S 카테고리
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* 빠른 작업 및 최근 활동 */}
          <Row>
            <Col lg={8} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-clock me-2"></i>
                    최근 활동
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon bg-primary">
                        <i className="fas fa-edit"></i>
                      </div>
                      <div className="activity-content">
                        <h6>홈페이지 컨텐츠 수정</h6>
                        <p className="text-muted small mb-0">메인 섹션의 내용이 업데이트되었습니다.</p>
                        <small className="text-muted">2시간 전</small>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon bg-success">
                        <i className="fas fa-plus"></i>
                      </div>
                      <div className="activity-content">
                        <h6>새 상품 카테고리 추가</h6>
                        <p className="text-muted small mb-0">Marine part 카테고리가 추가되었습니다.</p>
                        <small className="text-muted">1일 전</small>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon bg-info">
                        <i className="fas fa-upload"></i>
                      </div>
                      <div className="activity-content">
                        <h6>제품 이미지 업로드</h6>
                        <p className="text-muted small mb-0">Hinge 카테고리에 새로운 제품 이미지가 업로드되었습니다.</p>
                        <small className="text-muted">3일 전</small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-bolt me-2"></i>
                    빠른 작업
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Link href="/admin/pages/home" className="btn btn-primary">
                      <i className="fas fa-home me-2"></i>홈페이지 편집
                    </Link>
                    <Link href="/admin/products/add" className="btn btn-success">
                      <i className="fas fa-plus me-2"></i>상품 추가
                    </Link>
                    <Link href="/admin/products/categories" className="btn btn-info">
                      <i className="fas fa-tags me-2"></i>카테고리 관리
                    </Link>
                    <Link href="/admin/menu" className="btn btn-warning">
                      <i className="fas fa-bars me-2"></i>메뉴 설정
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    시스템 정보
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="system-info">
                    <div className="info-item">
                      <span className="label">플랫폼</span>
                      <span className="value">Next.js + Prisma</span>
                    </div>
                    <div className="info-item">
                      <span className="label">데이터베이스</span>
                      <span className="value">SQLite</span>
                    </div>
                    <div className="info-item">
                      <span className="label">버전</span>
                      <span className="value">1.0.0</span>
                    </div>
                    <div className="info-item">
                      <span className="label">상태</span>
                      <span className="value">
                        <i className="fas fa-circle text-success me-1"></i>
                        정상 운영
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

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
          margin: 0 auto 1rem;
          color: white;
          font-size: 1.5rem;
        }

        .stats-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stats-label {
          font-weight: 600;
          color: #6c757d;
          margin-bottom: 0.5rem;
        }

        .activity-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .activity-content h6 {
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .system-info .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .system-info .info-item:last-child {
          border-bottom: none;
        }

        .system-info .label {
          font-weight: 600;
          color: #6c757d;
        }

        .system-info .value {
          color: #2c3e50;
          font-weight: 500;
        }
      `}</style>
    </AdminLayout>
  )
}