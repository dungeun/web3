import React from 'react'
import { TemplateSection } from '@/types/template'
import ContentSection from './sections/ContentSection'
import TwoColumnSection from './sections/TwoColumnSection'
import CTASection from './sections/CTASection'
import FAQSection from './sections/FAQSection'
import TimelineSection from './sections/TimelineSection'
import GallerySection from './sections/GallerySection'
import FormSection from './sections/FormSection'
import MapSection from './sections/MapSection'
import HeroSection from './sections/HeroSection'
import ProductCategoriesSection from './sections/ProductCategoriesSection'
import ProductGallerySection from './sections/ProductGallerySection'

interface SectionRendererProps {
  section: TemplateSection
  data?: any
  isPreview?: boolean
}

export default function SectionRenderer({ section, data = {}, isPreview = false }: SectionRendererProps) {
  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return <HeroSection section={section} data={data} isPreview={isPreview} />
      case 'content':
        return <ContentSection section={section} data={data} isPreview={isPreview} />
      case 'two-column':
        return <TwoColumnSection section={section} data={data} isPreview={isPreview} />
      case 'cta':
        return <CTASection section={section} data={data} isPreview={isPreview} />
      case 'faq':
        return <FAQSection section={section} data={data} isPreview={isPreview} />
      case 'timeline':
        return <TimelineSection section={section} data={data} isPreview={isPreview} />
      case 'gallery':
        return <GallerySection section={section} data={data} isPreview={isPreview} />
      case 'form':
        return <FormSection section={section} data={data} isPreview={isPreview} />
      case 'map':
        return <MapSection section={section} data={data} isPreview={isPreview} />
      case 'product-categories':
        return <ProductCategoriesSection section={section} data={data} isPreview={isPreview} />
      case 'product-gallery':
        return <ProductGallerySection section={section} data={data} isPreview={isPreview} />
      default:
        return null
    }
  }

  return (
    <div className={`template-section ${isPreview ? 'preview-mode' : ''}`} data-section-id={section.id}>
      {renderSection()}
    </div>
  )
}