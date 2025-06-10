import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'

interface MapSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function MapSection({ section, data, isPreview }: MapSectionProps) {
  const sectionData = data[section.id] || {}
  const { 
    title = '오시는 길',
    address = '경남 김해시 삼안로 112번길 9-14',
    latitude = 35.2304,
    longitude = 128.8894,
    zoom = 16,
    height = '400px',
    showDirections = true,
    className = ''
  } = sectionData

  // 카카오맵 URL 생성
  const kakaoMapUrl = `https://map.kakao.com/link/map/${encodeURIComponent(address)},${latitude},${longitude}`
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`

  return (
    <section className={`map-section py-5 ${className}`}>
      <Container>
        {title && (
          <h2 className="section-title text-center mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
            {title}
          </h2>
        )}
        
        <div data-aos={!isPreview ? "fade-up" : undefined} data-aos-delay={!isPreview ? "100" : undefined}>
          <div className="map-container" style={{ height }}>
            {/* 실제 구현시에는 카카오맵 또는 네이버맵 API를 사용 */}
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzQ5LjQiTiAxMjjCsDUzJzIxLjgiRQ!5e0!3m2!1sko!2skr!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {showDirections && (
            <Row className="mt-4">
              <Col md={4} className="mb-3">
                <div className="direction-card">
                  <div className="direction-icon">
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <h5>주소</h5>
                  <p>{address}</p>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="direction-card">
                  <div className="direction-icon">
                    <i className="fas fa-car"></i>
                  </div>
                  <h5>자가용</h5>
                  <p>네비게이션에 "대경하드웨어" 또는 주소 입력</p>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="direction-card">
                  <div className="direction-icon">
                    <i className="fas fa-bus"></i>
                  </div>
                  <h5>대중교통</h5>
                  <p>김해 버스 58번, 59번 이용<br />삼안동 정류장 하차</p>
                </div>
              </Col>
            </Row>
          )}

          <div className="text-center mt-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="me-3"
              href={kakaoMapUrl}
              target="_blank"
              disabled={isPreview}
            >
              <i className="fas fa-map me-2"></i>
              카카오맵으로 보기
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              href={naverMapUrl}
              target="_blank"
              disabled={isPreview}
            >
              <i className="fas fa-map-marker-alt me-2"></i>
              네이버맵으로 보기
            </Button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 30px;
          position: relative;
        }

        .section-title:after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background-color: var(--accent-color);
        }

        .map-container {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .direction-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .direction-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .direction-icon {
          width: 60px;
          height: 60px;
          background-color: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .direction-icon i {
          font-size: 1.5rem;
          color: white;
        }

        .direction-card h5 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
        }

        .direction-card p {
          font-size: 1rem;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </section>
  )
}