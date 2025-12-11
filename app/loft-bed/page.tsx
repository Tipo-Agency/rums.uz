"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ShieldCheck,
  Package,
  Palette,
  Heart,
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Timer,
  CheckCircle,
  User,
  CreditCard,
  Truck,
  Zap,
  Quote,
  Star,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoftBedInquiryModal } from "@/components/loft-bed-inquiry-modal"
import { MetaPixelLoftBed } from "@/components/meta-pixel-loft-bed"

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export default function LoftBedPage() {
  const { t } = useLanguage()
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

  const getTimeLeftInMonth = () => {
    const now = new Date()
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0)
    endOfMonth.setMilliseconds(-1)
    const diff = endOfMonth.getTime() - now.getTime()

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    return { days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeftInMonth())

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

  // Получаем все изображения из папки loft-bed
  const imageNumbers = [
    '01.02.15', '01.02.16', '01.02.18', '01.02.19',
    '01.04.12', '01.04.14', '01.04.29', '01.04.31', '01.04.32', '01.04.33',
    '01.04.46', '01.04.50', '01.04.54', '01.04.57', '01.05.01', '01.05.04',
    '01.05.09', '01.05.14', '01.05.18'
  ]
  const images = imageNumbers.map(num => `/loft-bed/photo_2025-11-29 ${num}.jpeg`)

  const features = [
    {
      icon: ShieldCheck,
      title: t('loftBedFeature1'),
      text: t('loftBedFeature1Desc'),
    },
    {
      icon: Package,
      title: t('loftBedFeature2'),
      text: t('loftBedFeature2Desc'),
    },
    {
      icon: Palette,
      title: t('loftBedFeature3'),
      text: t('loftBedFeature3Desc'),
    },
    {
      icon: Heart,
      title: t('loftBedFeature4'),
      text: t('loftBedFeature4Desc'),
    },
  ]

  const advantages = [
    {
      icon: CheckCircle,
      title: t('loftBedWeightCapacity'),
      description: t('loftBedAdvantage1Desc'),
    },
    {
      icon: Timer,
      title: t('loftBedAdvantage2Title'),
      description: t('loftBedAdvantage2Desc'),
    },
    {
      icon: User,
      title: t('loftBedAgeSuitable'),
      description: t('loftBedAdvantage3Desc'),
    },
    {
      icon: Truck,
      title: t('loftBedDelivery'),
      description: t('loftBedAdvantage4Desc'),
    },
    {
      icon: Zap,
      title: t('loftBedAdvantage5Title'),
      description: t('loftBedAdvantage5Desc'),
    },
    {
      icon: Palette,
      title: t('loftBedAdvantage6Title'),
      description: t('loftBedAdvantage6Desc'),
    },
  ]

  const orderProcess = [
    {
      icon: User,
      title: t('loftBedOrderStep1Title'),
      description: t('loftBedOrderStep1Desc'),
    },
    {
      icon: MessageCircle,
      title: t('loftBedOrderStep2Title'),
      description: t('loftBedOrderStep2Desc'),
    },
    {
      icon: Palette,
      title: t('loftBedOrderStep3Title'),
      description: t('loftBedOrderStep3Desc'),
    },
    {
      icon: Timer,
      title: t('loftBedOrderStep4Title'),
      description: t('loftBedOrderStep4Desc'),
    },
    {
      icon: Truck,
      title: t('loftBedOrderStep5Title'),
      description: t('loftBedOrderStep5Desc'),
    },
    {
      icon: ShieldCheck,
      title: t('loftBedOrderStep6Title'),
      description: t('loftBedOrderStep6Desc'),
    },
  ]

  const faqItems = [
    {
      question: t('loftBedFAQ1'),
      answer: t('loftBedFAQ1Answer'),
    },
    {
      question: t('loftBedFAQ2'),
      answer: t('loftBedFAQ2Answer'),
    },
    {
      question: t('loftBedFAQ3'),
      answer: t('loftBedFAQ3Answer'),
    },
    {
      question: t('loftBedFAQ4'),
      answer: t('loftBedFAQ4Answer'),
    },
  ]

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const testimonials = [
    {
      name: t('loftBedTestimonial1Name'),
      text: t('loftBedTestimonial1Text'),
      image: images[0] || "/placeholder.jpg",
    },
    {
      name: t('loftBedTestimonial2Name'),
      text: t('loftBedTestimonial2Text'),
      image: images[1] || "/placeholder.jpg",
    },
    {
      name: t('loftBedTestimonial3Name'),
      text: t('loftBedTestimonial3Text'),
      image: images[2] || "/placeholder.jpg",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openInquiryModal = () => {
    setIsInquiryModalOpen(true)
  }

  const openGalleryModal = () => {
    setIsGalleryModalOpen(true)
    setCurrentGalleryIndex(0)
  }

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false)
  }

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % images.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="bg-white text-gray-800" style={{ fontFamily: 'Montserrat, -apple-system, SF Pro Display, system-ui, sans-serif' }}>
      <MetaPixelLoftBed />
      <Header />
      
      {/* Floating Telegram Button */}
      <a
        href="https://t.me/manager_rums"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all duration-300"
        aria-label="Telegram"
      >
        <TelegramIcon className="w-6 h-6" />
      </a>

      <main className="pt-[70px]">
        {/* Hero Section with CTA */}
        <section className="relative h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={images[0] || "/placeholder.jpg"}
              alt={t('loftBedTitle') || "Кровать-чердак в стиле лофт"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex-grow flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-green-600 hover:bg-green-500/90 text-white border-green-400 backdrop-blur-md shadow-lg text-lg px-4 py-2">
                <Timer className="w-5 h-5 mr-2" />
                {t('loftBedCTATitle')}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">{t('loftBedHeroTitle')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 drop-shadow-lg font-medium">
                {t('loftBedHeroSubtitle')}
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
                    <div className="text-xs text-white/90 uppercase tracking-wider font-medium">{t(unit as 'days' | 'hours' | 'minutes' | 'seconds')}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={openInquiryModal}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('loftBedCTAButton')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with CTA */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('loftBedFeaturesTitle')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('loftBedFeaturesSubtitle')}</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, i) => (
                <motion.div
                  key={`loft-bed-feature-${i}`}
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

            {/* CTA after features */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                {t('loftBedCTAButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section with CTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('loftBedGalleryTitle')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('loftBedGallerySubtitle')}</p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto mb-16">
              <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={openGalleryModal}>
                <Image
                  src={images[currentImageIndex] || "/placeholder.jpg"}
                  alt={`${t('loftBedTitle') || 'Кровать-чердак'} - фото ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA after gallery */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                {t('loftBedCTAButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('loftBedAdvantagesTitle')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, i) => (
                <motion.div
                  key={`advantage-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow bg-white">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <advantage.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{advantage.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section with Photos */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('loftBedTestimonialsTitle')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('loftBedTestimonialsSubtitle')}</p>
            </motion.div>

            <div className="relative">
              <div className="flex justify-center items-center gap-4 mb-8">
                <Button
                  onClick={prevTestimonial}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-12 h-12 p-0 bg-white shadow-lg hover:shadow-xl"
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
                  className="rounded-full w-12 h-12 p-0 bg-white shadow-lg hover:shadow-xl"
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
                        <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
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
                          src={testimonials[currentTestimonialIndex].image || "/placeholder.jpg"}
                          alt={testimonials[currentTestimonialIndex].name}
                          width={400}
                          height={400}
                          className="rounded-xl shadow-lg w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Order Process */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('loftBedOrderProcessTitle')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('loftBedOrderProcessSubtitle')}</p>
            </motion.div>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {orderProcess.map((step, i) => (
                  <motion.div
                    key={`step-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow h-full border border-gray-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="text-3xl font-bold text-green-600 mb-1">{i + 1}</div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    {i < orderProcess.length - 1 && i % 3 === 2 && (
                      <div className="hidden lg:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-green-200" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA: Отправить размеры */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('loftBedSendDimensions')}
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section with CTA */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('loftBedFAQTitle')}</h2>
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4 mb-16">
              {faqItems.map((item, index) => (
                <motion.div
                  key={`loft-bed-faq-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-white rounded-lg px-6 border border-gray-200 shadow-md">
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-gray-900">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            {/* CTA after FAQ */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                {t('loftBedCTAButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-green-700 to-green-600 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('loftBedCTATitle')}</h2>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
                {t('loftBedCTASubtitle')}
              </p>
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('loftBedCTAButton')}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative max-w-6xl w-full h-full flex items-center"
            >
              <button
                onClick={closeGalleryModal}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all"
              >
                <ChevronLeft className="w-6 h-6 rotate-45" />
              </button>
              
              <Image
                src={images[currentGalleryIndex] || "/placeholder.jpg"}
                alt={`${t('loftBedTitle') || 'Кровать-чердак'} - фото ${currentGalleryIndex + 1}`}
                fill
                className="object-contain"
                loading="lazy"
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevGalleryImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextGalleryImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentGalleryIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentGalleryIndex ? "bg-white scale-125" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      
      <LoftBedInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  )
}
