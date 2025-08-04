"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

interface PalmCardProps {
  name: string
  images: string[]
  description: string
  price: string
  linkHref: string
  onDetailsClick: () => void
}

export function PalmCard({ name, images, description, price, linkHref, onDetailsClick }: PalmCardProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [currentGalleryImageIndex, setCurrentGalleryImageIndex] = useState(0)

  const openGalleryModal = (initialIndex: number = 0) => {
    setCurrentGalleryImageIndex(initialIndex)
    setIsGalleryModalOpen(true)
  }

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false)
    setCurrentGalleryImageIndex(0)
  }

  const nextGalleryImage = () => {
    setCurrentGalleryImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const selectGalleryImage = (index: number) => {
    setCurrentGalleryImageIndex(index)
  }

  const handleCardPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleCardNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGalleryModalOpen) return
      switch (event.key) {
        case 'Escape':
          closeGalleryModal()
          break
        case 'ArrowLeft':
          prevGalleryImage()
          break
        case 'ArrowRight':
          nextGalleryImage()
          break
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryModalOpen, images.length])

  return (
    <>
      <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 h-full flex flex-col bg-white">
        <div className="relative h-72 overflow-hidden cursor-pointer select-none">
          {/* Индикатор количества фото */}
          {images && images.length > 1 && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-black/70 text-white font-bold px-3 py-1 text-sm shadow-lg backdrop-blur-md">
                {images.length} фото
              </Badge>
            </div>
          )}
          
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => openGalleryModal(currentImageIndex)}
            style={{ cursor: 'pointer' }}
          />
          
          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {images.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(dotIndex);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    dotIndex === currentImageIndex
                      ? "bg-green-500 scale-125"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Gallery Navigation Arrows */}
          {images && images.length > 1 && (
            <>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg pointer-events-auto"
                  onClick={e => { e.stopPropagation(); handleCardPrev(); }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg pointer-events-auto"
                  onClick={e => { e.stopPropagation(); handleCardNext(); }}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </>
          )}
        </div>
        
        <CardContent className="p-6 flex flex-col flex-grow bg-white">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{name}</h3>
          <p className="text-gray-500 mb-4 text-sm flex-grow">{description}</p>
          <div className="text-2xl font-bold text-green-600 mb-4">{price}</div>
          <div className="mt-auto">
            <Link href={linkHref}>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                {t('learnMore')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeGalleryModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
              <div className="relative w-full flex items-center justify-center" style={{minHeight: '0'}}>
                <Image
                  src={images[currentGalleryImageIndex] || "/placeholder.svg"}
                  alt={`Gallery image ${currentGalleryImageIndex + 1}`}
                  width={1200}
                  height={900}
                  priority
                  className="mx-auto rounded-lg shadow-2xl bg-white max-w-full max-h-[calc(100vh-160px)] w-auto h-auto object-contain"
                  style={{
                    maxWidth: '100vw',
                    maxHeight: 'calc(100vh - 120px)',
                  }}
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevGalleryImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextGalleryImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="h-20 sm:h-24 bg-black/50 backdrop-blur-md flex items-center justify-center gap-2 p-2 sm:p-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectGalleryImage(index)}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentGalleryImageIndex
                        ? "border-green-500 scale-110"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentGalleryImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
