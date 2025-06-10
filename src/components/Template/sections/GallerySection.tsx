import React, { useState } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import Image from 'next/image'
import { TemplateSection } from '@/types/template'

interface GalleryItem {
  id: string
  image: string
  title: string
  description?: string
}

interface GallerySectionProps {
  section: TemplateSection
  data: any
  isPreview?: boolean
}

export default function GallerySection({ section, data, isPreview }: GallerySectionProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  
  const sectionData = data[section.id] || {}
  const { 
    title = '갤러리',
    items = [] as GalleryItem[],
    columns = 3,
    className = ''
  } = sectionData

  const defaultItems: GalleryItem[] = [
    { id: '1', image: '/images/gallery/cert1.jpg', title: '스테인리스 소재 인증' },
    { id: '2', image: '/images/gallery/cert2.jpg', title: 'IP 등급 인증' },
    { id: '3', image: '/images/gallery/cert3.jpg', title: '난연 인증' },
    { id: '4', image: '/images/gallery/cert4.jpg', title: 'UL 인증' },
    { id: '5', image: '/images/gallery/cert5.jpg', title: 'RoHS 인증' },
    { id: '6', image: '/images/gallery/cert6.jpg', title: 'ISO 9001 인증' }
  ]

  const galleryItems = items.length > 0 ? items : defaultItems

  const handleImageClick = (item: GalleryItem) => {
    if (!isPreview) {
      setSelectedImage(item)
      setShowModal(true)
    }
  }

  return (
    <section className={`gallery-section py-5 ${className}`}>
      <Container>
        <h2 className="section-title text-center mb-5" data-aos={!isPreview ? "fade-up" : undefined}>
          {title}
        </h2>
        
        <Row>
          {galleryItems.map((item: GalleryItem, index: number) => (
            <Col 
              key={item.id} 
              lg={12 / columns} 
              md={6} 
              className="mb-4"
              data-aos={!isPreview ? "fade-up" : undefined}
              data-aos-delay={!isPreview ? (index * 100).toString() : undefined}
            >
              <div 
                className="gallery-item"
                onClick={() => handleImageClick(item)}
                style={{ cursor: isPreview ? 'default' : 'pointer' }}
              >
                <div className="gallery-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="img-fluid"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                  </div>
                </div>
                <div className="gallery-caption">
                  <h5>{item.title}</h5>
                  {item.description && <p>{item.description}</p>}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {!isPreview && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Body className="p-0">
            {selectedImage && (
              <div className="text-center">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="img-fluid"
                  style={{ objectFit: 'contain' }}
                />
                <div className="p-3">
                  <h4>{selectedImage.title}</h4>
                  {selectedImage.description && <p>{selectedImage.description}</p>}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}

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

        .gallery-item {
          position: relative;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .gallery-image {
          position: relative;
          overflow: hidden;
          height: 250px;
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay i {
          font-size: 2rem;
          color: white;
        }

        .gallery-caption {
          padding: 20px;
          text-align: center;
        }

        .gallery-caption h5 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .gallery-caption p {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }
      `}</style>
    </section>
  )
}