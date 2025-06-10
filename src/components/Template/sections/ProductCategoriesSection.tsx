import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'
import Link from 'next/link'

interface ProductCategoriesSectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

interface ProductCategory {
  id: number
  code: string
  name: string
  description: string | null
  orderIndex: number
  isActive: boolean
  _count?: {
    products: number
  }
}

// 카테고리별 이미지 매핑
const categoryImages: Record<string, string> = {
  'A': '/img/A-Handlelocker & Fasterner/Handle lock/MDSI-A-30.jpg',
  'B': '/img/B-Hinge/Butterfly hinge/B-910.jpg',
  'C': '/img/C-Clip & latch/Catch clip/C-026.jpg',
  'E': '/img/E-Electrical materials/E-1216.jpg',
  'G': '/img/G-Rubber & Seals/Grommet packing/G-030.jpg',
  'H': '/img/H-Handle & grip/Case handle/H-1005.jpg',
  'M': '/img/M-Marine part/B-2T, 3T.jpg',
  'P': '/img/P-Precision part/P-1400.jpg',
  'S': '/img/S-Stay & sliderail/Gas spring/S-365B-1사진수정.jpg'
}

// 카테고리 이름 매핑
const categoryNameMap: Record<string, string> = {
  'A': 'Handle Lock & Fastener',
  'B': 'Hinge',
  'C': 'Clip & Latch',
  'E': 'Electrical Materials',
  'G': 'Rubber & Seals',
  'H': 'Handle & Grip',
  'M': 'Marine Part',
  'P': 'Precision Part',
  'S': 'Stay & Slide Rail'
}

export default function ProductCategoriesSection({ section, data, isPreview }: ProductCategoriesSectionProps) {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const sectionData = data[section.id] || {}
  const { title = '제품 카테고리', className = '' } = sectionData

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/products/categories')
      if (response.ok) {
        const data = await response.json()
        // 활성화된 카테고리만 필터링하고 정렬
        const activeCategories = data
          .filter((cat: ProductCategory) => cat.isActive)
          .sort((a: ProductCategory, b: ProductCategory) => a.orderIndex - b.orderIndex)
        setCategories(activeCategories)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className={`product-categories-section py-5 ${className}`}>
        <Container>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className={`product-categories-section py-5 ${className}`}>
      <Container>
        {title && (
          <h2 className="section-title text-center mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
            {title}
          </h2>
        )}
        
        <Row className="g-4">
          {categories.map((category, index) => (
            <Col key={category.id} xs={12} md={6} lg={4}>
              <Card 
                className="category-card h-100"
                data-aos={!isPreview ? "fade-up" : undefined}
                data-aos-delay={!isPreview ? (index * 100).toString() : undefined}
              >
                <div className="card-img-wrapper">
                  <Card.Img 
                    variant="top" 
                    src={categoryImages[category.code] || '/img/1.jpg'} 
                    alt={category.name}
                    onError={(e: any) => {
                      e.target.src = '/img/1.jpg'
                    }}
                  />
                  <div className="category-code">{category.code}</div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="category-title">
                    {categoryNameMap[category.code] || category.name}
                  </Card.Title>
                  {category.description && (
                    <Card.Text className="category-description flex-grow-1">
                      {category.description}
                    </Card.Text>
                  )}
                  {category._count && (
                    <p className="product-count text-muted mb-3">
                      {category._count.products}개 제품
                    </p>
                  )}
                  <Link href={`/products?category=${category.code}`} passHref legacyBehavior>
                    <Button variant="primary" className="mt-auto">
                      자세히 보기
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .product-categories-section {
          background-color: #f8f9fa;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 50px;
          position: relative;
          padding-bottom: 15px;
        }

        .section-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background-color: var(--accent-color);
        }

        :global(.category-card) {
          border: none;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        :global(.category-card:hover) {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        :global(.card-img-wrapper) {
          position: relative;
          height: 250px;
          overflow: hidden;
          background-color: #f5f5f5;
        }

        :global(.category-card .card-img-top) {
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        :global(.category-card:hover .card-img-top) {
          transform: scale(1.05);
        }

        :global(.category-code) {
          position: absolute;
          top: 15px;
          left: 15px;
          background-color: var(--primary-color);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        :global(.category-title) {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
        }

        :global(.category-description) {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
        }

        :global(.product-count) {
          font-size: 0.9rem;
        }

        :global(.category-card .btn-primary) {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          font-weight: 500;
        }

        :global(.category-card .btn-primary:hover) {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          :global(.card-img-wrapper) {
            height: 200px;
          }

          :global(.category-title) {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  )
}