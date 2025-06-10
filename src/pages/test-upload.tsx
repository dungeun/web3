import React, { useState } from 'react'
import { Container, Card, Button, Alert } from 'react-bootstrap'
import { uploadImage } from '@/lib/supabase'

export default function TestUpload() {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    setImageUrl('')

    try {
      const url = await uploadImage(file)
      setImageUrl(url)
      console.log('Upload successful:', url)
    } catch (error: any) {
      setError(error.message || '업로드 실패')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Container className="py-5">
      <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Header>
          <h4>Supabase 이미지 업로드 테스트</h4>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger">{error}</Alert>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          
          {uploading && <p className="mt-3">업로드 중...</p>}
          
          {imageUrl && (
            <div className="mt-4">
              <p><strong>업로드 성공!</strong></p>
              <p className="text-break">URL: {imageUrl}</p>
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}