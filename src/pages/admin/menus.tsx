import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, Badge, Form, Modal } from 'react-bootstrap'
import AdminLayout from '@/components/Admin/AdminLayout'
import AdminSidebar from '@/components/Admin/AdminSidebar'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Menu {
  id: number
  title: string
  path: string
  parentId: number | null
  orderIndex: number
  isActive: boolean
  target: string
  type: string
  children?: Menu[]
}

interface SortableMenuItemProps {
  menu: Menu
  level?: number
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function SortableMenuItem({ menu, level = 0, onToggle, onDelete }: SortableMenuItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: menu.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`menu-item ${isDragging ? 'dragging' : ''}`}
      >
        <div className="menu-item-content" style={{ paddingLeft: `${20 + level * 30}px` }}>
          <div className="menu-drag-handle" {...attributes} {...listeners}>
            <i className="fas fa-grip-vertical"></i>
          </div>
          <div className="menu-info">
            {level > 0 && <span className="text-muted me-2">└</span>}
            <span className="menu-title">{menu.title}</span>
            <span className="menu-path text-muted ms-2">({menu.path})</span>
          </div>
          <div className="menu-actions">
            <Form.Check
              type="switch"
              id={`menu-toggle-${menu.id}`}
              checked={menu.isActive}
              onChange={() => onToggle(menu.id)}
              className="me-3"
            />
            {menu.isActive ? (
              <Badge bg="success" className="me-3">활성</Badge>
            ) : (
              <Badge bg="secondary" className="me-3">비활성</Badge>
            )}
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => window.location.href = `/admin/menus/edit/${menu.id}`}
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(menu.id)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </div>
        </div>
      </div>
      {menu.children && menu.children.map((child) => (
        <SortableMenuItem 
          key={child.id} 
          menu={child} 
          level={level + 1}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  )
}

export default function AdminMenus() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/admin/menus')
      const data = await res.json()
      
      if (res.ok) {
        // 부모-자식 관계를 구성
        const menuMap = new Map<number, Menu>()
        data.forEach((menu: Menu) => {
          menuMap.set(menu.id, { ...menu, children: [] })
        })
        
        const rootMenus: Menu[] = []
        menuMap.forEach(menu => {
          if (menu.parentId) {
            const parent = menuMap.get(menu.parentId)
            if (parent) {
              parent.children = parent.children || []
              parent.children.push(menu)
            }
          } else {
            rootMenus.push(menu)
          }
        })
        
        // orderIndex로 정렬
        const sortMenus = (menus: Menu[]) => {
          menus.sort((a, b) => a.orderIndex - b.orderIndex)
          menus.forEach(menu => {
            if (menu.children && menu.children.length > 0) {
              sortMenus(menu.children)
            }
          })
        }
        
        sortMenus(rootMenus)
        setMenus(rootMenus)
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error)
      setError('메뉴를 불러올 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setMenus((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over?.id)
        
        const newItems = arrayMove(items, oldIndex, newIndex)
        
        // orderIndex 업데이트
        newItems.forEach((item, index) => {
          item.orderIndex = index + 1
        })
        
        return newItems
      })
    }
  }

  const handleToggle = async (menuId: number) => {
    try {
      const menu = findMenuById(menuId, menus)
      if (!menu) return

      const res = await fetch(`/api/admin/menus/${menuId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !menu.isActive })
      })

      if (res.ok) {
        updateMenuInTree(menuId, { isActive: !menu.isActive })
      }
    } catch (error) {
      console.error('Failed to toggle menu:', error)
      setError('메뉴 상태 변경 중 오류가 발생했습니다.')
    }
  }

  const handleDelete = (menuId: number) => {
    const menu = findMenuById(menuId, menus)
    if (menu) {
      setMenuToDelete(menu)
      setShowDeleteModal(true)
    }
  }

  const confirmDelete = async () => {
    if (!menuToDelete) return

    try {
      const res = await fetch(`/api/admin/menus/${menuToDelete.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchMenus()
        setMessage('메뉴가 삭제되었습니다.')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to delete menu')
      }
    } catch (error) {
      console.error('Failed to delete menu:', error)
      setError('메뉴 삭제 중 오류가 발생했습니다.')
    } finally {
      setShowDeleteModal(false)
      setMenuToDelete(null)
    }
  }

  const findMenuById = (id: number, menuList: Menu[]): Menu | null => {
    for (const menu of menuList) {
      if (menu.id === id) return menu
      if (menu.children) {
        const found = findMenuById(id, menu.children)
        if (found) return found
      }
    }
    return null
  }

  const updateMenuInTree = (id: number, updates: Partial<Menu>) => {
    setMenus(prevMenus => {
      const updateMenu = (menuList: Menu[]): Menu[] => {
        return menuList.map(menu => {
          if (menu.id === id) {
            return { ...menu, ...updates }
          }
          if (menu.children) {
            return { ...menu, children: updateMenu(menu.children) }
          }
          return menu
        })
      }
      return updateMenu(prevMenus)
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')

    try {
      // 모든 메뉴의 orderIndex 업데이트
      const updates = menus.map((menu, index) => ({
        id: menu.id,
        orderIndex: index + 1
      }))

      const res = await fetch('/api/admin/menus/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      })

      if (res.ok) {
        setMessage('메뉴 순서가 저장되었습니다.')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to save menu order')
      }
    } catch (error) {
      console.error('Failed to save menu order:', error)
      setError('메뉴 순서 저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="메뉴 관리">
        <AdminSidebar />
        <div className="admin-content">
          <div className="content-body">
            <div className="text-center py-5">
              <div className="loading-spinner me-2"></div>
              로딩 중...
            </div>
          </div>
        </div>
      </AdminLayout>
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
              <p className="text-muted mb-0">드래그하여 메뉴 순서를 변경하세요</p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="success"
                onClick={() => window.location.href = '/admin/menus/add'}
              >
                <i className="fas fa-plus me-2"></i>
                메뉴 추가
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="loading-spinner me-2"></span>
                    저장 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    순서 저장
                  </>
                )}
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

          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                메뉴 목록
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={menus.map(m => m.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="menu-list">
                    {menus.map((menu) => (
                      <SortableMenuItem 
                        key={menu.id} 
                        menu={menu} 
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>메뉴 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 <strong>{menuToDelete?.title}</strong> 메뉴를 삭제하시겠습니까?</p>
          {menuToDelete?.children && menuToDelete.children.length > 0 && (
            <Alert variant="warning">
              <i className="fas fa-exclamation-triangle me-2"></i>
              이 메뉴에는 하위 메뉴가 있습니다. 하위 메뉴도 함께 삭제됩니다.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx global>{`
        .menu-list {
          padding: 0;
          width: 100%;
        }
        
        .menu-item {
          background: white;
          border-bottom: 1px solid #eee;
          transition: all 0.2s;
          width: 100%;
        }
        
        .menu-item:hover {
          background-color: #f8f9fa;
        }
        
        .menu-item.dragging {
          background-color: #e3f2fd;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .menu-item-content {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          gap: 15px;
          width: 100%;
        }
        
        .menu-drag-handle {
          cursor: grab;
          color: #999;
          padding: 5px;
          flex-shrink: 0;
        }
        
        .menu-drag-handle:active {
          cursor: grabbing;
        }
        
        .menu-info {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }
        
        .menu-title {
          font-weight: 500;
          color: #333;
          margin-right: 10px;
        }
        
        .menu-path {
          font-size: 0.875rem;
        }
        
        .menu-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        
        .menu-actions .form-check {
          margin-bottom: 0 !important;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  )
}