import React, { useState, useRef } from 'react'
import { Card, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap'
import { uploadImage, deleteImage } from '@/lib/supabase'

interface ImageUploaderProps {
  images: Array<{
    id?: number
    url: string
    alt?: string
    orderIndex?: number
  }>
  onImagesChange: (images: Array<{ url: string; alt?: string }>) => void
  maxImages?: number
}

export default function ImageUploader({ images = [], onImagesChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > maxImages) {
      setError(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`)
      return
    }

    setUploading(true)
    setError('')

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // 이미지 파일 검증
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name}은(는) 이미지 파일이 아닙니다.`)
        }

        // 파일 크기 제한 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name}의 크기가 5MB를 초과합니다.`)
        }

        const url = await uploadImage(file)
        return { url, alt: file.name }
      })

      const newImages = await Promise.all(uploadPromises)
      onImagesChange([...images, ...newImages])
    } catch (error: any) {
      setError(error.message || '이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = async (index: number) => {
    if (!confirm('이미지를 삭제하시겠습니까?')) return

    try {
      const imageToRemove = images[index]
      if (imageToRemove.url) {
        await deleteImage(imageToRemove.url)
      }
      
      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)
    } catch (error) {
      console.error('Failed to delete image:', error)
      setError('이미지 삭제에 실패했습니다.')
    }
  }

  const handleAltTextChange = (index: number, alt: string) => {
    const newImages = [...images]
    newImages[index] = { ...newImages[index], alt }
    onImagesChange(newImages)
  }

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-images me-2"></i>
            상품 이미지
          </h5>
          <span className="text-muted">
            {images.length} / {maxImages}
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        <div className="mb-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Button
            variant="outline-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
          >
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                업로드 중...
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt me-2"></i>
                이미지 추가
              </>
            )}
          </Button>
          <Form.Text className="ms-3">
            JPG, PNG, WEBP 형식 / 최대 5MB
          </Form.Text>
        </div>

        {images.length > 0 && (
          <Row className="g-3">
            {images.map((image, index) => (
              <Col key={index} xs={12} sm={6} md={4}>
                <Card className="h-100">
                  <div style={{ position: 'relative', paddingBottom: '75%' }}>
                    <img
                      src={image.url}
                      alt={image.alt || `상품 이미지 ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {index === 0 && (
                      <span
                        className="badge bg-primary"
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px'
                        }}
                      >
                        대표이미지
                      </span>
                    )}
                  </div>
                  <Card.Body>
                    <Form.Group className="mb-2">
                      <Form.Label className="small">대체 텍스트</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={image.alt || ''}
                        onChange={(e) => handleAltTextChange(index, e.target.value)}
                        placeholder="이미지 설명"
                      />
                    </Form.Group>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <i className="fas fa-trash me-1"></i>
                      삭제
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  )
}