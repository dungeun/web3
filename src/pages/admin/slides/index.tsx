import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Table, Badge, Form } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface HeroSlide {
  id: number
  title: string
  subtitle: string | null
  buttonText: string | null
  buttonUrl: string | null
  mediaType: 'IMAGE' | 'VIDEO'
  mediaUrl: string
  overlay: number
  orderIndex: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminSlides() {
  const router = useRouter()
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/admin/slides')
      const data = await res.json()
      
      if (res.ok) {
        setSlides(data)
      } else {
        console.error('API Error:', data.error)
        setSlides([])
      }
    } catch (error) {
      console.error('Failed to fetch slides:', error)
      setSlides([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/admin/slides/${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        fetchSlides()
      } else {
        const data = await res.json()
        alert(data.error || '삭제 중 오류가 발생했습니다')
      }
    } catch (error) {
      console.error('Failed to delete slide:', error)
      alert('삭제 중 오류가 발생했습니다')
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const slide = slides.find(s => s.id === id)
      if (!slide) return

      const res = await fetch(`/api/admin/slides/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...slide,
          isActive: !currentStatus
        })
      })
      
      if (res.ok) {
        fetchSlides()
      }
    } catch (error) {
      console.error('Failed to toggle slide status:', error)
    }
  }

  const moveSlide = async (id: number, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(s => s.id === id)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= slides.length) return

    // 순서 변경
    const newSlides = [...slides]
    const [removed] = newSlides.splice(currentIndex, 1)
    newSlides.splice(newIndex, 0, removed)

    // orderIndex 업데이트
    const updates = newSlides.map((slide, index) => ({
      id: slide.id,
      orderIndex: index
    }))

    try {
      // 각 슬라이드의 orderIndex 업데이트
      for (const update of updates) {
        const slide = slides.find(s => s.id === update.id)
        if (slide) {
          await fetch(`/api/admin/slides/${update.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...slide,
              orderIndex: update.orderIndex
            })
          })
        }
      }
      
      fetchSlides()
    } catch (error) {
      console.error('Failed to reorder slides:', error)
    }
  }

  return (
    <AdminLayout title="슬라이드 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-images me-3"></i>
                히어로 슬라이드 관리
              </h2>
              <p className="text-muted mb-0">메인 페이지 슬라이드를 관리하세요</p>
            </div>
            <Link href="/admin/slides/add" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>슬라이드 추가
            </Link>
          </div>
        </div>

        <div className="content-body">
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">로딩 중...</div>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>총 {slides.length}개의 슬라이드</span>
                  </div>
                  
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>순서</th>
                        <th style={{ width: '100px' }}>미리보기</th>
                        <th>제목</th>
                        <th>부제목</th>
                        <th className="text-center">타입</th>
                        <th className="text-center">버튼</th>
                        <th className="text-center">상태</th>
                        <th className="text-center" style={{ width: '180px' }}>작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slides.map((slide, index) => (
                        <tr key={slide.id}>
                          <td>
                            <div className="d-flex flex-column">
                              <Button
                                variant="link"
                                size="sm"
                                disabled={index === 0}
                                onClick={() => moveSlide(slide.id, 'up')}
                                className="p-0"
                              >
                                <i className="fas fa-chevron-up"></i>
                              </Button>
                              <span className="text-center">{index + 1}</span>
                              <Button
                                variant="link"
                                size="sm"
                                disabled={index === slides.length - 1}
                                onClick={() => moveSlide(slide.id, 'down')}
                                className="p-0"
                              >
                                <i className="fas fa-chevron-down"></i>
                              </Button>
                            </div>
                          </td>
                          <td>
                            {slide.mediaType === 'IMAGE' ? (
                              <img 
                                src={slide.mediaUrl} 
                                alt={slide.title}
                                style={{ width: '80px', height: '45px', objectFit: 'cover' }}
                                className="rounded"
                              />
                            ) : (
                              <div 
                                style={{ 
                                  width: '80px', 
                                  height: '45px', 
                                  backgroundColor: '#000',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                className="rounded"
                              >
                                <i className="fas fa-video text-white"></i>
                              </div>
                            )}
                          </td>
                          <td>
                            <strong>{slide.title}</strong>
                          </td>
                          <td>
                            {slide.subtitle || <span className="text-muted">-</span>}
                          </td>
                          <td className="text-center">
                            <Badge bg={slide.mediaType === 'IMAGE' ? 'info' : 'warning'}>
                              {slide.mediaType === 'IMAGE' ? '이미지' : '비디오'}
                            </Badge>
                          </td>
                          <td className="text-center">
                            {slide.buttonText ? (
                              <Badge bg="primary">{slide.buttonText}</Badge>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td className="text-center">
                            <Form.Check
                              type="switch"
                              checked={slide.isActive}
                              onChange={() => handleToggleActive(slide.id, slide.isActive)}
                              className="d-inline-block"
                            />
                          </td>
                          <td className="text-center">
                            <Link href={`/admin/slides/edit/${slide.id}`} passHref legacyBehavior>
                              <Button variant="outline-primary" size="sm" className="me-1">
                                <i className="fas fa-edit"></i> 수정
                              </Button>
                            </Link>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(slide.id)}
                            >
                              <i className="fas fa-trash"></i> 삭제
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {slides.length === 0 && (
                    <div className="text-center py-5">
                      <i className="fas fa-images fa-3x text-muted mb-3"></i>
                      <p className="text-muted">등록된 슬라이드가 없습니다</p>
                      <Link href="/admin/slides/add" className="btn btn-primary">
                        <i className="fas fa-plus me-2"></i>첫 슬라이드 추가하기
                      </Link>
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