import React from 'react'
import Head from 'next/head'
import { Container } from 'react-bootstrap'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function AdminLayout({ children, title = '관리자 패널' }: AdminLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - 대경하드웨어 관리자</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-app">
        {children}
      </div>

      <style jsx global>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #2c3e50;
        }

        .admin-app {
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Admin Sidebar Styles */
        .admin-sidebar {
          background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
          min-height: 100vh;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          border: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          z-index: 1000;
          overflow-y: auto;
        }

        .admin-header {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .admin-header h5 {
          font-weight: 600;
          font-size: 1.2rem;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        /* Navigation Styles */
        .admin-sidebar .nav {
          padding: 1rem 0;
        }

        .admin-sidebar .nav-link {
          color: #bdc3c7 !important;
          padding: 0.75rem 1.5rem;
          border-radius: 0;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          font-weight: 500;
        }

        .admin-sidebar .nav-link:hover {
          color: #ecf0f1 !important;
          background: rgba(255,255,255,0.1);
          border-left-color: #3498db;
        }

        .admin-sidebar .nav-link.active {
          color: #ffffff !important;
          background: rgba(52, 152, 219, 0.2);
          border-left-color: #3498db;
          font-weight: 600;
        }

        .admin-sidebar .nav-link i {
          width: 20px;
          margin-right: 10px;
        }

        .menu-section-title {
          color: #95a5a6 !important;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 1rem 1.5rem 0.5rem;
          margin: 0;
        }

        .submenu .nav-link {
          padding-left: 3rem;
          font-size: 0.9rem;
          color: #a0a0a0 !important;
        }

        /* Main Content Area */
        .admin-content {
          margin-left: 280px;
          min-height: 100vh;
          background: #f8fafc;
          padding: 0;
        }

        .content-header {
          background: white;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e9ecef;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .content-header h2 {
          margin: 0;
          color: #2c3e50;
          font-weight: 600;
          font-size: 1.75rem;
        }

        .content-body {
          padding: 2rem;
        }

        /* Card Styles */
        .card {
          border: none;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }

        .card-header {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-bottom: 1px solid #e9ecef;
          padding: 1.25rem 1.5rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .card-body {
          padding: 1.5rem;
        }

        /* Button Styles */
        .btn {
          border-radius: 8px;
          font-weight: 500;
          padding: 0.5rem 1.25rem;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #2980b9 0%, #21618c 100%);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
          transform: translateY(-1px);
        }

        .btn-outline-primary {
          border: 2px solid #3498db;
          color: #3498db;
          background: transparent;
        }

        .btn-outline-primary:hover {
          background: #3498db;
          border-color: #3498db;
          color: white;
        }

        .btn-success {
          background: linear-gradient(135deg, #27ae60 0%, #219a52 100%);
          box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
        }

        .btn-danger {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
        }

        /* Table Styles */
        .table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: none;
        }

        .table thead th {
          background: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
          font-weight: 600;
          color: #495057;
          padding: 1rem;
        }

        .table tbody td {
          padding: 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #f1f3f4;
        }

        .table tbody tr:hover {
          background: #f8f9fa;
        }

        /* Form Styles */
        .form-control {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.1);
        }

        .form-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 0.5rem;
        }

        /* Alert Styles */
        .alert {
          border: none;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          font-weight: 500;
        }

        .alert-success {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          color: #155724;
        }

        .alert-danger {
          background: linear-gradient(135deg, #f8d7da 0%, #f1aeb5 100%);
          color: #721c24;
        }

        /* Badge Styles */
        .badge {
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }

        /* Logout Area */
        .logout-area {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.1);
        }

        .logout-area .btn {
          width: 100%;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          font-weight: 500;
        }

        .logout-area .btn-outline-secondary {
          border-color: rgba(255,255,255,0.3);
          color: #bdc3c7;
        }

        .logout-area .btn-outline-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.5);
          color: #ecf0f1;
        }

        .logout-area .btn-outline-danger {
          border-color: rgba(231, 76, 60, 0.6);
          color: #e74c3c;
        }

        .logout-area .btn-outline-danger:hover {
          background: #e74c3c;
          border-color: #e74c3c;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .admin-sidebar.show {
            transform: translateX(0);
          }

          .admin-content {
            margin-left: 0;
          }
        }

        /* Loading and Animation */
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Smooth Transitions */
        * {
          transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </>
  )
}