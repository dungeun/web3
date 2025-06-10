import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { TemplateSection } from '@/types/template'

interface ProductGallerySectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

interface Product {
  id: number
  code: string | null
  name: string
  model: string | null
  description: string | null
  imageUrl: string | null
  categoryId: number
  category: {
    id: number
    code: string
    name: string
  }
  images?: Array<{
    id: number
    url: string
    alt: string | null
  }>
}

interface ProductCategory {
  id: number
  code: string
  name: string
}

export default function ProductGallerySection({ section, data, isPreview }: ProductGallerySectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null)
  
  const sectionData = data[section.id] || {}
  const { title = '제품 갤러리', className = '' } = sectionData

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products?limit=100')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/products/categories')
      if (response.ok) {
        const data = await response.json()
        const activeCategories = data.filter((cat: any) => cat.isActive)
        setCategories(activeCategories)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category.code === selectedCategory)

  const handleImageClick = (product: Product) => {
    const imageSrc = product.imageUrl || (product.images && product.images[0]?.url)
    if (imageSrc) {
      setSelectedImage({
        src: imageSrc,
        title: `${product.name} ${product.model ? `(${product.model})` : ''}`
      })
      setShowModal(true)
    }
  }

  const getProductImage = (product: Product) => {
    return product.imageUrl || (product.images && product.images[0]?.url) || '/img/1.jpg'
  }

  if (loading) {
    return (
      <section className={`product-gallery-section py-5 ${className}`}>
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
    <section className={`product-gallery-section py-5 ${className}`}>
      <Container>
        {title && (
          <h2 className="section-title text-center mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
            {title}
          </h2>
        )}
        
        {/* Category Filter */}
        <div className="category-filter mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedCategory('all')}
              className="filter-btn"
            >
              전체
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.code ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedCategory(category.code)}
                className="filter-btn"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Gallery Grid */}
        <Row className="g-4">
          {filteredProducts.map((product, index) => (
            <Col key={product.id} xs={6} md={4} lg={3}>
              <div 
                className="gallery-item"
                data-aos={!isPreview ? "fade-up" : undefined}
                data-aos-delay={!isPreview ? (index * 50).toString() : undefined}
                onClick={() => handleImageClick(product)}
              >
                <div className="gallery-img-wrapper">
                  <img 
                    src={getProductImage(product)} 
                    alt={product.name}
                    onError={(e: any) => {
                      e.target.src = '/img/1.jpg'
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <i className="bi bi-zoom-in"></i>
                    </div>
                  </div>
                </div>
                <div className="gallery-info">
                  <span className="category-badge">{product.category.code}</span>
                  <h5 className="product-name">{product.name}</h5>
                  {(product.code || product.model) && (
                    <p className="product-model">
                      {product.code || product.model}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">해당 카테고리에 제품이 없습니다.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)}
          size="lg"
          centered
          className="gallery-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedImage?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            {selectedImage && (
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="w-100"
              />
            )}
          </Modal.Body>
        </Modal>
      </Container>

      <style jsx>{`
        .product-gallery-section {
          background-color: #fff;
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

        :global(.filter-btn) {
          min-width: 100px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        :global(.gallery-item) {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        :global(.gallery-item:hover) {
          transform: translateY(-5px);
        }

        :global(.gallery-img-wrapper) {
          position: relative;
          padding-bottom: 100%;
          overflow: hidden;
          background-color: #f5f5f5;
          border-radius: 8px;
        }

        :global(.gallery-img-wrapper img) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        :global(.gallery-item:hover .gallery-img-wrapper img) {
          transform: scale(1.1);
        }

        :global(.gallery-overlay) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.gallery-item:hover .gallery-overlay) {
          opacity: 1;
        }

        :global(.overlay-content) {
          color: white;
          font-size: 2rem;
        }

        :global(.gallery-info) {
          padding: 15px 0;
          text-align: center;
        }

        :global(.category-badge) {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          padding: 2px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        :global(.product-name) {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :global(.product-model) {
          font-size: 0.85rem;
          color: #666;
          margin: 5px 0 0;
        }

        :global(.gallery-modal .modal-content) {
          background-color: transparent;
          border: none;
        }

        :global(.gallery-modal .modal-header) {
          background-color: white;
          border-radius: 8px 8px 0 0;
        }

        :global(.gallery-modal .modal-body img) {
          border-radius: 0 0 8px 8px;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          :global(.filter-btn) {
            min-width: 80px;
            font-size: 0.9rem;
            padding: 0.375rem 0.75rem;
          }

          :global(.gallery-info) {
            padding: 10px 0;
          }

          :global(.product-name) {
            font-size: 0.9rem;
          }

          :global(.category-badge) {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </section>
  )
}