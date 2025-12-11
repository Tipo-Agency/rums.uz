"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Leaf,
  CheckCircle,
  ShieldCheck,
  Sun,
  Wind,
  ArrowRight,
  Timer,
  ShoppingCart,
  User,
  CreditCard,
  Truck,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Facebook,
  Instagram,
  Gift,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAmoForms } from "@/hooks/use-amo-forms"
import { useLanguage } from "@/lib/language-context"
import { EcopalmaInquiryModal } from "@/components/ecopalma-inquiry-modal"
import { MetaPixelEcopalma } from "@/components/meta-pixel-ecopalma"

// Добавляем типы для глобального окна
declare global {
  interface Window {
    clickAmoButton?: () => void;
  }
}

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export default function EcopalmaPage() {
  const { t } = useLanguage()
  
  // Инициализируем AmoCRM
  useAmoForms({
    id: "1572670",
    hash: "e2904c885a56624d2292fd178d837c58",
    scriptUrl: "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1752873171"
  })

  const getTimeLeftInMonth = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
    endOfMonth.setMilliseconds(-1); // последний миллисекунда текущего месяца
    const diff = endOfMonth.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeftInMonth());
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const [inquiryModalVariant, setInquiryModalVariant] = useState<'default' | 'consultation' | 'learn-more'>('default')

  // Timer countdown to end of July
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

  // Функции для управления модальным окном
  const openInquiryModal = () => {
    setInquiryModalVariant('default')
    setIsInquiryModalOpen(true)
  }

  const openConsultationModal = () => {
    setInquiryModalVariant('consultation')
    setIsInquiryModalOpen(true)
  }

  const openLearnMoreModal = () => {
    setInquiryModalVariant('learn-more')
    setIsInquiryModalOpen(true)
  }

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false)
  }


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
      price: `${t('from')} $1850`,
      linkHref: "/ecopalma",
    },
    {
      name: t('palmExotic'),
      images: ["/ecopalma/exotic/2.jpg", "/ecopalma/exotic/4.jpg", "/ecopalma/exotic/5.jpg", "/ecopalma/exotic/6.jpg", "/ecopalma/exotic/7.jpg", "/ecopalma/exotic/8.jpg"],
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

  const features = [
    { icon: CheckCircle, title: t('hyperRealistic'), text: t('hyperRealisticDesc') },
    { icon: ShieldCheck, title: t('hypoallergenic'), text: t('hypoallergenicDesc') },
    { icon: Sun, title: t('noFading'), text: t('noFadingDesc') },
    {
      icon: Wind,
      title: t('easyMaintenance'),
      text: t('easyMaintenanceDesc'),
    },
  ]

  const testimonials = [
    {
      name: "Рухсора",
      text: "Жуда жуда йокти чиройли нарсекан. Тозала сув куй диган бош-огрикла бомирган",
      image: "/cocktail-1.jpg",
    },
    {
      name: "Sitora",
      text: "12та олдик ресторанни атрофига койб чикдик, роза зор коринвоти",
      image: "/miami-2.jpg",
    },
    {
      name: "Abdurashid",
      text: "Мехмон хонани олдига койб чикдик зор хаммаси рахмат",
      image: "/exotic-palm.png",
    },
    {
      name: "Azizbek Y.",
      text: "Ecopalmani ishi rosa yaqdi, hammaga tavsiya qilb qolaman i kelgjedayam hudo holasa yana zakaz qilamiz",
      image: "/bounty-1.png",
    },
    {
      name: "Baxrom A.",
      text: "Установили пальмы на даче. Она добавила красоту нашему участку, и теперь не нужно беспокоиться о поливе. Очень довольны",
      image: "/cocktail-3.png",
    },
    {
      name: "Yusuf",
      text: "Uyimzaga 5-6ta oldik, hammasi chotkiy uyni ancha ochdi. Uyga kirgan hammaga yoqvoti 👍",
      image: "/bounty-2.png",
    },
  ]

  const advantages = [
    {
      icon: Wind,
      title: t('weatherResistance'),
      description: t('weatherResistanceDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('qualityGuarantee3Years'),
      description: t('qualityGuarantee3YearsDesc'),
    },
    {
      icon: Timer,
      title: t('fastManufacturing7_14Days'),
      description: t('fastManufacturing7_14DaysDesc'),
    },
    {
      icon: CheckCircle,
      title: t('professionalInstallation'),
      description: t('professionalInstallationDesc'),
    },
    {
      icon: User,
      title: t('individualSizeSelection'),
      description: t('individualSizeSelectionDesc'),
    },
    {
      icon: Leaf,
      title: t('ecoFriendlyMaterials'),
      description: t('ecoFriendlyMaterialsDesc'),
    },
  ]

  const orderProcess = [
    {
      icon: User,
      title: t('makeRequest'),
      description: t('makeRequestDesc'),
    },
    {
      icon: CreditCard,
      title: t('prepaymentAndManufacturing'),
      description: t('prepaymentAndManufacturingDesc'),
    },
    {
      icon: Truck,
      title: t('freeDelivery'),
      description: t('freeDeliveryDesc'),
    },
  ]

  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      description: t('youtubeDesc'),
      color: "from-red-500 to-red-600",
      href: "#",
    },
    {
      name: "Facebook",
      icon: Facebook,
      description: t('facebookDesc'),
      color: "from-blue-600 to-blue-700",
      href: "#",
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: t('instagramDesc'),
      color: "from-pink-500 to-purple-600",
      href: "https://www.instagram.com/ecopalma.uz/",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      description: t('telegramDesc'),
      color: "from-blue-400 to-blue-500",
      href: "https://t.me/ecopalmatashkent",
    },
  ]

  const galleryImages = [
    "/cocktail-1.jpg",
    "/cocktail-3.png",
    "/exotic-palm.png",
    "/bounty-1.png",
    "/style-interior.jpg",
    "/miami-1.jpg",
    "/bounty-2.png",
  ]

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextGallerySlide = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGallerySlide = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // --- Галерея для карточек каталога ---
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [currentProductGallery, setCurrentProductGallery] = useState<string[]>([])
  const [currentGalleryImageIndex, setCurrentGalleryImageIndex] = useState(0)

  // Для превью в карточках
  const [cardImageIndexes, setCardImageIndexes] = useState<number[]>(() => palms.map(() => 0))
  
  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [hasUsedSwipe, setHasUsedSwipe] = useState(false)
  const [currentSwipeOffset, setCurrentSwipeOffset] = useState<{ [key: number]: number }>({})
  
  // Animation handling
  const [animationDirection, setAnimationDirection] = useState<{ [key: number]: 'left' | 'right' | null }>({})
  const [isAnimating, setIsAnimating] = useState<{ [key: number]: boolean }>({})

  // Минимальное расстояние для срабатывания свайпа (в пикселях)
  const minSwipeDistance = 50
  
  const handleCardPrev = (idx: number, images: string[]) => {
    if (isAnimating[idx]) return // Предотвращаем множественные анимации
    
    setAnimationDirection(prev => ({ ...prev, [idx]: 'right' }))
    setIsAnimating(prev => ({ ...prev, [idx]: true }))
    
    // Немедленно меняем изображение для лучшей синхронизации
    setCardImageIndexes(prev => {
      const copy = [...prev]
      copy[idx] = (copy[idx] - 1 + images.length) % images.length
      return copy
    })
    
    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(prev => ({ ...prev, [idx]: false }))
      setAnimationDirection(prev => ({ ...prev, [idx]: null }))
    }, 400) // Даем время для завершения анимации
  }
  
  const handleCardNext = (idx: number, images: string[]) => {
    if (isAnimating[idx]) return // Предотвращаем множественные анимации
    
    setAnimationDirection(prev => ({ ...prev, [idx]: 'left' }))
    setIsAnimating(prev => ({ ...prev, [idx]: true }))
    
    // Немедленно меняем изображение для лучшей синхронизации
    setCardImageIndexes(prev => {
      const copy = [...prev]
      copy[idx] = (copy[idx] + 1) % images.length
      return copy
    })
    
    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(prev => ({ ...prev, [idx]: false }))
      setAnimationDirection(prev => ({ ...prev, [idx]: null }))
    }, 400) // Даем время для завершения анимации
  }

  // Touch handlers для свайпа
  const onTouchStart = (e: React.TouchEvent, cardIndex: number) => {
    setTouchEnd(null) // иначе свайп может срабатывать после обычного клика
    setTouchStart(e.targetTouches[0].clientX)
    setCurrentSwipeOffset(prev => ({ ...prev, [cardIndex]: 0 }))
  }

  const onTouchMove = (e: React.TouchEvent, cardIndex: number) => {
    if (!touchStart || isAnimating[cardIndex]) return
    
    const currentX = e.targetTouches[0].clientX
    const offset = currentX - touchStart
    
    // Ограничиваем offset для лучшего UX
    const limitedOffset = Math.max(-80, Math.min(80, offset))
    
    setCurrentSwipeOffset(prev => ({ ...prev, [cardIndex]: limitedOffset }))
    setTouchEnd(currentX)
  }

  const onTouchEnd = (cardIndex: number, images: string[]) => {
    if (!touchStart || !touchEnd) {
      setCurrentSwipeOffset(prev => ({ ...prev, [cardIndex]: 0 }))
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Сбрасываем offset
    setCurrentSwipeOffset(prev => ({ ...prev, [cardIndex]: 0 }))

    if (isLeftSwipe) {
      handleCardNext(cardIndex, images)
      setHasUsedSwipe(true) // Отмечаем что свайп был использован
    } else if (isRightSwipe) {
      handleCardPrev(cardIndex, images)
      setHasUsedSwipe(true) // Отмечаем что свайп был использован
    }
  }

  // Определение поддержки touch при монтировании компонента
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  
  const handleCardOpenModal = (images: string[], imgIdx: number = 0) => {
    setCurrentProductGallery(images)
    setCurrentGalleryImageIndex(imgIdx)
    setIsGalleryModalOpen(true)
  }

  const openGalleryModal = (gallery: string[], initialIndex: number = 0) => {
    setCurrentProductGallery(gallery)
    setCurrentGalleryImageIndex(initialIndex)
    setIsGalleryModalOpen(true)
  }

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false)
    setCurrentProductGallery([])
    setCurrentGalleryImageIndex(0)
  }

  const nextGalleryImage = () => {
    setCurrentGalleryImageIndex((prev) => (prev + 1) % currentProductGallery.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImageIndex((prev) => (prev - 1 + currentProductGallery.length) % currentProductGallery.length)
  }

  const selectGalleryImage = (index: number) => {
    setCurrentGalleryImageIndex(index)
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
  }, [isGalleryModalOpen, currentProductGallery.length])

  return (
    <div className="bg-white text-gray-800">
      <Header />

      <main className="pt-[70px]">
        {/* Hero Section with Discount */}
        <section className="relative h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/cocktail-2.jpg" alt="Sunlight through palm leaves" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex-grow flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-red-500/90 hover:bg-red-500/90 text-white border-red-400 backdrop-blur-md shadow-lg text-lg px-4 py-2">
                <Gift className="w-5 h-5 mr-2" />
                {t('discountAndFreeDesign')}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">ECOPALMA</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-200 max-w-2xl mx-auto mb-8 drop-shadow-lg font-medium">
                {t('artOfCreatingEternalNature')}
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
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={openInquiryModal}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('orderWithDiscount')}
                </Button>
                <div id="amocrm_btn"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Catalog */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('ourCatalog')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {palms.map((palm, i) => (
                <motion.div
                  key={palm.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 h-full flex flex-col bg-white">
                    {/* Индикатор количества фото */}
                    {palm.images && palm.images.length > 1 && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-black/70 text-white font-bold px-3 py-1 text-sm shadow-lg backdrop-blur-md">
                          {palm.images.length} {t('ecopalmaPhotos')}
                        </Badge>
                      </div>
                    )}
                    <div 
                      className="relative h-72 overflow-hidden cursor-pointer select-none"
                      onTouchStart={(e) => onTouchStart(e, i)}
                      onTouchMove={(e) => onTouchMove(e, i)}
                      onTouchEnd={() => onTouchEnd(i, palm.images)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${i}-${cardImageIndexes[i]}`}
                          initial={{ 
                            x: animationDirection[i] === 'left' ? 50 : animationDirection[i] === 'right' ? -50 : 0,
                            opacity: 0,
                            scale: 0.95
                          }}
                          animate={{ 
                            x: currentSwipeOffset[i] || 0,
                            opacity: 1,
                            scale: 1
                          }}
                          exit={{ 
                            x: animationDirection[i] === 'left' ? -50 : animationDirection[i] === 'right' ? 50 : 0,
                            opacity: 0,
                            scale: 0.95
                          }}
                          transition={{ 
                            duration: currentSwipeOffset[i] ? 0 : 0.4, // Мгновенно во время свайпа
                            ease: [0.25, 0.46, 0.45, 0.94] // Более плавная кривая
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={palm.images[cardImageIndexes[i]] || "/placeholder.svg"}
                            alt={palm.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onClick={() => handleCardOpenModal(palm.images, cardImageIndexes[i])}
                            style={{ cursor: 'pointer' }}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Image Indicators */}
                      {palm.images && palm.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                          {palm.images.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardImageIndexes(prev => {
                                  const copy = [...prev];
                                  copy[i] = dotIndex;
                                  return copy;
                                });
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                dotIndex === cardImageIndexes[i]
                                  ? "bg-green-500 scale-125"
                                  : "bg-white/60 hover:bg-white/80"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Gallery Navigation Arrows - скрыты на touch устройствах */}
                      {palm.images && palm.images.length > 1 && !isTouchDevice && (
                        <>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
                          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg pointer-events-auto"
                              onClick={e => { e.stopPropagation(); handleCardPrev(i, palm.images); }}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg pointer-events-auto"
                              onClick={e => { e.stopPropagation(); handleCardNext(i, palm.images); }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow bg-white">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{palm.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm flex-grow">{palm.description}</p>
                      <div className="text-2xl font-bold text-green-600 mb-4">{palm.price}</div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                        onClick={openLearnMoreModal}
                      >
                        {t('learnMore')} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Palm Process - Compact Version */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('howToGetPalm')}</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              {orderProcess.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Advantages */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('additionalAdvantages')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, i) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow bg-white">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <advantage.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{advantage.title}</h3>
                    <p className="text-gray-600 mb-6">{advantage.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                <Leaf className="w-6 h-6 mr-3" />
                {t('ecopalmaOrderButton')}
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                {t('ecopalmaOrderSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('customerPhotoReviews')}
            </h2>
            <div className="relative max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <Button
                  onClick={prevTestimonial}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-12 h-12 p-0 bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonialIndex ? "bg-green-600 scale-125" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  onClick={nextTestimonial}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-12 h-12 p-0 bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-8 shadow-lg bg-white">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <Quote className="w-12 h-12 text-green-600 mb-4" />
                        <p className="text-lg text-gray-700 mb-6 italic">
                          &ldquo;{testimonials[currentTestimonialIndex].text}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">
                              {testimonials[currentTestimonialIndex].name}
                            </h4>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Image
                          src={testimonials[currentTestimonialIndex].image || "/placeholder.svg"}
                          alt={testimonials[currentTestimonialIndex].name}
                          width={400}
                          height={400}
                          className="rounded-xl shadow-lg w-full object-cover"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{t('followUs')}</h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
              {t('joinOurCommunity')}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {socialLinks.map((social, i) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="p-8 text-center bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                      >
                        <social.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">{social.name}</h3>
                      <p className="text-gray-300 flex-grow">{social.description}</p>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        {/* <section className="py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">{t('getConsultation')}</h2>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-12 py-4 text-lg text-white"
                onClick={openConsultationModal}
              >
                {t('requestConsultation')}
              </Button>
            </div>
          </div>
        </section> */}

        {/* Gallery Slider */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('palmsInInterior')}</h2>
            <div className="relative max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <Button
                  onClick={prevGallerySlide}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-12 h-12 p-0 bg-white shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: Math.ceil(galleryImages.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index * 3)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        Math.floor(currentGalleryIndex / 3) === index ? "bg-green-600 scale-125" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  onClick={nextGallerySlide}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-12 h-12 p-0 bg-white shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {galleryImages.slice(currentGalleryIndex, currentGalleryIndex + 3).map((src, i) => (
                  <motion.div
                    key={currentGalleryIndex + i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Gallery image ${currentGalleryIndex + i + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('frequentlyAskedQuestions')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('canUsePalmsOutside')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('canUsePalmsOutsideAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('whatAreDeliveryTimes')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('whatAreDeliveryTimesAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('howToCareForPalms')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('howToCareForPalmsAnswer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openConsultationModal}
              >
                <Leaf className="w-6 h-6 mr-3" />
                {t('ecopalmaConsultationButton')}
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                {t('ecopalmaConsultationSubtitle')}
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-fit bg-black/90 backdrop-blur-sm">
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
                  src={currentProductGallery[currentGalleryImageIndex] || "/placeholder.svg"}
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
                {currentProductGallery.length > 1 && (
                  <>
                    <button
                      onClick={prevGalleryImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextGalleryImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Thumbnail Navigation */}
            {currentProductGallery.length > 1 && (
              <div className="h-24 bg-black/50 backdrop-blur-md flex items-center justify-center gap-2 p-4">
                {currentProductGallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectGalleryImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
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
            {currentProductGallery.length > 1 && (
              <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentGalleryImageIndex + 1} / {currentProductGallery.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meta Pixel для Ecopalma */}
      <MetaPixelEcopalma />

      {/* Inquiry Modal */}
      <EcopalmaInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={closeInquiryModal}
        variant={inquiryModalVariant}
      />

      <Footer />
    </div>
  )
}
