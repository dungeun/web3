import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'

interface MenuItem {
  id: number
  title: string
  path: string
  type: string
  target: string
  children?: MenuItem[]
}

export default function Header() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  const isActive = (path: string) => router.pathname === path

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const response = await fetch('/api/menus')
      if (response.ok) {
        const data = await response.json()
        setMenus(data)
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error)
      // 기본 메뉴 구조로 fallback
      setMenus(getDefaultMenus())
    } finally {
      setLoading(false)
    }
  }

  const getDefaultMenus = (): MenuItem[] => [
    {
      id: 1,
      title: '회사소개',
      path: '/company',
      type: 'dropdown',
      target: '_self',
      children: [
        { id: 11, title: '회사개요/인사말', path: '/company', type: 'internal', target: '_self' },
        { id: 12, title: '사업장 소개/오시는 길', path: '/location', type: 'internal', target: '_self' }
      ]
    },
    {
      id: 2,
      title: '제품소개',
      path: '/products',
      type: 'dropdown',
      target: '_self',
      children: [
        { id: 21, title: 'A | Handlelocker & Fasterner', path: '/products?category=A', type: 'internal', target: '_self' },
        { id: 22, title: 'B | Hinge', path: '/products?category=B', type: 'internal', target: '_self' },
        { id: 23, title: 'C | Clip & Latch', path: '/products?category=C', type: 'internal', target: '_self' },
        { id: 24, title: 'G | Rubber & Seals', path: '/products?category=G', type: 'internal', target: '_self' },
        { id: 25, title: 'H | Handle & Grip', path: '/products?category=H', type: 'internal', target: '_self' },
        { id: 26, title: 'S | Stay & Sliderail', path: '/products?category=S', type: 'internal', target: '_self' }
      ]
    },
    {
      id: 3,
      title: '인증정보',
      path: '/certification',
      type: 'dropdown',
      target: '_self',
      children: [
        { id: 31, title: '인증 및 특허', path: '/certification', type: 'internal', target: '_self' }
      ]
    },
    {
      id: 4,
      title: '견적문의',
      path: '/inquiry',
      type: 'internal',
      target: '_self'
    },
    {
      id: 5,
      title: '커뮤니티',
      path: '/board',
      type: 'dropdown',
      target: '_self',
      children: [
        { id: 51, title: '공지사항', path: '/board/notice', type: 'internal', target: '_self' },
        { id: 52, title: '뉴스 & 소식', path: '/board/news', type: 'internal', target: '_self' },
        { id: 53, title: 'Q&A', path: '/board/qna', type: 'internal', target: '_self' },
        { id: 54, title: '고객 후기', path: '/board/review', type: 'internal', target: '_self' }
      ]
    },
    {
      id: 6,
      title: '갤러리',
      path: '/gallery',
      type: 'dropdown',
      target: '_self',
      children: [
        { id: 61, title: '제품 갤러리', path: '/gallery/product', type: 'internal', target: '_self' },
        { id: 62, title: '포트폴리오', path: '/gallery/portfolio', type: 'internal', target: '_self' },
        { id: 63, title: '이벤트 갤러리', path: '/gallery/event', type: 'internal', target: '_self' }
      ]
    }
  ]

  const renderMenuItem = (menu: MenuItem) => {
    if (menu.children && menu.children.length > 0) {
      return (
        <NavDropdown 
          title={menu.title} 
          id={`navbarDropdown${menu.id}`} 
          key={menu.id}
          renderMenuOnMount={true}
          menuVariant="light"
        >
          {menu.children.map((child) => (
            <Link href={child.path} passHref legacyBehavior key={child.id}>
              <NavDropdown.Item 
                as="a"
                onClick={(e) => {
                  setExpanded(false)
                }}
              >
                {child.title}
              </NavDropdown.Item>
            </Link>
          ))}
        </NavDropdown>
      )
    } else {
      return (
        <Link href={menu.path} passHref legacyBehavior key={menu.id}>
          <Nav.Link 
            as="a"
            className={isActive(menu.path) ? 'active' : ''}
            onClick={() => setExpanded(false)}
          >
            {menu.title}
          </Nav.Link>
        </Link>
      )
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar d-none d-md-block">
        <div className="container-limit">
          <div className="row">
            <div className="col-md-6">
              <span><i className="fas fa-phone-alt me-2"></i> 055-333-6790~1</span>
              <span className="ms-3"><i className="fas fa-envelope me-2"></i> dkhw6789@naver.com</span>
            </div>
            <div className="col-md-6 text-end">
              <span><i className="fas fa-map-marker-alt me-2"></i> 경남 김해시 삼안로 112번길 9-14</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar 
        bg="white" 
        expand="lg" 
        sticky="top" 
        className="navbar-light"
        expanded={expanded}
      >
        <div className="container-limit">
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand onClick={() => setExpanded(false)}>
              <Image 
                src="/images/logo.jpg" 
                alt="대경하드웨어 로고" 
                width={150}
                height={50}
                style={{ objectFit: 'contain' }}
              />
            </Navbar.Brand>
          </Link>
          
          <Navbar.Toggle 
            aria-controls="navbarNav"
            onClick={() => setExpanded(expanded => !expanded)}
          />
          
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link className={isActive('/') ? 'active' : ''} onClick={() => setExpanded(false)}>홈</Nav.Link>
              </Link>
              
              {loading ? (
                <Nav.Link disabled>
                  <span className="loading-spinner me-2"></span>
                  메뉴 로딩중...
                </Nav.Link>
              ) : (
                menus.map(renderMenuItem)
              )}
            </Nav>
            
          </Navbar.Collapse>
        </div>
      </Navbar>
      
      <style jsx>{`
        .loading-spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .navbar-nav .nav-link:hover {
          color: #007bff !important;
          transition: color 0.3s ease;
        }
        
        .navbar-nav .nav-link.active {
          color: #007bff !important;
          font-weight: 600;
        }
        
        .navbar-toggler {
          border: none;
          padding: 0.25rem 0.5rem;
        }
        
        .navbar-toggler:focus {
          box-shadow: none;
        }
        
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        
        @media (max-width: 991.98px) {
          .navbar-collapse {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #dee2e6;
          }
          
          .navbar-collapse.collapsing {
            transition: height .35s ease;
          }
          
          .navbar-nav .nav-link {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f8f9fa;
          }
          
          .navbar-nav .nav-link:last-child {
            border-bottom: none;
          }
          
          .dropdown-menu {
            position: static !important;
            float: none;
            width: auto;
            margin-top: 0;
            background-color: #f8f9fa;
            border: 0;
            box-shadow: none;
            padding-left: 1rem;
          }
          
          .dropdown-item {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .dropdown-toggle::after {
            margin-left: auto;
          }
        }
      `}</style>
    </>
  )
}