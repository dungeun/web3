import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer footer-simple">
      <div className="container-limit">
        <div className="footer-content">
          <div className="footer-company">
            <h3 className="footer-logo">대경하드웨어</h3>
            <div className="footer-info">
              <p className="mb-1">
                <strong>대표:</strong> 김대표 | <strong>사업자번호:</strong> 123-45-67890
              </p>
              <p className="mb-1">
                <strong>주소:</strong> 경남 김해시 삼안로 112번길 9-14
              </p>
              <p className="mb-1">
                <strong>전화:</strong> 055-333-6790~1 | <strong>팩스:</strong> 055-333-6792 | <strong>이메일:</strong> dkhw6789@naver.com
              </p>
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; {currentYear} <Link href="/admin/login" className="admin-link">대경하드웨어</Link>. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}