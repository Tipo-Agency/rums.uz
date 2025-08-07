"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

interface FurnitureCardProps {
  name: string
  images: string[]
  description: string
  linkHref: string
  onDetailsClick: () => void
}

export function FurnitureCard({ name, images, description, linkHref, onDetailsClick }: FurnitureCardProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [hasUsedSwipe, setHasUsedSwipe] = useState(false)
  const [currentSwipeOffset, setCurrentSwipeOffset] = useState<number>(0)

  // Animation handling
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Минимальное расстояние для срабатывания свайпа (в пикселях)
  const minSwipeDistance = 50

  const handleCardPrev = () => {
    if (isAnimating) return // Предотвращаем множественные анимации

    setAnimationDirection('right')
    setIsAnimating(true)

    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(false)
      setAnimationDirection(null)
    }, 400)
  }

  const handleCardNext = () => {
    if (isAnimating) return // Предотвращаем множественные анимации

    setAnimationDirection('left')
    setIsAnimating(true)

    setCurrentImageIndex((prev) => (prev + 1) % images.length)

    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(false)
      setAnimationDirection(null)
    }, 400)
  }

  // Touch handlers для свайпа
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // иначе свайп может срабатывать после обычного клика
    setTouchStart(e.targetTouches[0].clientX)
    setCurrentSwipeOffset(0)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isAnimating) return
    
    const currentX = e.targetTouches[0].clientX
    const offset = currentX - touchStart
    
    // Ограничиваем offset для лучшего UX
    const limitedOffset = Math.max(-80, Math.min(80, offset))
    
    setCurrentSwipeOffset(limitedOffset)
    setTouchEnd(currentX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setCurrentSwipeOffset(0)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Сбрасываем offset
    setCurrentSwipeOffset(0)

    if (isLeftSwipe) {
      handleCardNext()
      setHasUsedSwipe(true) // Отмечаем что свайп был использован
    } else if (isRightSwipe) {
      handleCardPrev()
      setHasUsedSwipe(true) // Отмечаем что свайп был использован
    }
  }

  // Определение поддержки touch при монтировании компонента
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white h-full flex flex-col">
      <div 
        className="relative h-72 overflow-hidden cursor-pointer select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Индикатор количества фото */}
        {images && images.length > 1 && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-black/70 text-white font-bold px-3 py-1 text-sm shadow-lg backdrop-blur-md">
              {images.length} фото
            </Badge>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`furniture-${currentImageIndex}`}
            initial={{ 
              x: animationDirection === 'left' ? 50 : animationDirection === 'right' ? -50 : 0,
              opacity: 0,
              scale: 0.95
            }}
            animate={{ 
              x: currentSwipeOffset || 0,
              opacity: 1,
              scale: 1
            }}
            exit={{ 
              x: animationDirection === 'left' ? -50 : animationDirection === 'right' ? 50 : 0,
              opacity: 0,
              scale: 0.95
            }}
            transition={{ 
              duration: currentSwipeOffset ? 0 : 0.4, // Мгновенно во время свайпа
              ease: [0.25, 0.46, 0.45, 0.94] // Более плавная кривая
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </AnimatePresence>

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? "bg-purple-500 scale-125" : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Gallery Navigation Arrows - скрыты на touch устройствах */}
        {images && images.length > 1 && !isTouchDevice && (
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

        {/* Swipe инструкция для touch устройств (показывается до первого использования) */}
        {images.length > 1 && isTouchDevice && !hasUsedSwipe && (
          <div className="absolute top-4 left-4 z-10 animate-pulse">
            <Badge className="bg-purple-500/90 text-white text-xs px-3 py-1 backdrop-blur-sm shadow-lg">
              👆 Свайп для листания
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-semibold mb-2 text-purple-900">{name}</h3>
        <p className="text-gray-500 mb-4 text-sm flex-grow">{description}</p>
        <div className="mt-auto">
          <Link href={linkHref}>
          <Button
            className="w-full bg-purple-300 hover:bg-purple-400 text-purple-900"
          >
            {t('learnMore')} <ArrowRight className="w-4 h-4 ml-2 text-purple-900" />
          </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
