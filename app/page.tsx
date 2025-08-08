"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Leaf,
  Sparkles,
  Timer,
  Map,
  Baby,
  Truck,
  Globe,
  Package,
  Wrench,
  Palette,
  Send,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderModal } from "@/components/order-modal"
import { PalmCard } from "@/components/palm-card"
import { PalmDetailModal } from "@/components/palm-detail-modal"
import { MapInquiryModal } from "@/components/map-inquiry-modal"
import { FurnitureCard } from "@/components/furniture-card"
import { FurnitureInquiryModal } from "@/components/furniture-inquiry-modal"
import { useAmoForms } from "@/hooks/use-amo-forms"
import { useLanguage } from "@/lib/language-context"


interface MapData {
  images: string[];
  description: string;
}

interface Maps {
  [key: string]: MapData;
}

export default function PalkarMePage() {
  const { t } = useLanguage()
  
  // Инициализируем AmoCRM для Woodlyworld секции
  useAmoForms({
    id: "1572666",
    hash: "7e3787568500d57ca5f700f4498c35b3",
    scriptUrl: "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1752885451"
  })

  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 })
  const [activeMap, setActiveMap] = useState("")
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isPalmDetailModalOpen, setIsPalmDetailModalOpen] = useState(false)
  const [isMapInquiryModalOpen, setIsMapInquiryModalOpen] = useState(false)
  const [selectedPalm, setSelectedPalm] = useState<{
    name: string
    description: string
    linkHref: string
  } | null>(null)
  const [isFurnitureInquiryModalOpen, setIsFurnitureInquiryModalOpen] = useState(false)
  const [selectedFurniture, setSelectedFurniture] = useState<{
    name: string
    description: string
  } | null>(null)
  const [currentFurnitureIndex, setCurrentFurnitureIndex] = useState(0)

  const palms = [
    {
      name: t('palmMiami'),
      images: ["/ecopalma/mayami/1.jpg", "/ecopalma/mayami/2.jpg", "/ecopalma/mayami/3.jpg", "/ecopalma/mayami/4.jpg", "/ecopalma/mayami/5.jpg"],
      description: t('palmMiamiDesc'),
      price: `${t('from')} $850`,
      linkHref: "/ecopalma",
    },
    {
      name: t('palmCocktail'),
      images: ["/ecopalma/coctail/1.jpg", "/ecopalma/coctail/2.jpg", "/ecopalma/coctail/3.jpg", "/ecopalma/coctail/4.jpg", "/ecopalma/coctail/5.jpg"],
      description: t('palmCocktailDesc'),
      price: `${t('from')} $850`,
      linkHref: "/ecopalma",
    },
    {
      name: t('palmExotic'),
      images: ["/ecopalma/exotic/1.jpg", "/ecopalma/exotic/2.jpg", "/ecopalma/exotic/3.jpg", "/ecopalma/exotic/4.jpg", "/ecopalma/exotic/5.jpg", "/ecopalma/exotic/6.jpg", "/ecopalma/exotic/7.jpg", "/ecopalma/exotic/8.jpg"],
      description: t('palmExoticDesc'),
      price: `${t('from')} $850`,
      linkHref: "/ecopalma",
    },
    {
      name: t('palmBounty'),
      images: ["/ecopalma/bounty/1.jpg", "/ecopalma/bounty/2.jpg", "/ecopalma/bounty/3.jpg", "/ecopalma/bounty/4.jpg", "/ecopalma/bounty/5.jpg"],
      description: t('palmBountyDesc'),
      price: `${t('from')} $780`,
      linkHref: "/ecopalma",
    },
  ]

  const furniture = [
    {
      name: t('helperTower'),
      images: [
        "/tower-1.jpeg",
        "/tower-2.jpeg",
        "/tower-3.jpeg",
        "/tower-4.jpeg",
        "/tower-5.jpeg",
        "/tower-6.jpeg",
        "/tower-7.jpeg",
      ],
      description: t('helperTowerDesc'),
      linkHref: "/babyjoy",
    },
    {
      name: t('growingDeskChair'),
      images: [
        "/desk-chair-1.jpeg",
        "/desk-chair-2.jpeg",
        "/desk-chair-3.jpeg",
        "/desk-chair-4.jpeg",
        "/desk-chair-5.jpeg",
        "/desk-chair-6.jpeg",
      ],
      description: t('growingDeskChairDesc'),
      linkHref: "/babyjoy",
    },
    {
      name: t('piklerTriangle'),
      images: [
        "/pikler-1.jpeg",
        "/pikler-2.jpeg",
        "/pikler-3.jpeg",
        "/pikler-4.jpeg",
        "/pikler-5.jpeg",
        "/pikler-6.jpeg",
        "/pikler-7.jpeg",
      ],
      description: t('piklerTriangleDesc'),
      linkHref: "/babyjoy",
    },
    {
      name: t('childrenCart'),
      images: ["/cart-1.jpeg", "/cart-2.jpeg", "/cart-3.jpeg"],
      description: t('childrenCartDesc'),
      linkHref: "/babyjoy",
    },
    {
      name: t('bunkBed'),
      images: ["/bunk-bed-1.jpeg", "/bunk-bed-2.jpeg"],
      description: t('bunkBedDesc'),
      linkHref: "/babyjoy",
    },
  ]

  const maps: Maps = useMemo(() => ({
    [t('maps3D')]: {
      images: [
        "woodyworld/3d/1.jpg",
        "woodyworld/3d/2.jpg",
        "woodyworld/3d/3.jpg",
        "woodyworld/3d/4.jpg",
        "woodyworld/3d/5.jpg",
        "woodyworld/3d/6.jpg",
        "woodyworld/3d/7.jpg",
        "woodyworld/3d/8.jpg",
        "woodyworld/3d/9.jpg",
        "woodyworld/3d/10.jpg",
        "woodyworld/3d/11.jpg",
        "woodyworld/3d/12.jpg",
        "woodyworld/3d/13.jpg",
        "woodyworld/3d/14.jpg"
      ],
      description: t('woodlyworld3DDesc'),
    },
    [t('mapsLED')]: {
      images: [
        "woodyworld/led/1.jpg",
        "woodyworld/led/2.jpg",
        "woodyworld/led/3.jpg",
        "woodyworld/led/4.jpg",
        "woodyworld/led/5.jpg",
        "woodyworld/led/6.jpg"
      ],
      description: t('woodlyworldLEDDesc'),
    },
    [t('mapsPhoto')]: {
      images: [
        "woodyworld/photo/1.jpg",
        "woodyworld/photo/2.jpg",
        "woodyworld/photo/4.jpg",
        "woodyworld/photo/5.jpg",
        "woodyworld/photo/6.jpg"
      ],
      description: t('woodlyworldPhotoDesc'),
    },
    [t('maps2D')]: {
      images: [
        "woodyworld/2d/1.jpg",
        "woodyworld/2d/2.jpg"
      ],
      description: t('woodlyworld2DDesc'),
    },
  }), [t])

  const [currentMapImageIndex, setCurrentMapImageIndex] = useState(0)

  // Touch/swipe handling для Woodlyworld карт
  const [mapTouchStart, setMapTouchStart] = useState<number | null>(null)
  const [mapTouchEnd, setMapTouchEnd] = useState<number | null>(null)
  const [isMapTouchDevice, setIsMapTouchDevice] = useState(false)
  const [hasUsedMapSwipe, setHasUsedMapSwipe] = useState(false)
  const [currentMapSwipeOffset, setCurrentMapSwipeOffset] = useState<number>(0)

  // Animation handling для карт
  const [mapAnimationDirection, setMapAnimationDirection] = useState<'left' | 'right' | null>(null)
  const [isMapAnimating, setIsMapAnimating] = useState(false)

  // Минимальное расстояние для срабатывания свайпа карт (в пикселях)
  const minMapSwipeDistance = 50

  // Initialize activeMap when translations are ready or language changes
  useEffect(() => {
    const mapKeys = Object.keys(maps)
    if (mapKeys.length > 0) {
      setActiveMap(prevActiveMap => {
        // Only change if current activeMap is not valid for new maps
        if (!prevActiveMap || !mapKeys.includes(prevActiveMap)) {
          return mapKeys[0] // Set to first map key (3D Maps)
        }
        return prevActiveMap // Keep current selection if it's valid
      })
    }
  }, [maps])

  // Furniture carousel settings
  const itemsPerPage = 4
  const maxIndex = Math.max(0, furniture.length - itemsPerPage)

  const nextFurniture = () => {
    setCurrentFurnitureIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevFurniture = () => {
    setCurrentFurnitureIndex((prev) => Math.max(prev - 1, 0))
  }

  const visibleFurniture = furniture.slice(currentFurnitureIndex, currentFurnitureIndex + itemsPerPage)

  // Map image navigation
  const nextMapImage = () => {
    if (isMapAnimating) return // Предотвращаем множественные анимации
    if (activeMap && maps[activeMap]?.images) {
      setMapAnimationDirection('left')
      setIsMapAnimating(true)

      setCurrentMapImageIndex((prev) => (prev + 1) % maps[activeMap].images.length)

      // Сбрасываем состояние анимации после завершения
      setTimeout(() => {
        setIsMapAnimating(false)
        setMapAnimationDirection(null)
      }, 400)
    }
  }

  const prevMapImage = () => {
    if (isMapAnimating) return // Предотвращаем множественные анимации
    if (activeMap && maps[activeMap]?.images) {
      setMapAnimationDirection('right')
      setIsMapAnimating(true)

      setCurrentMapImageIndex((prev) => (prev - 1 + maps[activeMap].images.length) % maps[activeMap].images.length)

      // Сбрасываем состояние анимации после завершения
      setTimeout(() => {
        setIsMapAnimating(false)
        setMapAnimationDirection(null)
      }, 400)
    }
  }

  useEffect(() => {
    setCurrentMapImageIndex(0)
  }, [activeMap])

  // Touch handlers для свайпа карт
  const onMapTouchStart = (e: React.TouchEvent) => {
    setMapTouchEnd(null) // иначе свайп может срабатывать после обычного клика
    setMapTouchStart(e.targetTouches[0].clientX)
    setCurrentMapSwipeOffset(0)
  }

  const onMapTouchMove = (e: React.TouchEvent) => {
    if (!mapTouchStart || isMapAnimating) return
    
    const currentX = e.targetTouches[0].clientX
    const offset = currentX - mapTouchStart
    
    // Ограничиваем offset для лучшего UX
    const limitedOffset = Math.max(-80, Math.min(80, offset))
    
    setCurrentMapSwipeOffset(limitedOffset)
    setMapTouchEnd(currentX)
  }

  const onMapTouchEnd = () => {
    if (!mapTouchStart || !mapTouchEnd) {
      setCurrentMapSwipeOffset(0)
      return
    }
    
    const distance = mapTouchStart - mapTouchEnd
    const isLeftSwipe = distance > minMapSwipeDistance
    const isRightSwipe = distance < -minMapSwipeDistance

    // Сбрасываем offset
    setCurrentMapSwipeOffset(0)

    if (isLeftSwipe) {
      nextMapImage()
      setHasUsedMapSwipe(true) // Отмечаем что свайп был использован
    } else if (isRightSwipe) {
      prevMapImage()
      setHasUsedMapSwipe(true) // Отмечаем что свайп был использован
    }
  }

  // Определение поддержки touch при монтировании компонента
  useEffect(() => {
    setIsMapTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handlePalmDetailsClick = (palm: { name: string; description: string; linkHref: string }) => {
    setSelectedPalm(palm)
    setIsPalmDetailModalOpen(true)
  }

  const handleMapInquiryClick = () => {
    setIsMapInquiryModalOpen(true)
  }

  const handleFurnitureDetailsClick = (furniture: { name: string; description: string }) => {
    setSelectedFurniture(furniture)
    setIsFurnitureInquiryModalOpen(true)
  }

  const services = [
    {
      icon: Leaf,
      title: t('artificialPalmsService'),
      description: t('artificialPalmsServiceDesc'),
    },
    {
      icon: Map,
      title: t('woodenMapsService'),
      description: t('woodenMapsServiceDesc'),
    },
    {
      icon: Baby,
      title: t('corpusFurnitureService'),
      description: t('corpusFurnitureServiceDesc'),
    },
    {
      icon: Palette,
      title: t('individualDesignService'),
      description: t('individualDesignServiceDesc'),
    },
    {
      icon: Sparkles,
      title: t('personalizationService'),
      description: t('personalizationServiceDesc'),
    },
    {
      icon: Wrench,
      title: t('materialSupplyService'),
      description: t('materialSupplyServiceDesc'),
    },
  ]

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      <PalmDetailModal
        isOpen={isPalmDetailModalOpen}
        onClose={() => setIsPalmDetailModalOpen(false)}
        palmName={selectedPalm?.name || ""}
        palmDescription={selectedPalm?.description || ""}
        linkHref={selectedPalm?.linkHref || "/ecopalma"}
      />
      <MapInquiryModal
        isOpen={isMapInquiryModalOpen}
        onClose={() => setIsMapInquiryModalOpen(false)}
        mapType={activeMap || ""}
        mapDescription={activeMap && maps[activeMap]?.description || ""}
      />
      <FurnitureInquiryModal
        isOpen={isFurnitureInquiryModalOpen}
        onClose={() => setIsFurnitureInquiryModalOpen(false)}
        furnitureName={selectedFurniture?.name || ""}
        furnitureDescription={selectedFurniture?.description || ""}
      />

      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hero-bg-new.jpg"
              alt="Modern living room with large green plants"
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex-grow flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-md shadow-lg">
                <Timer className="w-4 h-4 mr-2" />
                {t('limitedOffer')}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">{t('cozyHomeItems')}</span>{" "}
                <span className="block bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                  {t('interior')}
                </span>{" "}
                <span className="text-white drop-shadow-lg text-4xl md:text-5xl">{t('withDiscount')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium">
                {t('createComfortForHome')}
              </p>
            </motion.div>
          </div>
          <div className="relative z-10 w-full px-4 pb-8 md:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="flex justify-center space-x-2 md:space-x-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="text-center bg-white/15 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/30 min-w-[70px] md:min-w-[90px] shadow-xl"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-white/90 uppercase tracking-wider font-medium">{t(unit as keyof typeof timeLeft)}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+998773007890">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('contactManager')}
                </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ecopalma Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{t('uniquePalms')}</h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                {t('realisticArtificialPalms')}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {palms.map((palm, i) => (
                <motion.div
                  key={palm.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <PalmCard
                    name={palm.name}
                    images={palm.images}
                    description={palm.description}
                    price={palm.price}
                    linkHref={palm.linkHref}
                    onDetailsClick={() => handlePalmDetailsClick(palm)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Woodlyworld Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('worldMaps')}</h2>
              <p className="text-xl text-gray-300 mb-8 min-h-[6rem]">{activeMap && maps[activeMap]?.description || ""}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.keys(maps).map((name) => (
                  <button
                    key={name}
                    onClick={() => setActiveMap(name)}
                    className={`p-4 rounded-lg flex items-center gap-3 transition-colors duration-300 ${
                      activeMap === name ? "bg-orange-500 text-white" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    <Map className="w-6 h-6" />
                    <span className="font-medium">{name}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => {
                    const amoButton = document.getElementById('amoforms_action_btn');
                    if (amoButton) {
                      amoButton.click();
                    }
                  }}
                >
                  {t('submitRequest')}
                </Button>
                <Link href="/woodlyworld">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {t('learnMore')}
                  </Button>
                </Link>
                <div id="amocrm_btn"></div>
              </div>
            </motion.div>
            <motion.div
              className="relative h-96 lg:h-auto lg:aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div 
                className="relative h-full cursor-pointer select-none"
                onTouchStart={onMapTouchStart}
                onTouchMove={onMapTouchMove}
                onTouchEnd={onMapTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeMap}-${currentMapImageIndex}`}
                    initial={{ 
                      x: mapAnimationDirection === 'left' ? 50 : mapAnimationDirection === 'right' ? -50 : 0,
                      opacity: 0,
                      scale: 0.95
                    }}
                    animate={{ 
                      x: currentMapSwipeOffset || 0,
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{ 
                      x: mapAnimationDirection === 'left' ? -50 : mapAnimationDirection === 'right' ? 50 : 0,
                      opacity: 0,
                      scale: 0.95
                    }}
                    transition={{ 
                      duration: currentMapSwipeOffset ? 0 : 0.4, // Мгновенно во время свайпа
                      ease: [0.25, 0.46, 0.45, 0.94] // Более плавная кривая
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeMap && maps[activeMap]?.images?.[currentMapImageIndex] || "/placeholder.svg"}
                      alt={activeMap || "Map"}
                      fill
                      className="rounded-2xl shadow-2xl object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows - скрыты на touch устройствах */}
                {activeMap && (maps[activeMap]?.images?.length || 0) > 1 && !isMapTouchDevice && (
                  <>
                    <button
                      onClick={prevMapImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextMapImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Swipe инструкция для touch устройств (показывается до первого использования) */}
                {activeMap && (maps[activeMap]?.images?.length || 0) > 1 && isMapTouchDevice && !hasUsedMapSwipe && (
                  <div className="absolute top-4 left-4 z-10 animate-pulse">
                    <Badge className="bg-orange-500/90 text-white text-xs px-3 py-1 backdrop-blur-sm shadow-lg">
                      👆 Свайп для листания
                    </Badge>
                  </div>
                )}

                {/* Image indicators */}
                {activeMap && (maps[activeMap]?.images?.length || 0) > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {(activeMap && maps[activeMap]?.images || []).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMapImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentMapImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Babyjoy Section with Carousel */}
        <section className="py-24 bg-purple-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-900">
                {t('furnitureForChildren')}
              </h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8">
                {t('qualityChildrenFurniture')}
              </p>

              {/* Carousel Controls */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <Button
                  onClick={prevFurniture}
                  disabled={currentFurnitureIndex === 0}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-10 h-10 p-0 disabled:opacity-50 bg-white border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.ceil(furniture.length / itemsPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFurnitureIndex(index * itemsPerPage)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        Math.floor(currentFurnitureIndex / itemsPerPage) === index
                          ? "bg-purple-600 scale-125"
                          : "bg-purple-300 hover:bg-purple-400"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextFurniture}
                  disabled={currentFurnitureIndex >= maxIndex}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-10 h-10 p-0 disabled:opacity-50 bg-white border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-center text-gray-500 mb-12">
                {t('showing')} {currentFurnitureIndex + 1}-{Math.min(currentFurnitureIndex + itemsPerPage, furniture.length)}{" "}
                {t('of')} {furniture.length} {t('products')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              <AnimatePresence mode="wait">
                {visibleFurniture.map((item, i) => (
                  <motion.div
                    key={`${item.name}-${currentFurnitureIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <FurnitureCard
                      name={item.name}
                      images={item.images}
                      description={item.description}
                      linkHref={item.linkHref}
                      onDetailsClick={() => handleFurnitureDetailsClick(item)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{t('ourServices')}</h2>
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
                {t('fullCycleProduction')}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="bg-gray-700/50 p-8 rounded-2xl h-full hover:bg-gray-700 hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('deliveryOptions')}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Package,
                  title: t('tashkentDelivery'),
                  desc: t('tashkentDeliveryDesc'),
                },
                {
                  icon: Truck,
                  title: t('uzbekistanDelivery'),
                  desc: t('uzbekistanDeliveryDesc'),
                },
                {
                  icon: Globe,
                  title: t('worldwideDelivery'),
                  desc: t('worldwideDeliveryDesc'),
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Card className="text-center p-8 rounded-2xl shadow-lg h-full hover:shadow-2xl transition-all duration-300 bg-white">
                    <motion.div
                      className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white ring-4 ring-orange-100"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-10 h-10" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

