import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, Button, Table, Badge, Form, Alert } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'

interface Menu {
  id: number
  title: string
  path: string
  type: string
  target: string
  parentId: number | null
  orderIndex: number
  isActive: boolean
  children?: Menu[]
}

export default function AdminMenuList() {
  const router = useRouter()
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/admin/menus')
      const data = await res.json()
      setMenus(data)
    } catch (error) {
      console.error('Failed to fetch menus:', error)
      setError('메뉴 목록을 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" 메뉴를 정말 삭제하시겠습니까?`)) return

    try {
      const res = await fetch(`/api/admin/menus/${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        setMessage('메뉴가 성공적으로 삭제되었습니다.')
        fetchMenus()
        setTimeout(() => setMessage(''), 3000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || '메뉴 삭제 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to delete menu:', error)
      setError('서버 오류가 발생했습니다.')
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await fetch(`/api/admin/menus/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })
      fetchMenus()
    } catch (error) {
      console.error('Failed to update menu:', error)
    }
  }

  const renderMenuRow = (menu: Menu, level = 0) => {
    const indent = level * 20
    
    return (
      <React.Fragment key={menu.id}>
        <tr>
          <td style={{ paddingLeft: `${20 + indent}px` }}>
            {level > 0 && (
              <i className="fas fa-level-up-alt fa-rotate-90 text-muted me-2"></i>
            )}
            {menu.title}
          </td>
          <td>
            <code>{menu.path}</code>
          </td>
          <td className="text-center">
            <Badge bg={menu.type === 'internal' ? 'primary' : 'info'}>
              {menu.type === 'internal' ? '내부' : '외부'}
            </Badge>
          </td>
          <td className="text-center">
            <Form.Check
              type="switch"
              checked={menu.isActive}
              onChange={() => handleToggleActive(menu.id, menu.isActive)}
            />
          </td>
          <td className="text-center">
            <Button
              variant="outline-primary"
              size="sm"
              className="me-1"
              onClick={() => router.push(`/admin/menu/edit/${menu.id}`)}
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(menu.id, menu.title)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
        {menu.children?.map(child => renderMenuRow(child, level + 1))}
      </React.Fragment>
    )
  }

  return (
    <AdminLayout title="메뉴 관리">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-bars me-3"></i>
                메뉴 관리
              </h2>
              <p className="text-muted mb-0">사이트의 네비게이션 메뉴를 관리하세요</p>
            </div>
            <Link href="/admin/menu/add" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>메뉴 추가
            </Link>
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

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                메뉴 목록 ({menus.length}개)
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
                      <th>메뉴명</th>
                      <th>경로</th>
                      <th className="text-center">타입</th>
                      <th className="text-center">활성화</th>
                      <th className="text-center" style={{ width: '120px' }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-muted">
                          등록된 메뉴가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      menus.filter(m => !m.parentId).map(menu => renderMenuRow(menu))
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