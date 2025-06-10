import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/test-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('isAdmin', 'true')
        localStorage.setItem('adminToken', data.token)
        router.push('/admin')
      } else {
        setError(data.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 임시 로그인 함수
  const handleDemoLogin = () => {
    setEmail('admin@daekyung.com')
    setPassword('admin123')
  }

  return (
    <>
      <Head>
        <title>관리자 로그인 - 대경하드웨어</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="login-page">
        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <div className="login-logo">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h2 className="login-title">관리자 로그인</h2>
              <p className="login-subtitle">대경하드웨어 관리 시스템</p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-4" dismissible onClose={() => setError('')}>
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-transparent">
                    <i className="fas fa-envelope text-muted"></i>
                  </span>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소"
                    className="border-start-0"
                    required
                    disabled={loading}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-transparent">
                    <i className="fas fa-lock text-muted"></i>
                  </span>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    className="border-start-0"
                    required
                    disabled={loading}
                  />
                </div>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  label="로그인 상태 유지"
                  className="custom-checkbox"
                />
                <Link href="/" className="text-primary text-decoration-none">
                  홈으로
                </Link>
              </div>

              <Button
                type="submit"
                className="w-100 login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    로그인 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    로그인
                  </>
                )}
              </Button>

              <div className="text-center my-3">
                <span className="text-muted">또는</span>
              </div>

              <Button
                type="button"
                variant="outline-secondary"
                className="w-100 demo-btn"
                onClick={handleDemoLogin}
                disabled={loading}
              >
                <i className="fas fa-user-shield me-2"></i>
                데모 계정으로 자동 입력
              </Button>
            </Form>

            <div className="login-footer">
              <div className="test-account">
                <i className="fas fa-info-circle me-1"></i>
                테스트 계정: admin@daekyung.com / admin123
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: backgroundMove 20s linear infinite;
        }

        @keyframes backgroundMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        .login-box {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .login-logo i {
          font-size: 36px;
          color: white;
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .login-subtitle {
          color: #7f8c8d;
          font-size: 16px;
          margin-bottom: 0;
        }

        .form-control {
          height: 48px;
          font-size: 16px;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }

        .input-group-text {
          border-radius: 10px 0 0 10px;
          border: 1px solid #e0e0e0;
          border-right: none;
        }

        .input-group .form-control {
          border-radius: 0 10px 10px 0;
        }

        .custom-checkbox .form-check-input:checked {
          background-color: #667eea;
          border-color: #667eea;
        }

        .login-btn {
          height: 48px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .demo-btn {
          height: 48px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          border: 2px solid #e0e0e0;
          background: white;
          transition: all 0.3s ease;
        }

        .demo-btn:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
        }

        .login-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .test-account {
          text-align: center;
          color: #7f8c8d;
          font-size: 14px;
          background: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
        }

        @media (max-width: 576px) {
          .login-box {
            padding: 30px 20px;
          }
          
          .login-title {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  )
}