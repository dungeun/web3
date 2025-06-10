import React, { useState, useEffect } from 'react'
import { Card, Form, Row, Col, Table } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface VisitorStat {
  date: string
  visitors: number
  pageviews: number
  uniqueVisitors: number
}

export default function AdminVisitorStats() {
  const [stats, setStats] = useState<VisitorStat[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('7days')
  const [totalStats, setTotalStats] = useState({
    totalVisitors: 0,
    totalPageviews: 0,
    avgVisitorsPerDay: 0,
    avgPageviewsPerDay: 0
  })

  useEffect(() => {
    fetchStats()
  }, [period])

  const fetchStats = async () => {
    try {
      // 더미 데이터 생성
      const dummyStats: VisitorStat[] = []
      const today = new Date()
      const days = period === '7days' ? 7 : period === '30days' ? 30 : 90

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        dummyStats.push({
          date: date.toISOString().split('T')[0],
          visitors: Math.floor(Math.random() * 50) + 10,
          pageviews: Math.floor(Math.random() * 200) + 50,
          uniqueVisitors: Math.floor(Math.random() * 40) + 8
        })
      }

      setStats(dummyStats)

      // 총계 계산
      const totalVisitors = dummyStats.reduce((sum, stat) => sum + stat.visitors, 0)
      const totalPageviews = dummyStats.reduce((sum, stat) => sum + stat.pageviews, 0)
      
      setTotalStats({
        totalVisitors,
        totalPageviews,
        avgVisitorsPerDay: Math.round(totalVisitors / days),
        avgPageviewsPerDay: Math.round(totalPageviews / days)
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    })
  }

  return (
    <AdminLayout title="방문자 통계">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-chart-line me-3"></i>
                방문자 통계
              </h2>
              <p className="text-muted mb-0">웹사이트 방문자 현황을 확인하세요</p>
            </div>
            <Form.Select 
              value={period} 
              onChange={(e) => setPeriod(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="7days">최근 7일</option>
              <option value="30days">최근 30일</option>
              <option value="90days">최근 90일</option>
            </Form.Select>
          </div>
        </div>

        <div className="content-body">
          {/* 요약 통계 */}
          <Row className="mb-4">
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-primary mb-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="stats-number text-primary">{totalStats.totalVisitors.toLocaleString()}</h3>
                  <p className="stats-label">총 방문자</p>
                  <small className="text-muted">
                    일평균 {totalStats.avgVisitorsPerDay}명
                  </small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-success mb-3">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3 className="stats-number text-success">{totalStats.totalPageviews.toLocaleString()}</h3>
                  <p className="stats-label">총 페이지뷰</p>
                  <small className="text-muted">
                    일평균 {totalStats.avgPageviewsPerDay}회
                  </small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-info mb-3">
                    <i className="fas fa-mouse-pointer"></i>
                  </div>
                  <h3 className="stats-number text-info">
                    {totalStats.totalPageviews > 0 ? 
                      (totalStats.totalPageviews / totalStats.totalVisitors).toFixed(1) : '0'
                    }
                  </h3>
                  <p className="stats-label">페이지/세션</p>
                  <small className="text-muted">
                    방문당 평균 페이지뷰
                  </small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-3">
              <Card className="stats-card h-100">
                <Card.Body className="text-center">
                  <div className="stats-icon bg-warning mb-3">
                    <i className="fas fa-calendar-day"></i>
                  </div>
                  <h3 className="stats-number text-warning">
                    {stats.length > 0 ? stats[stats.length - 1].visitors : 0}
                  </h3>
                  <p className="stats-label">오늘 방문자</p>
                  <small className="text-muted">
                    {stats.length > 1 && stats[stats.length - 1].visitors > stats[stats.length - 2].visitors ? (
                      <span className="text-success">
                        <i className="fas fa-arrow-up me-1"></i>
                        증가
                      </span>
                    ) : (
                      <span className="text-danger">
                        <i className="fas fa-arrow-down me-1"></i>
                        감소
                      </span>
                    )}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* 상세 통계 테이블 */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-table me-2"></i>
                일별 상세 통계
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
                      <th>날짜</th>
                      <th className="text-center">방문자</th>
                      <th className="text-center">페이지뷰</th>
                      <th className="text-center">순 방문자</th>
                      <th className="text-center">페이지/세션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((stat, index) => (
                      <tr key={stat.date}>
                        <td>
                          <strong>{formatDate(stat.date)}</strong>
                          <br />
                          <small className="text-muted">{stat.date}</small>
                        </td>
                        <td className="text-center">
                          <strong>{stat.visitors.toLocaleString()}</strong>
                          {index > 0 && (
                            <div>
                              {stat.visitors > stats[index - 1].visitors ? (
                                <small className="text-success">
                                  <i className="fas fa-arrow-up me-1"></i>
                                  +{(stat.visitors - stats[index - 1].visitors)}
                                </small>
                              ) : stat.visitors < stats[index - 1].visitors ? (
                                <small className="text-danger">
                                  <i className="fas fa-arrow-down me-1"></i>
                                  {(stat.visitors - stats[index - 1].visitors)}
                                </small>
                              ) : (
                                <small className="text-muted">-</small>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="text-center">
                          <strong>{stat.pageviews.toLocaleString()}</strong>
                        </td>
                        <td className="text-center">
                          <strong>{stat.uniqueVisitors.toLocaleString()}</strong>
                        </td>
                        <td className="text-center">
                          <strong>{(stat.pageviews / stat.visitors).toFixed(1)}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
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
          margin-bottom: 0.5rem;
        }
      `}</style>
    </AdminLayout>
  )
}