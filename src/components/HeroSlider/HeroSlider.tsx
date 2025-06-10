import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import Link from 'next/link'
import styles from './HeroSlider.module.css'

interface HeroSlide {
  id: number
  title: string
  subtitle: string | null
  buttonText: string | null
  buttonUrl: string | null
  mediaType: 'IMAGE' | 'VIDEO'
  mediaUrl: string
  overlay: number
  orderIndex: number
  isActive: boolean
}

interface SiteConfig {
  heroType: string
  heroVideoUrl: string
  heroVideoOverlay: string
  heroTitle: string
  heroSubtitle: string
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)

  useEffect(() => {
    fetchSiteConfig()
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000) // 5초마다 슬라이드 변경

      return () => clearInterval(interval)
    }
  }, [slides.length, currentSlide])

  const fetchSiteConfig = async () => {
    try {
      const res = await fetch('/api/site-config')
      const data = await res.json()
      
      if (res.ok) {
        setSiteConfig({
          heroType: data.heroType || 'slides',
          heroVideoUrl: data.heroVideoUrl || '',
          heroVideoOverlay: data.heroVideoOverlay || '50',
          heroTitle: data.heroTitle || '대한민국 대표 하드웨어 소재 전문기업',
          heroSubtitle: data.heroSubtitle || '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.'
        })
      }
    } catch (error) {
      console.error('Failed to fetch site config:', error)
    }
  }

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/slides')
      const data = await res.json()
      
      if (res.ok) {
        setSlides(data)
      }
    } catch (error) {
      console.error('Failed to fetch slides:', error)
    } finally {
      setLoading(false)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = extractYouTubeId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1` : url
  }

  if (loading || !siteConfig) {
    return (
      <section 
        className="hero-section" 
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/background/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <h1 className="hero-title">
            <span className="text-reveal">대한민국 대표 </span>
            <span className="highlight">하드웨어 소재 전문기업</span>
          </h1>
          <p className="hero-text">
            대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.
            고객의 니즈에 맞는 맞춤형 솔루션으로 신뢰와 혁신을 약속드립니다.
          </p>
          <Link href="/products" passHref legacyBehavior>
            <Button variant="primary" size="lg" className="btn-animated">
              제품 보기
            </Button>
          </Link>
        </Container>
      </section>
    )
  }

  // Video mode
  if (siteConfig.heroType === 'video' && siteConfig.heroVideoUrl) {
    return (
      <section className={styles.heroSlider}>
        <div className={styles.slide + ' ' + styles.active}>
          <div className={styles.videoContainer}>
            <iframe
              src={getYouTubeEmbedUrl(siteConfig.heroVideoUrl)}
              title="Hero Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
              loading="lazy"
            />
          </div>
          <div 
            className={styles.overlay} 
            style={{ 
              opacity: parseInt(siteConfig.heroVideoOverlay) / 100
            }} 
          />
        </div>
        
        <div className={styles.content}>
          <Container className={styles.container}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>
                {siteConfig.heroTitle}
              </h1>
              {siteConfig.heroSubtitle && (
                <p className={styles.subtitle}>
                  {siteConfig.heroSubtitle}
                </p>
              )}
              <Link href="/products" passHref legacyBehavior>
                <Button variant="primary" size="lg" className="btn-animated">
                  제품 보기
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </section>
    )
  }

  // Slides mode - check if we have slides
  if (slides.length === 0) {
    return (
      <section 
        className="hero-section" 
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/background/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <h1 className="hero-title">
            {siteConfig.heroTitle}
          </h1>
          {siteConfig.heroSubtitle && (
            <p className="hero-text">
              {siteConfig.heroSubtitle}
            </p>
          )}
          <Link href="/products" passHref legacyBehavior>
            <Button variant="primary" size="lg" className="btn-animated">
              제품 보기
            </Button>
          </Link>
        </Container>
      </section>
    )
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className={styles.heroSlider}>
      {/* 슬라이드 배경 */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          {slide.mediaType === 'IMAGE' ? (
            <>
              <div 
                className={styles.slideBackground}
                style={{
                  backgroundImage: `url(${slide.mediaUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div 
                className={styles.overlay} 
                style={{ 
                  opacity: slide.overlay / 100,
                  backgroundColor: 'rgba(0, 0, 0, 1)'
                }} 
              />
            </>
          ) : (
            <>
              <div className={styles.videoContainer}>
                <iframe
                  src={getYouTubeEmbedUrl(slide.mediaUrl)}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className={styles.video}
                />
              </div>
              <div 
                className={styles.overlay} 
                style={{ 
                  opacity: Math.max(slide.overlay, 10) / 100,
                  backgroundColor: 'rgba(0, 0, 0, 1)'
                }} 
              />
            </>
          )}
        </div>
      ))}

      {/* 슬라이드 콘텐츠 */}
      <div className={styles.content}>
        <Container className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              {currentSlideData.title}
            </h1>
            {currentSlideData.subtitle && (
              <p className={styles.subtitle}>
                {currentSlideData.subtitle}
              </p>
            )}
            {currentSlideData.buttonText && currentSlideData.buttonUrl && (
              <Link href={currentSlideData.buttonUrl} passHref legacyBehavior>
                <Button variant="primary" size="lg" className="btn-animated">
                  {currentSlideData.buttonText}
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </div>

      {/* 슬라이드 인디케이터 */}
      {slides.length > 1 && (
        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}