"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  Heart,
  ArrowRight,
  Star,
  Globe,
  Lightbulb,
  Timer,
  ShoppingCart,
  User,
  CreditCard,
  Truck,
  Quote,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Facebook,
  Instagram,
  Gift,
  Palette,
  Package,
  Headphones,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAmoForms } from "@/hooks/use-amo-forms"
import { useLanguage } from "@/lib/language-context"
import { WoodlyworldInquiryModal } from "@/components/woodlyworld-inquiry-modal"
import { MetaPixelWoodlyworld } from "@/components/meta-pixel-woodlyworld"


interface MapItem {
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  description: string;
  gallery?: string[];
}

interface MapCategory {
  items: MapItem[];
}

interface MapCategories {
  [key: string]: MapCategory;
}

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export default function WoodlyworldPage() {
  const { t } = useLanguage()
  
  // Инициализируем AmoCRM
  useAmoForms({
    id: "1572666",
    hash: "7e3787568500d57ca5f700f4498c35b3",
    scriptUrl: "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1752885451"
  })

  const [activeCategory, setActiveCategory] = useState("")
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [currentProductGallery, setCurrentProductGallery] = useState<string[]>([])
  const [currentGalleryImageIndex, setCurrentGalleryImageIndex] = useState(0)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const [inquiryModalVariant, setInquiryModalVariant] = useState<'default' | 'consultation' | 'learn-more'>('default')

  const mapCategories: MapCategories = useMemo(() => ({
    [t('maps3D')]: {
      items: [
        {
          name: t('map3dNatural'),
          image: "woodyworld/3d/1.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dNaturalDesc'),
          gallery: [
            "woodyworld/3d/1.jpg",
            "woodyworld/3d/2.jpg",
            "woodyworld/3d/3.jpg",
            "woodyworld/3d/4.jpg",
            "woodyworld/3d/5.jpg"
          ]
        },
        {
          name: t('map3dBlackWitch'),
          image: "woodyworld/3d/8.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dBlackWitchDesc'),
          gallery: [
            "woodyworld/3d/8.jpg",
            "woodyworld/3d/9.jpg",
            "woodyworld/3d/10.jpg",
            "woodyworld/3d/11.jpg",
            "woodyworld/3d/12.jpg"
          ]
        },
        {
          name: t('map3dMacchiato'),
          image: "woodyworld/3d/9.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dMacchiatoDesc'),
          gallery: [
            "woodyworld/3d/9.jpg",
            "woodyworld/3d/10.jpg",
            "woodyworld/3d/11.jpg",
            "woodyworld/3d/12.jpg",
            "woodyworld/3d/13.jpg"
          ]
        },
        {
          name: t('map3dElegant'),
          image: "woodyworld/3d/10.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dElegantDesc'),
          gallery: [
            "woodyworld/3d/10.jpg",
            "woodyworld/3d/11.jpg",
            "woodyworld/3d/12.jpg",
            "woodyworld/3d/13.jpg",
            "woodyworld/3d/14.jpg"
          ]
        },        {
          name: t('map3dMarshmallow'),
          image: "woodyworld/3d/11.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dMarshmallowDesc'),
          gallery: [
            "woodyworld/3d/11.jpg",
            "woodyworld/3d/12.jpg",
            "woodyworld/3d/13.jpg",
            "woodyworld/3d/14.jpg",
            "woodyworld/3d/1.jpg"
          ]
        },        {
          name: t('map3dMiami'),
          image: "woodyworld/3d/12.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dMiamiDesc'),
          gallery: [
            "woodyworld/3d/12.jpg",
            "woodyworld/3d/13.jpg",
            "woodyworld/3d/14.jpg",
            "woodyworld/3d/1.jpg",
            "woodyworld/3d/2.jpg"
          ]
        },        {
          name: t('map3dExotic'),
          image: "woodyworld/3d/13.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dExoticDesc'),
          gallery: [
            "woodyworld/3d/13.jpg",
            "woodyworld/3d/14.jpg",
            "woodyworld/3d/1.jpg",
            "woodyworld/3d/2.jpg",
            "woodyworld/3d/3.jpg"
          ]
        },        {
          name: t('map3dCaramel'),
          image: "woodyworld/3d/14.jpg",
          price: `${t('from')} 1,181,000`,
          oldPrice: "1,969,000",
          description: t('map3dCaramelDesc'),
          gallery: [
            "woodyworld/3d/14.jpg",
            "woodyworld/3d/1.jpg",
            "woodyworld/3d/2.jpg",
            "woodyworld/3d/3.jpg",
            "woodyworld/3d/4.jpg"
          ]
        },
      ],
    },
    [t('mapsLED')]: {
      items: [
        {
          name: t('mapLedAurora'),
          image: "woodyworld/map-led-1.jpeg",
          price: `${t('from')} 3,209,000`,
          oldPrice: "5,348,000",
          description: t('mapLedAuroraDesc'),
          gallery: [
            "woodyworld/map-led-1.jpeg",
            "woodyworld/led/1.jpg",
            "woodyworld/led/2.jpg",
            "woodyworld/led/3.jpg",
            "woodyworld/led/4.jpg"
          ]
        },
        {
          name: t('mapLedGoldenHour'),
          image: "woodyworld/map-led-2.jpeg",
          price: `${t('from')} 2,467,000`,
          oldPrice: "4,111,000",
          description: t('mapLedGoldenHourDesc'),
          gallery: [
            "woodyworld/map-led-2.jpeg",
            "woodyworld/led/5.jpg",
            "woodyworld/led/6.jpg",
            "woodyworld/led/1.jpg",
            "woodyworld/led/2.jpg"
          ]
        },
        {
          name: t('mapLedBlue'),
          image: "woodyworld/led/1.jpg",
          price: `${t('from')} 3,209,000`,
          oldPrice: "5,348,000",
          description: t('mapLedBlueDesc'),
          gallery: [
            "woodyworld/led/1.jpg",
            "woodyworld/led/2.jpg",
            "woodyworld/led/3.jpg",
            "woodyworld/led/4.jpg",
            "woodyworld/led/5.jpg"
          ]
        },
        {
          name: t('mapLedGreen'),
          image: "woodyworld/led/3.jpg",
          price: `${t('from')} 2,467,000`,
          oldPrice: "4,111,000",
          description: t('mapLedGreenDesc'),
          gallery: [
            "woodyworld/led/3.jpg",
            "woodyworld/led/4.jpg",
            "woodyworld/led/5.jpg",
            "woodyworld/led/6.jpg",
            "woodyworld/led/1.jpg"
          ]
        },
        {
          name: t('mapLedUnique'),
          image: "woodyworld/led/4.jpg",
          price: `${t('from')} 3,209,000`,
          oldPrice: "5,348,000",
          description: t('mapLedUniqueDesc'),
          gallery: [
            "woodyworld/led/4.jpg",
            "woodyworld/led/5.jpg",
            "woodyworld/led/6.jpg",
            "woodyworld/led/1.jpg",
            "woodyworld/led/2.jpg"
          ]
        },        {
          name: t('mapLedNatural'),
          image: "woodyworld/led/5.jpg",
          price: `${t('from')} 2,467,000`,
          oldPrice: "4,111,000",
          description: t('mapLedNaturalDesc'),
          gallery: [
            "woodyworld/led/5.jpg",
            "woodyworld/led/6.jpg",
            "woodyworld/led/1.jpg",
            "woodyworld/led/2.jpg",
            "woodyworld/led/3.jpg"
          ]
        },        {
          name: t('mapLedBlackWitch'),
          image: "woodyworld/led/6.jpg",
          price: `${t('from')} 1,536,000`,
          oldPrice: "2,559,000",
          description: t('mapLedBlackWitchDesc'),
          gallery: [
            "woodyworld/led/6.jpg",
            "woodyworld/led/1.jpg",
            "woodyworld/led/2.jpg",
            "woodyworld/led/3.jpg",
            "woodyworld/led/4.jpg"
          ]
        },
      ],
    },
    [t('mapsPhoto')]: {
      items: [
        {
          name: t('mapPhotoTraveler'),
          image: "woodyworld/photo/1.jpg",
          price: `${t('from')} 1,536,000`,
          oldPrice: "2,559,000",
          description: t('mapPhotoTravelerDesc'),
          gallery: [
            "woodyworld/photo/1.jpg",
            "woodyworld/photo/2.jpg",
            "woodyworld/photo/4.jpg",
            "woodyworld/photo/5.jpg",
            "woodyworld/photo/6.jpg"
          ]
        },
      ],
    },
    [t('maps2D')]: {
      items: [
        {
          name: t('map2dLight'),
          image: "woodyworld/2d/1.jpg",
          price: `${t('from')} 866,250`,
          oldPrice: "1,443,750",
          description: t('map2dLightDesc'),
          gallery: [
            "woodyworld/2d/1.jpg",
            "woodyworld/2d/2.jpg",
            "woodyworld/3d/1.jpg",
            "woodyworld/3d/2.jpg",
            "woodyworld/3d/3.jpg"
          ]
        },
        {
          name: t('map2dBlack'),
          image: "woodyworld/2d/2.jpg",
          price: `${t('from')} 866,250`,
          oldPrice: "1,443,750",
          description: t('map2dBlackDesc'),
          gallery: [
            "woodyworld/2d/2.jpg",
            "woodyworld/2d/1.jpg",
            "woodyworld/3d/4.jpg",
            "woodyworld/3d/5.jpg",
            "woodyworld/3d/6.jpg"
          ]
        }
      ],
    },
    [t('accessories')]: {
      items: [
        {
          name: t('flagsPremium'),
          image: "woodyworld/prin/country_tag.jpg",
          price: `${t('from')} 546,000`,
          oldPrice: "657,000",
          description: t('flagsPremiumDesc'),
          gallery: [
            "woodyworld/prin/country_tag.jpg",
            "woodyworld/prin/country_tag2.jpg",
            "woodyworld/prin/1.jpg",
            "woodyworld/prin/2.jpg",
            "woodyworld/prin/3.jpg"
          ]
        },
        {
          name: t('flagsStandard'),
          image: "woodyworld/prin/1.jpg",
          price: `${t('from')} 352,000`,
          oldPrice: "413,000",
          description: t('flagsStandardDesc'),
          gallery: [
            "woodyworld/prin/1.jpg",
            "woodyworld/prin/2.jpg",
            "woodyworld/prin/3.jpg",
            "woodyworld/prin/country_tag.jpg",
            "woodyworld/prin/country_tag2.jpg"
          ]
        },        {
          name: t('woodenClock'),
          image: "woodyworld/prin/2.jpg",
          price: `${t('from')} 248,000`,
          oldPrice: "413,000",
          description: t('woodenClockDesc'),
          gallery: [
            "woodyworld/prin/2.jpg",
            "woodyworld/prin/3.jpg",
            "woodyworld/prin/country_tag.jpg",
            "woodyworld/prin/country_tag2.jpg",
            "woodyworld/prin/1.jpg"
          ]
        },        {
          name: t('pushPinFlags'),
          image: "woodyworld/prin/3.jpg",
          price: `${t('from')} 268,000`,
          oldPrice: "440,000",
          description: t('pushPinFlagsDesc'),
          gallery: [
            "woodyworld/prin/3.jpg",
            "woodyworld/prin/country_tag.jpg",
            "woodyworld/prin/country_tag2.jpg",
            "woodyworld/prin/1.jpg",
            "woodyworld/prin/2.jpg"
          ]
        },
      ],
    },
  }), [t])

  // Initialize activeCategory when mapCategories is ready or language changes
  useEffect(() => {
    const categories = Object.keys(mapCategories)
    if (categories.length > 0) {
      // Always set to first category (3D Maps) - handles both initial load and language switch
      setActiveCategory(categories[0])
    }
  }, [mapCategories])

  const features = [
    {
      icon: CheckCircle,
      title: t('naturalWood'),
      text: t('naturalWoodDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('ecoFriendly'),
      text: t('ecoFriendlyDesc'),
    },
    {
      icon: Zap,
      title: t('ledTechnology'),
      text: t('ledTechnologyDesc'),
    },
    {
      icon: Heart,
      title: t('handmade'),
      text: t('handmadeDesc'),
    },
  ]

  const uniqueFeatures = [
    {
      icon: Globe,
      title: t('technology2Dvs3D'),
      description: t('technology2Dvs3DDesc'),
    },
    {
      icon: Lightbulb,
      title: t('ledLightingWithControl'),
      description: t('ledLightingWithControlDesc'),
    },
    {
      icon: Star,
      title: t('premiumMaterials'),
      description: t('premiumMaterialsDesc'),
    },
  ]

  const advantages = [
    {
      icon: Zap,
      title: t('energyEfficientLED'),
      description: t('energyEfficientLEDDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('qualityGuarantee2Years'),
      description: t('qualityGuarantee2YearsDesc'),
    },
    {
      icon: Timer,
      title: t('fastManufacturing3_7Days'),
      description: t('fastManufacturing3_7DaysDesc'),
    },
    {
      icon: Package,
      title: t('safePackaging'),
      description: t('safePackagingDesc'),
    },
    {
      icon: Headphones,
      title: t('personalConsultation'),
      description: t('personalConsultationDesc'),
    },
    {
      icon: Palette,
      title: t('individualDesign'),
      description: t('individualDesignDesc'),
    },
  ]

  const testimonials = [
    {
      name: t('woodlyworldTestimonial1Name'),
      text: t('woodlyworldTestimonial1Text'),
      image: "reviews/mikhail_review.jpeg",
    },
    {
      name: t('woodlyworldTestimonial2Name'),
      text: t('woodlyworldTestimonial2Text'),
      image: "woodyworld/map-led-1.jpeg",
    },
    {
      name: t('woodlyworldTestimonial3Name'),
      text: t('woodlyworldTestimonial3Text'),
      image: "reviews/maftuna_review.jpeg",
    },
    {
      name: t('woodlyworldTestimonial4Name'),
      text: t('woodlyworldTestimonial4Text'),
      image: "woodyworld/map-led-2.jpeg",
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
      href: "https://www.instagram.com/woodlyworld.uz/",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      description: t('telegramDesc'),
      color: "from-blue-400 to-blue-500",
      href: "https://t.me/woodlyworld",
    },
  ]

  const galleryImages = [
    "woodyworld/map-3d-1.jpeg",
    "woodyworld/map-led-1.jpeg",
    "woodyworld/map-photo-1.png",
    "woodyworld/map-3d-2.jpeg",
    "woodyworld/map-led-2.jpeg",
    "woodyworld/map-photo-2.png",
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


  const nextGalleryImage = () => {
    setCurrentGalleryImageIndex((prev) => (prev + 1) % currentProductGallery.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImageIndex((prev) => (prev - 1 + currentProductGallery.length) % currentProductGallery.length)
  }

  const selectGalleryImage = (index: number) => {
    setCurrentGalleryImageIndex(index)
  }

  // Для превью в карточках
  const [cardImageIndexes, setCardImageIndexes] = useState<number[]>(() => Object.values(mapCategories).flatMap(cat => cat.items.map(() => 0)))
  
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
  
  const getCardIndex = (catIdx: number, itemIdx: number) => {
    // Получить индекс в общем массиве для flatMap
    let idx = 0
    let i = 0
    for (const [catName, cat] of Object.entries(mapCategories)) {
      if (i === catIdx) break
      idx += cat.items.length
      i++
    }
    return idx + itemIdx
  }
  
  const handleCardPrev = (catIdx: number, itemIdx: number, gallery: string[] = []) => {
    const idx = getCardIndex(catIdx, itemIdx)
    if (isAnimating[idx]) return // Предотвращаем множественные анимации
    
    setAnimationDirection(prev => ({ ...prev, [idx]: 'right' }))
    setIsAnimating(prev => ({ ...prev, [idx]: true }))
    
    // Немедленно меняем изображение для лучшей синхронизации
    setCardImageIndexes(prev => {
      const copy = [...prev]
      copy[idx] = (copy[idx] - 1 + gallery.length) % gallery.length
      return copy
    })
    
    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(prev => ({ ...prev, [idx]: false }))
      setAnimationDirection(prev => ({ ...prev, [idx]: null }))
    }, 400) // Даем время для завершения анимации
  }
  
  const handleCardNext = (catIdx: number, itemIdx: number, gallery: string[] = []) => {
    const idx = getCardIndex(catIdx, itemIdx)
    if (isAnimating[idx]) return // Предотвращаем множественные анимации
    
    setAnimationDirection(prev => ({ ...prev, [idx]: 'left' }))
    setIsAnimating(prev => ({ ...prev, [idx]: true }))
    
    // Немедленно меняем изображение для лучшей синхронизации
    setCardImageIndexes(prev => {
      const copy = [...prev]
      copy[idx] = (copy[idx] + 1) % gallery.length
      return copy
    })
    
    // Сбрасываем состояние анимации после завершения
    setTimeout(() => {
      setIsAnimating(prev => ({ ...prev, [idx]: false }))
      setAnimationDirection(prev => ({ ...prev, [idx]: null }))
    }, 400) // Даем время для завершения анимации
  }
  
  const handleCardOpenModal = (gallery: string[] = [], imgIdx: number = 0) => {
    setCurrentProductGallery(gallery)
    setCurrentGalleryImageIndex(imgIdx)
    setIsGalleryModalOpen(true)
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

  const onTouchEnd = (cardIndex: number, catIdx: number, itemIdx: number, gallery: string[]) => {
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
      handleCardNext(catIdx, itemIdx, gallery)
      setHasUsedSwipe(true) // Отмечаем что свайп был использован
    } else if (isRightSwipe) {
      handleCardPrev(catIdx, itemIdx, gallery)
      setHasUsedSwipe(true) // Отмечаем что свайп был использован
    }
  }

  // Определение поддержки touch при монтировании компонента
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

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

  // Form submission handler for all forms
  useEffect(() => {
    const forms = document.querySelectorAll('form');
    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      
      try {
        // Отправляем через наш локальный API route
        const response = await fetch('/api/woodlyworld-inquiry', {
          method: 'POST',
          body: new FormData(form)
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('Form submitted successfully:', result.message);
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    forms.forEach(form => form.addEventListener('submit', handleSubmit));

    // Cleanup function to remove event listeners
    return () => {
      forms.forEach(form => form.removeEventListener('submit', handleSubmit));
    };
  }, []);

  return (
    <div className="bg-white text-gray-800">
      <Header />

      <main className="pt-[70px]">
        {/* Hero Section with Discount */}
        <section className="relative h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="woodyworld/miami-2.jpg"
              alt="Beautiful wooden world maps with LED lighting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex-grow flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-red-600 hover:bg-red-600/50 text-white border-red-400 backdrop-blur-md shadow-lg text-lg px-4 py-2">
                <Gift className="w-5 h-5 mr-2" />
                {t('discountAndFreeDesign')}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">Woodlyworld</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-200 max-w-2xl mx-auto mb-6 drop-shadow-lg font-medium">
                {t('woodenWorldMaps')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    const productsCard = document.getElementById('products');
                    if (productsCard) {
                      productsCard.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('showcatalogwithprice')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
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
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-24 bg-gray-50">
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
                      className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonialIndex ? "bg-orange-600 scale-125" : "bg-gray-300"
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
                        <Quote className="w-12 h-12 text-orange-600 mb-4" />
                        <p className="text-lg text-gray-700 mb-6 italic">
                          &ldquo;{testimonials[currentTestimonialIndex].text}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-orange-600" />
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
                        <div className="w-[300px] h-[300px] mx-auto flex items-center justify-center">
                          <Image
                            src={testimonials[currentTestimonialIndex].image || "/placeholder.svg"}
                            alt={testimonials[currentTestimonialIndex].name}
                            width={300}
                            height={300}
                            className="rounded-xl shadow-lg object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        

        {/* Unique Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('uniquenessAndDifferences')}
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto">
              {t('uniquenessSubtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {uniqueFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow bg-white">
                    <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section id="products" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('ourCatalog')}</h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(mapCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-orange-100"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {activeCategory && mapCategories[activeCategory] && mapCategories[activeCategory].items.map((item, i) => {
                const catIdx = Object.keys(mapCategories).indexOf(activeCategory)
                const idx = getCardIndex(catIdx, i)
                const gallery = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image]
                return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 h-full flex flex-col relative bg-white">
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-red-500 text-white font-bold px-3 py-1 text-sm shadow-lg">-40%</Badge>
                    </div>

                    {/* Gallery Indicator */}
                    {item.gallery && item.gallery.length > 1 && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-black/70 text-white font-bold px-3 py-1 text-sm shadow-lg backdrop-blur-md">
                          {item.gallery.length} {t('photos')}
                        </Badge>
                      </div>
                    )}

                    <div 
                      className="relative h-44 sm:h-56 lg:h-72 overflow-hidden cursor-pointer select-none"
                      onTouchStart={(e) => onTouchStart(e, idx)}
                      onTouchMove={(e) => onTouchMove(e, idx)}
                      onTouchEnd={() => onTouchEnd(idx, catIdx, i, gallery)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${idx}-${cardImageIndexes[idx]}`}
                          initial={{ 
                            x: animationDirection[idx] === 'left' ? 50 : animationDirection[idx] === 'right' ? -50 : 0,
                            opacity: 0,
                            scale: 0.95
                          }}
                          animate={{ 
                            x: currentSwipeOffset[idx] || 0,
                            opacity: 1,
                            scale: 1
                          }}
                          exit={{ 
                            x: animationDirection[idx] === 'left' ? -50 : animationDirection[idx] === 'right' ? 50 : 0,
                            opacity: 0,
                            scale: 0.95
                          }}
                          transition={{ 
                            duration: currentSwipeOffset[idx] ? 0 : 0.4, // Мгновенно во время свайпа
                            ease: [0.25, 0.46, 0.45, 0.94] // Более плавная кривая
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={gallery[cardImageIndexes[idx]] || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onClick={() => handleCardOpenModal(gallery, cardImageIndexes[idx])}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Image Indicators */}
                      {gallery.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                          {gallery.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardImageIndexes(prev => {
                                  const copy = [...prev];
                                  copy[idx] = dotIndex;
                                  return copy;
                                });
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                dotIndex === cardImageIndexes[idx]
                                  ? "bg-orange-500 scale-125"
                                  : "bg-white/60 hover:bg-white/80"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Gallery Navigation Arrows - скрыты на touch устройствах */}
                      {gallery.length > 1 && !isTouchDevice && (
                        <>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
                          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg pointer-events-auto"
                              onClick={e => { e.stopPropagation(); handleCardPrev(catIdx, i, gallery); }}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg pointer-events-auto"
                              onClick={e => { e.stopPropagation(); handleCardNext(catIdx, i, gallery); }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    <CardContent className="p-4 sm:p-6 flex flex-col flex-grow bg-white">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mb-3 text-xs sm:text-sm flex-grow">{item.description}</p>

                      {/* Price Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">{item.price}</span>
                          <span className="text-sm text-gray-500">{t('sum')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm md:text-lg text-gray-400 line-through">{item.oldPrice}</span>
                          <span className="text-xs sm:text-sm text-gray-400">{t('sum')}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm md:text-base py-2 md:py-3"
                        onClick={openLearnMoreModal}
                      >
                        {t('learnMore')} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
                )
              })}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                <MapPin className="w-6 h-6 mr-3" />
                {t('woodlyworldSubmitInquiryButton')}
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                {t('woodlyworldSubmitInquirySubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* How to Get Map Process - Compact Version */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{t('howToGetMap')}</h2>
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
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
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
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <advantage.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{advantage.title}</h3>
                    <p className="text-gray-600 mb-6">{advantage.description}</p>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm py-2"
                      onClick={openLearnMoreModal}
                    >
                      Узнать подробнее <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                <MapPin className="w-6 h-6 mr-3" />
                {t('woodlyworldOrderButton')}
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                {t('woodlyworldOrderSubtitle')}
              </p>
            </div>
          </div>
        </section>


        {/* Our Team Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('ourTeam')}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('ourTeamDesc1')}
                </p>
                <p className="text-lg text-gray-600">
                  {t('ourTeamDesc2')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-2 gap-4"
              >
                <Image
                  src="woodyworld/our_team.png"
                  alt={t('woodlyworldTeamAlt1')}
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="woodyworld/team-2.jpg"
                  alt={t('woodlyworldTeamAlt2')}
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="woodyworld/team-3.png"
                  alt={t('woodlyworldTeamAlt3')}
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="woodyworld/team-4.png"
                  alt={t('woodlyworldTeamAlt4')}
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              </motion.div>
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


        {/* Gallery Slider */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{t('mapsInInterior')}</h2>
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
                      className={`w-3 h-3 rounded-full transition-all ${Math.floor(currentGalleryIndex / 3) === index ? "bg-orange-600 scale-125" : "bg-gray-300"
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
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{t('frequentlyAskedQuestions')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('howToInstallMap')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('howToInstallMapAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('canControlLED')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('canControlLEDAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">{t('whatSizesAvailable')}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('whatSizesAvailableAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('howToCareForWoodenMap')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('howToCareForWoodenMapAnswer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openConsultationModal}
              >
                <MapPin className="w-6 h-6 mr-3" />
                {t('woodlyworldConsultationButton')}
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                {t('woodlyworldConsultationSubtitle')}
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
                        ? "border-orange-500 scale-110"
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

      {/* Meta Pixel для Woodlyworld */}
      <MetaPixelWoodlyworld />

      {/* Inquiry Modal */}
      <WoodlyworldInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={closeInquiryModal}
        variant={inquiryModalVariant}
      />

      <Footer />
    </div>
  )
}
