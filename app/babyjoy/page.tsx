"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import {
  Baby,
  CheckCircle,
  ShieldCheck,
  Star,
  Heart,
  ArrowRight,
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
  Zap,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAmoForms } from "@/hooks/use-amo-forms"
import { BabyjoyInquiryModal } from "@/components/babyjoy-inquiry-modal"
import { MetaPixelBabyjoy } from "@/components/meta-pixel-babyjoy"


const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export default function BabyjoyPage() {
  const { t } = useLanguage()

  // Инициализируем AmoCRM
  useAmoForms({
    id: "1572674",
    hash: "ca9417663fe415ec439626c3b90bb6ff",
    scriptUrl: "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1752886975"
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


  const furnitureItems = [
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
      colorPrices: [
        { color: "Деревянная", price: "705 000 сум", originalPrice: "830 000 сум" },
        { color: "Белая", price: "940 000 сум", originalPrice: "1 107 000 сум" },
        { color: "Белая-серая", price: "948 000 сум", originalPrice: "1 116 000 сум" },
        { color: "Белая-деревянная", price: "905 000 сум", originalPrice: "1 065 000 сум" },
      ],
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
      colorPrices: [
        { color: "Деревянная", price: "1 285 000 сум", originalPrice: "1 512 000 сум" },
        { color: "Белая", price: "1 520 000 сум", originalPrice: "1 788 000 сум" },
        { color: "Белая-серая", price: "1 530 000 сум", originalPrice: "1 800 000 сум" },
        { color: "Белая-деревянная", price: "1 485 000 сум", originalPrice: "1 747 000 сум" },
      ],
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
      colorPrices: [
        { color: "Деревянная", price: "680 000 сум", originalPrice: "800 000 сум" },
        { color: "Белая", price: "890 000 сум", originalPrice: "1 047 000 сум" },
        { color: "Белая-серая", price: "895 000 сум", originalPrice: "1 053 000 сум" },
        { color: "Белая-деревянная", price: "850 000 сум", originalPrice: "1 000 000 сум" },
      ],
    },
    {
      name: t('childrenCart'),
      images: ["/cart-1.jpeg", "/cart-2.jpeg", "/cart-3.jpeg"],
      description: t('childrenCartDesc'),
      colorPrices: [
        { color: "Деревянная", price: "420 000 сум", originalPrice: "494 000 сум" },
        { color: "Белая", price: "580 000 сум", originalPrice: "682 000 сум" },
        { color: "Белая-серая", price: "585 000 сум", originalPrice: "688 000 сум" },
        { color: "Белая-деревянная", price: "545 000 сум", originalPrice: "641 000 сум" },
      ],
    },
    {
      name: t('bunkBed'),
      images: ["/bunk-bed-1.jpeg", "/bunk-bed-2.jpeg"],
      description: t('bunkBedDesc'),
      colorPrices: [
        { color: "Деревянная", price: "3 250 000 сум", originalPrice: "3 824 000 сум" },
        { color: "Белая", price: "4 180 000 сум", originalPrice: "4 918 000 сум" },
        { color: "Белая-серая", price: "4 200 000 сум", originalPrice: "4 941 000 сум" },
        { color: "Белая-деревянная", price: "3 980 000 сум", originalPrice: "4 682 000 сум" },
      ],
    },
  ]

  const features = [
    {
      icon: CheckCircle,
      title: t('ecoMaterials'),
      text: t('ecoMaterialsDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('quickAssembly'),
      text: t('quickAssemblyDesc'),
    },
    {
      icon: Star,
      title: t('developmentalDesign'),
      text: t('developmentalDesignDesc'),
    },
    {
      icon: Heart,
      title: t('safety'),
      text: t('safetyDesc'),
    },
  ]

  const uniqueFeatures = [
    {
      icon: Baby,
      title: t('montessoriMethod'),
      description: t('montessoriMethodDesc'),
    },
    {
      icon: Zap,
      title: t('growingFurniture'),
      description: t('growingFurnitureDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('safetyFirst'),
      description: t('safetyFirstDesc'),
    },
  ]

  const advantages = [
    {
      icon: Heart,
      title: t('developmentIndependence'),
      description: t('developmentIndependenceDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('qualityGuarantee3Years'),
      description: t('qualityGuarantee3YearsDesc'),
    },
    {
      icon: Timer,
      title: t('fastManufacturing5_10Days'),
      description: t('fastManufacturing5_10DaysDesc'),
    },
    {
      icon: Package,
      title: t('simpleAssembly'),
      description: t('simpleAssemblyDesc'),
    },
    {
      icon: Headphones,
      title: t('pedagogConsultation'),
      description: t('pedagogConsultationDesc'),
    },
    {
      icon: Palette,
      title: t('individualSizes'),
      description: t('individualSizesDesc'),
    },
  ]

  const testimonials = [
    {
      name: t('testimonial1Name'),
      text: t('testimonial1Text'),
      image: "/tower-1.jpeg",
    },
    {
      name: t('testimonial2Name'),
      text: t('testimonial2Text'),
      image: "/desk-chair-1.jpeg",
    },
    {
      name: t('testimonial3Name'),
      text: t('testimonial3Text'),
      image: "/pikler-1.jpeg",
    },
    {
      name: t('testimonial4Name'),
      text: t('testimonial4Text'),
      image: "/cart-1.jpeg",
    },
    {
      name: t('testimonial5Name'),
      text: t('testimonial5Text'),
      image: "/bunk-bed-1.jpeg",
    },
  ]

  const orderProcess = [
    {
      icon: User,
      title: t('leaveRequest'),
      description: t('leaveRequestDesc'),
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
      href: "https://www.instagram.com/babyjoy.uz",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      description: t('telegramDesc'),
      color: "from-blue-400 to-blue-500",
      href: "https://t.me/babyjoy_uz",
    },
  ]

  const galleryImages = [
    "/tower-1.jpeg",
    "/desk-chair-1.jpeg",
    "/pikler-1.jpeg",
    "/cart-1.jpeg",
    "/bunk-bed-1.jpeg",
    "/tower-3.jpeg",
    "/desk-chair-3.jpeg",
    "/pikler-3.jpeg",
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

  return (
    <div className="bg-white text-gray-800">
      <Header />

      <main className="pt-[70px]">
        {/* Hero Section with Discount */}
        <section className="relative h-[calc(100vh-70px)] flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/tower-1.jpeg"
              alt="Children's Montessori furniture in beautiful interior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex-grow flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-red-600 hover:bg-red-500/50 text-white border-red-400 backdrop-blur-md shadow-lg text-lg px-4 py-2">
                <Gift className="w-5 h-5 mr-2" />
                {t('discountAndConsultation')}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">Babyjoy</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto mb-8 drop-shadow-lg font-medium">
                {t('montessoriFurnitureDescription')}
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
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
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
        <section className="py-24 bg-gray-50">
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
                  <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        {/* <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Наша команда</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Мы создаём не просто мебель — мы создаём пространство для гармоничного развития детей по принципам
                  педагогики Марии Монтессори.
                </p>
                <p className="text-lg text-gray-600">
                  Наша команда включает педагогов Монтессори, детских психологов и опытных мастеров. Мы знаем, как важно
                  окружить ребёнка правильной средой, которая будет способствовать его естественному развитию и
                  формированию самостоятельности.
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
                  src="/tower-2.jpeg"
                  alt="Ребенок использует башню помощника"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="/desk-chair-2.jpeg"
                  alt="Растущий стол-стул в интерьере"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="/pikler-2.jpeg"
                  alt="Ребенок играет на треугольнике Пиклера"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="/cart-2.jpeg"
                  alt="Детская тележка с игрушками"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Unique Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('ourUniquenessTitle')}
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto">
              {t('ourUniquenessSubtitle')}
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
                    <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

        {/* Product Catalog */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('ourCatalog')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {furnitureItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 h-full flex flex-col bg-white">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow bg-white">
                      <h3 className="text-2xl font-bold mb-2 text-purple-900">{item.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm flex-grow">{item.description}</p>
                      
                      {/* Отображение всех цен и цветов */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Цвета и цены:</h4>
                        <div className="space-y-2">
                          {item.colorPrices.map((option, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-gray-700 text-sm">✔️ {option.color}</span>
                              <div className="text-right">
                                <div className="font-semibold text-purple-900 text-sm">{option.price}</div>
                                <div className="text-xs text-gray-500 line-through">(вместо {option.originalPrice})</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-2 bg-purple-50 rounded text-center">
                          <p className="text-xs text-purple-800 font-medium">💰 Экономия до 40%!</p>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold"
                        onClick={openLearnMoreModal}
                      >
                        {t('orderWithDiscount')} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Furniture Process - Compact Version */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('howToGetFurniture')}</h2>
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
                  <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openInquiryModal}
              >
                <Baby className="w-6 h-6 mr-3" />
                Заказать детскую мебель
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                Создайте пространство для гармоничного развития ребенка
              </p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('customerTestimonials')}
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
                        index === currentTestimonialIndex ? "bg-purple-600 scale-125" : "bg-gray-300"
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
                        <Quote className="w-12 h-12 text-purple-600 mb-4" />
                        <p className="text-lg text-gray-700 mb-6 italic">
                          &ldquo;{testimonials[currentTestimonialIndex].text}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-purple-600" />
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
              {t('joinParentsCommunity')}
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
                className="bg-purple-600 hover:bg-purple-700 px-12 py-4 text-lg text-white"
                onClick={openConsultationModal}
              >
                {t('leaveConsultationRequest')}
              </Button>
            </div>
          </div>
        </section> */}

        {/* Gallery Slider */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('babyjoyInInterior')}</h2>
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
                        Math.floor(currentGalleryIndex / 3) === index ? "bg-purple-600 scale-125" : "bg-gray-300"
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{t('faq')}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('faqBabyjoyMaterials')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('faqBabyjoyMaterialsAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('faqBabyjoyAssembly')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('faqBabyjoyAssemblyAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('faqBabyjoyAge')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('faqBabyjoyAgeAnswer')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  {t('faqMontessoriMethod')}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {t('faqMontessoriMethodAnswer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={openConsultationModal}
              >
                <Baby className="w-6 h-6 mr-3" />
                Получить консультацию
              </Button>
              <p className="text-gray-600 mt-4 text-lg">
                Остались вопросы? Наши специалисты готовы помочь!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Meta Pixel для Babyjoy */}
      <MetaPixelBabyjoy />

      {/* Inquiry Modal */}
      <BabyjoyInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={closeInquiryModal}
        variant={inquiryModalVariant}
      />

      <Footer />
    </div>
  )
}
