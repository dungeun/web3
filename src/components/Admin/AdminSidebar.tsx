import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const adminMenus = [
  {
    id: 'dashboard',
    title: '대시보드',
    icon: 'fas fa-tachometer-alt',
    path: '/admin',
    items: []
  },
  {
    id: 'content',
    title: '콘텐츠 관리',
    icon: 'fas fa-edit',
    items: [
      { id: 'slide-list', title: '슬라이드 설정', path: '/admin/slides' },
      { id: 'menu-list', title: '메뉴 관리', path: '/admin/menus' },
      { id: 'page-list', title: '페이지 관리', path: '/admin/pages' },
    ]
  },
  {
    id: 'products',
    title: '상품 관리',
    icon: 'fas fa-box',
    items: [
      { id: 'category', title: '카테고리 관리', path: '/admin/products/categories' },
      { id: 'product-list', title: '상품 목록', path: '/admin/products' },
      { id: 'product-add', title: '상품 추가', path: '/admin/products/add' },
    ]
  },
  {
    id: 'community',
    title: '커뮤니티',
    icon: 'fas fa-users',
    items: [
      { id: 'notice', title: '공지사항', path: '/admin/board/notice' },
      { id: 'qna', title: 'Q&A', path: '/admin/board/qna' },
      { id: 'board-manage', title: '게시판 설정', path: '/admin/board/manage' },
    ]
  },
  {
    id: 'analytics',
    title: '분석 & 설정',
    icon: 'fas fa-chart-line',
    items: [
      { id: 'visitors', title: '방문자 통계', path: '/admin/statistics/visitors' },
      { id: 'site', title: '사이트 설정', path: '/admin/settings/site' },
    ]
  }
]

export default function AdminSidebar() {
  const router = useRouter()
  
  const isActive = (path: string) => {
    return router.pathname === path
  }

  const isMenuActive = (menu: any) => {
    if (menu.path && router.pathname === menu.path) return true
    if (menu.items) {
      return menu.items.some((item: any) => router.pathname === item.path)
    }
    return false
  }

  return (
    <div className="admin-sidebar">
      <div className="admin-header">
        <h5>관리자 패널</h5>
        <p className="mb-0 small opacity-75">대경하드웨어</p>
      </div>
      
      <nav className="nav flex-column">
        {adminMenus.map((menu) => (
          <div key={menu.id} className={`menu-group ${isMenuActive(menu) ? 'active' : ''}`}>
            {menu.path ? (
              <Link href={menu.path} className={`nav-link ${isActive(menu.path) ? 'active' : ''}`}>
                <i className={menu.icon}></i>
                <span>{menu.title}</span>
              </Link>
            ) : (
              <div className="menu-section-title">
                <i className={menu.icon}></i>
                <span>{menu.title}</span>
              </div>
            )}
            
            {menu.items.length > 0 && (
              <div className="submenu">
                {menu.items.map((item) => (
                  <Link 
                    key={item.id} 
                    href={item.path} 
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="logout-area">
        <Link href="/" className="btn btn-outline-secondary">
          <i className="fas fa-home me-2"></i>홈페이지 보기
        </Link>
        <button 
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.removeItem('isAdmin')
            router.push('/admin/login')
          }}
        >
          <i className="fas fa-sign-out-alt me-2"></i>로그아웃
        </button>
      </div>
    </div>
  )
}