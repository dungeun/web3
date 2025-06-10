import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Layout } from '@/components/Layout'
import HeroSlider from '@/components/HeroSlider'

const categories = [
  {
    key: 'A',
    title: 'Handlelocker & Fasterner',
    description: '다양한 용도에 맞는 핸들록커와 패스너 제품으로, 스테인리스 소재와 다양한 사이즈로 제공됩니다.',
    image: '/images/main/main-1.jpg'
  },
  {
    key: 'B',
    title: 'Hinge',
    description: '고품질 힌지 제품으로 내구성과 안정성을 갖추었으며, 버터플라이, 스탬핑, 웨딩 힌지 등 다양한 타입을 제공합니다.',
    image: '/images/main/main-2.jpg'
  },
  {
    key: 'C',
    title: 'Clip & Latch',
    description: '안정적인 클립과 래치 제품으로 다양한 사이즈와 타입을 제공하며, 고강도 소재로 제작되었습니다.',
    image: '/images/main/main-3.jpg'
  },
  {
    key: 'G',
    title: 'Rubber & Seals',
    description: '다양한 용도에 맞는 고무 및 실 제품으로, 수분과 외부 입자를 차단하여 제품을 보호합니다.',
    image: '/images/main/main-4.jpg'
  },
  {
    key: 'H',
    title: 'Handle & Grip',
    description: '다양한 용도에 맞는 핸들과 그립 제품으로, 인체공학적 디자인과 다양한 사이즈로 제공됩니다.',
    image: '/images/main/main-5.jpg'
  },
  {
    key: 'S',
    title: 'Stay & Sliderail',
    description: '스테이와 슬라이드레일 제품으로 문과 창, 서랍의 안정적인 운영을 보장하며, 다양한 하중을 지지합니다.',
    image: '/images/main/main-5.jpg'
  }
]

export default function Home() {
  return (
    <Layout title="홈">
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* About Section */}
      <section className="about-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <div className="about-content">
                <h2 className="section-title">대경하드웨어 소개</h2>
                <p>
                  대경하드웨어는 1990년 설립 이래 30년 이상의 역사를 가진 하드웨어 소재 전문기업으로, 
                  다양한 산업 분야에 고품질의 하드웨어 소재를 공급하고 있습니다.
                </p>
                <p>
                  우리 회사는 지속적인 연구개발과 품질 향상을 통해 국내외 시장에서 인정받는 기업으로 성장했으며,
                  다양한 인증과 특허를 보유하고 있습니다.
                </p>
                <p>
                  고객 맞춤형 솔루션과 빠른 납기, 안정적인 품질로 고객의 신뢰를 얻고 있으며,
                  앞으로도 지속적인 혁신과 발전을 통해 글로벌 하드웨어 소재 기업으로 도약하겠습니다.
                </p>
              </div>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
              <Image 
                src="/images/background/3.jpg" 
                alt="하드웨어 이미지" 
                width={600}
                height={400}
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <Container>
          <h2 className="section-title text-center" data-aos="fade-up">제품 카테고리</h2>
          <p className="text-center mb-5" data-aos="fade-up" data-aos-delay="100">
            대경하드웨어는 다양한 산업 분야에 적용 가능한 고품질 하드웨어 소재를 제공합니다.
          </p>
          
          <Row>
            {categories.map((category, index) => (
              <Col md={4} className="mb-4" key={category.key} data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
                <Card className="product-card h-100">
                  <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                    <Image 
                      src={category.image}
                      alt={`${category.key} | ${category.title}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{category.key} | {category.title}</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                    <Link href={`/products?category=${category.key}`} passHref legacyBehavior>
                      <Button variant="primary">자세히 보기</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container data-aos="fade-up">
          <h2>하드웨어 소재에 관한 문의가 있으신가요?</h2>
          <p className="mb-4">대경하드웨어의 전문가들이 고객님에게 최적화된 하드웨어 소재를 제안해 드립니다.</p>
          <Link href="/inquiry" passHref legacyBehavior>
            <Button variant="outline-light" size="lg">
              견적 문의하기
            </Button>
          </Link>
        </Container>
      </section>
    </Layout>
  )
}