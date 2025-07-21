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
  // Инициализируем AmoCRM
  useAmoForms({
    id: "1572670",
    hash: "e2904c885a56624d2292fd178d837c58",
    scriptUrl: "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1752873171"
  })

  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 14, minutes: 32, seconds: 45 })
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

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

  const palms = [
    {
      name: "Майами",
      images: ["/ecopalma/mayami/1.jpg", "/ecopalma/mayami/2.jpg", "/ecopalma/mayami/3.jpg", "/ecopalma/mayami/4.jpg", "/ecopalma/mayami/5.jpg"],
      description: "Реалистичный ствол и листья премиум-качества.",
      price: "от $850",
      linkHref: "/ecopalma",
    },
    {
      name: "Пляжный коктейль",
      images: ["/ecopalma/coctail/1.jpg", "/ecopalma/coctail/2.jpg", "/ecopalma/coctail/3.jpg", "/ecopalma/coctail/4.jpg", "/ecopalma/coctail/5.jpg"],
      description: "Пышная пальма с густой кроной, создающая атмосферу тропического оазиса.",
      price: "от $850",
      linkHref: "/ecopalma",
    },
    {
      name: "Экзотик",
      images: ["/ecopalma/exotic/1.jpg", "/ecopalma/exotic/2.jpg", "/ecopalma/exotic/3.jpg", "/ecopalma/exotic/4.jpg", "/ecopalma/exotic/5.jpg", "/ecopalma/exotic/6.jpg", "/ecopalma/exotic/7.jpg", "/ecopalma/exotic/8.jpg"],
      description: "Уникальная веерная пальма с необычной формой листьев для ценителей экзотики.",
      price: "от $850",
      linkHref: "/ecopalma",
    },
    {
      name: "Баунти",
      images: ["/ecopalma/bounty/1.jpg", "/ecopalma/bounty/2.jpg", "/ecopalma/bounty/3.jpg", "/ecopalma/bounty/4.jpg", "/ecopalma/bounty/5.jpg"],
      description: "Элегантная пальма средних размеров, которая гармонично впишется в любой интерьер.",
      price: "от $780",
      linkHref: "/ecopalma",
    },
  ]

  const features = [
    { icon: CheckCircle, title: "Гиперреалистичность", text: "Каждый лист и изгиб ствола неотличимы от настоящих." },
    { icon: ShieldCheck, title: "Гипоаллергенно", text: "Безопасные материалы, не вызывающие аллергических реакций." },
    { icon: Sun, title: "Не выгорают", text: "Специальное покрытие защищает от УФ-лучей и потери цвета." },
    {
      icon: Wind,
      title: "Простота в уходе",
      text: "Не требуют полива, света и специальных условий. Только протереть пыль.",
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
      title: "Устойчивость к погодным условиям",
      description: "Выдерживают любые климатические условия",
    },
    {
      icon: ShieldCheck,
      title: "Гарантия качества 3 года",
      description: "Полная гарантия на все изделия",
    },
    {
      icon: Timer,
      title: "Быстрое изготовление 7-14 дней",
      description: "Оперативное выполнение заказов",
    },
    {
      icon: CheckCircle,
      title: "Профессиональная установка",
      description: "Квалифицированные мастера",
    },
    {
      icon: User,
      title: "Индивидуальный подбор размера",
      description: "Подбираем идеальный размер для вашего пространства",
    },
    {
      icon: Leaf,
      title: "Экологически безопасные материалы",
      description: "Только качественные и безвредные материалы",
    },
  ]

  const orderProcess = [
    {
      icon: User,
      title: "Оставить заявку",
      description:
        "На сайте выберите пальму, которая вам понравится, и оставьте заявку. Наш менеджер свяжется с вами для обсуждения всех деталей вашего заказа. В случае возникновения вопросов мы с удовольствием поможем их решить.",
    },
    {
      icon: CreditCard,
      title: "Предоплата и изготовление",
      description:
        "После выбора желаемой пальмы, внесите предоплату в размере 50%, и мы изготовим вашу искусственную пальму премиум-класса в течение 3-7 дней.",
    },
    {
      icon: Truck,
      title: "Бесплатная доставка",
      description: "Абсолютно бесплатная доставка по всему Узбекистану. Также имеется доставка по всему миру.",
    },
  ]

  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      description: "Смотрите наши видео о продукции и процессе создания",
      color: "from-red-500 to-red-600",
      href: "#",
    },
    {
      name: "Facebook",
      icon: Facebook,
      description: "Новости компании и общение с клиентами",
      color: "from-blue-600 to-blue-700",
      href: "#",
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: "Красивые фото наших изделий и закулисье",
      color: "from-pink-500 to-purple-600",
      href: "https://www.instagram.com/ecopalma.uz/",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      description: "Быстрая связь и эксклюзивные предложения",
      color: "from-blue-400 to-blue-500",
      href: "https://t.me/ecopalmatashkent",
    },
  ]

  const galleryImages = [
    "/cocktail-1.jpg",
    "/miami-2.jpg",
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
              <Badge className="mb-6 bg-red-500/90 text-white border-red-400 backdrop-blur-md shadow-lg text-lg px-4 py-2">
                <Gift className="w-5 h-5 mr-2" />
                СКИДКА 30% + Бесплатный дизайн-проект
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">Ecopalma</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-200 max-w-2xl mx-auto mb-8 drop-shadow-lg font-medium">
                Искусство создания вечной природы в вашем интерьере со скидкой до конца июля!
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
                    <div className="text-xs text-white/90 uppercase tracking-wider font-medium">{unit}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.clickAmoButton) {
                      window.clickAmoButton();
                    }
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Заказать со скидкой
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Наш Каталог</h2>
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
                          {palm.images.length} фото
                        </Badge>
                      </div>
                    )}
                    <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => palm.images && openGalleryModal(palm.images)}>
                      <Image
                        src={palm.images[0] || "/placeholder.svg"}
                        alt={palm.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Gallery Navigation Arrows */}
                      {palm.images && palm.images.length > 1 && (
                        <>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg"
                              onClick={e => { e.stopPropagation(); }}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-lg"
                              onClick={e => { e.stopPropagation(); }}
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
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.clickAmoButton) {
                            window.clickAmoButton();
                          }
                        }}
                      >
                        Узнать подробнее <ArrowRight className="w-4 h-4 ml-2" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Как получить пальму?</h2>
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
              Дополнительные преимущества
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
                    <p className="text-gray-600">{advantage.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Фотоотзывы наших клиентов
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Следите за нами</h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
              Присоединяйтесь к нашему сообществу в социальных сетях
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
        <section className="py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Получить консультацию</h2>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-12 py-4 text-lg text-white"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.clickAmoButton) {
                    window.clickAmoButton();
                  }
                }}
              >
                Оставить заявку на консультацию
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Slider */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Пальмы в интерьере</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  Можно ли использовать пальмы на улице?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Да, некоторые наши модели специально обработаны для использования на открытом воздухе. Они устойчивы к
                  УФ-излучению и погодным условиям. Уточняйте при заказе.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  Какие у вас сроки изготовления?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Срок изготовления зависит от сложности и размера заказа, в среднем от 5 до 14 рабочих дней.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                  Как ухаживать за пальмами?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Уход минимален. Достаточно периодически протирать листья влажной тряпкой от пыли. Никакого полива или
                  удобрений не требуется.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
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
      <Footer />
    </div>
  )
}
