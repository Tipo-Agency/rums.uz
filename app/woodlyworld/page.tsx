"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"


interface MapItem {
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  description: string;
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
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 14, minutes: 32, seconds: 45 })
  const [activeCategory, setActiveCategory] = useState("3D Карты")
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

  const mapCategories: MapCategories = {
    "3D Карты": {
      items: [
        {
          name: "Карта мира 3D Классик",
          image: "/map-3d-1.jpeg",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Объемная деревянная карта мира с естественной текстурой дерева.",
        },
        {
          name: "Карта мира 3D Премиум",
          image: "/map-3d-2.jpeg",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Премиальная версия с детализированными границами стран.",
        },
        {
          name: "Карта мира 3D Мини",
          image: "/map-3d-3.jpeg",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Компактная версия для рабочего стола или небольших помещений.",
        },
      ],
    },
    "LED Карты": {
      items: [
        {
          name: "LED Карта Северное сияние",
          image: "/map-led-1.jpeg",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Карта с LED-подсветкой в стиле северного сияния.",
        },
        {
          name: "LED Карта Золотой час",
          image: "/map-led-2.jpeg",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Теплая золотистая подсветка создает уютную атмосферу.",
        },
      ],
    },
    "Фото-Карты": {
      items: [
        {
          name: "Фото-карта Путешественника",
          image: "/map-photo-1.png",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Карта с держателями для фотографий из ваших путешествий.",
        },
        {
          name: "Фото-карта Семейная",
          image: "/map-photo-2.png",
          price: "от 1,536,000",
          oldPrice: "2,559,000",
          description: "Семейная карта воспоминаний с местами особых моментов.",
        },
      ],
    },
    "2D Карты": {
      items: [
        {
          name: "2D Карта Классик",
          image: "/map-2d-1.jpeg",
          price: "от 1,181,000",
          oldPrice: "1,969,000",
          description: "Классические плоские карты, идеально вписывающиеся в любой современный интерьер.",
        },
      ],
    },
    Принадлежности: {
      items: [
        {
          name: "Набор флажков стран",
          image: "/map-flags.jpeg",
          price: "от 450,000",
          oldPrice: "750,000",
          description: "Набор из 100 флажков для отметки посещенных стран.",
        },
        {
          name: "Подарочная упаковка",
          image: "/map-package.png",
          price: "от 250,000",
          oldPrice: "420,000",
          description: "Элегантная подарочная упаковка для карт.",
        },
      ],
    },
  }

  const features = [
    {
      icon: CheckCircle,
      title: "Натуральное дерево",
      text: "Используем только качественную березовую фанеру и дуб.",
    },
    {
      icon: ShieldCheck,
      title: "Экологичность",
      text: "Безопасные материалы и покрытия на водной основе.",
    },
    {
      icon: Zap,
      title: "LED-технологии",
      text: "Современная LED-подсветка с долгим сроком службы.",
    },
    {
      icon: Heart,
      title: "Ручная работа",
      text: "Каждая карта изготавливается вручную с любовью к деталям.",
    },
  ]

  const uniqueFeatures = [
    {
      icon: Globe,
      title: "2D vs 3D технология",
      description:
        "Уникальная слоистая конструкция создает объемный 3D эффект. Толщина карты достигает до 15 мм, что придает невероятную глубину и реалистичность изображению.",
    },
    {
      icon: Lightbulb,
      title: "LED подсветка с управлением",
      description:
        "Встроенная LED система с регулировкой яркости и пультом дистанционного управления. Создайте идеальную атмосферу одним нажатием кнопки.",
    },
    {
      icon: Star,
      title: "Премиальные материалы",
      description:
        "Используем только качественный файн-серый клен и буковый шпон. Натуральная древесина высшего сорта гарантирует долговечность и элегантный внешний вид.",
    },
  ]

  const advantages = [
    {
      icon: Zap,
      title: "Энергоэффективные LED диоды",
      description: "Современные LED диоды с низким энергопотреблением",
    },
    {
      icon: ShieldCheck,
      title: "Гарантия качества 2 года",
      description: "Полная гарантия на все изделия и LED-подсветку",
    },
    {
      icon: Timer,
      title: "Быстрое изготовление 3-7 дней",
      description: "Оперативное выполнение заказов любой сложности",
    },
    {
      icon: Package,
      title: "Безопасная упаковка",
      description: "Надежная упаковка для безопасной доставки",
    },
    {
      icon: Headphones,
      title: "Персональная консультация",
      description: "Индивидуальный подход к каждому клиенту",
    },
    {
      icon: Palette,
      title: "Индивидуальный дизайн",
      description: "Создаем уникальные карты по вашим пожеланиям",
    },
  ]

  const testimonials = [
    {
      name: "Михаил Л.",
      text: "Отлично смотрится на офисной стене, идеально вписывающейся в пространство. Качественно и хорошо упаковано!",
      image: "/map-3d-1.jpeg",
    },
    {
      name: "Шезрод А.",
      text: "Качественная работа, сотрудники вежливые и понимают с двух слов. Сделали за 3 дня и доставили бесплатно.",
      image: "/map-led-1.jpeg",
    },
    {
      name: "Мафтуна",
      text: "Это такой красивый и действительно качественный продукт! Очень рекомендую ваш товар!!",
      image: "/map-photo-1.png",
    },
    {
      name: "Laylo",
      text: "Все супер! Карта выглядит потрясающе, LED подсветка создает невероятную атмосферу в комнате.",
      image: "/map-led-2.jpeg",
    },
  ]

  const orderProcess = [
    {
      icon: User,
      title: "Оставить заявку",
      description:
        "На сайте, выберите карту, которая вам понравится, и оставьте заявку. Наш менеджер свяжется с вами для обсуждения всех деталей вашего заказа. В случае возникновения вопросов мы с удовольствием поможем их решить.",
    },
    {
      icon: CreditCard,
      title: "Предоплата и изготовление",
      description:
        "После выбора желаемой карты, внесите предоплату в размере 50%, и мы изготовим вашу карту премиум-класса в течение 3-7 дней.",
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
      href: "https://www.instagram.com/woodlyworld.uz/",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      description: "Быстрая связь и эксклюзивные предложения",
      color: "from-blue-400 to-blue-500",
      href: "https://t.me/woodlyworld",
    },
  ]

  const galleryImages = [
    "/map-3d-1.jpeg",
    "/map-led-1.jpeg",
    "/map-photo-1.png",
    "/map-3d-2.jpeg",
    "/map-led-2.jpeg",
    "/map-photo-2.png",
    "/map-flags.jpeg",
    "/map-package.png",
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
              src="/miami-2.jpg"
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
              <Badge className="mb-6 bg-red-500/90 text-white border-red-400 backdrop-blur-md shadow-lg text-lg px-4 py-2">
                <Gift className="w-5 h-5 mr-2" />
                СКИДКА 30% + Бесплатный дизайн-проект
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">Woodlyworld</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-200 max-w-2xl mx-auto mb-8 drop-shadow-lg font-medium">
                Деревянные карты мира, которые превращают стены в произведения искусства со скидкой до конца июля!
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
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    const amoButton = document.getElementById('amoforms_action_btn');
                    if (amoButton) {
                      amoButton.click();
                    }
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Заказать со скидкой
                </Button>
                <div id="amocrm_btn"></div>
                <Script
                  id="amoforms_script_1572666"
                  src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?1752885451"
                  async
                  strategy="afterInteractive"
                />
                <Script
                  id="amoforms_script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"1572666",hash:"7e3787568500d57ca5f700f4498c35b3",locale:"ru"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");`
                  }}
                />
                <Script
                  id="move_button"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      function moveButton() {
                        const btn = document.getElementById('amoforms_action_btn');
                        const target = document.getElementById('amocrm_btn');
                        if (btn && target) {
                          target.appendChild(btn);
                          // Скрываем кнопку
                          btn.style.display = 'none';
                        } else {
                          setTimeout(moveButton, 500);
                        }
                      }
                      setTimeout(moveButton, 1000);
                    `
                  }}
                />

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

        {/* Our Team Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Наша команда</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Мы создаём больше, чем просто настенные карты — мы создаём атмосферу, эмоции и истории, которые
                  становятся частью интерьера.
                </p>
                <p className="text-lg text-gray-600">
                  Наша команда объединяет дизайнеров, мастеров и людей, влюблённых в географию, эстетику и уютные
                  пространства. Мы внимательно подходим к каждому заказу — от подбора стиля и размера до точности
                  деталей на карте. Всё, что мы делаем — делаем с душой и вниманием к мелочам.
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
                  src="/team-1.png"
                  alt="Клиент с фото-картой мира"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="/team-2.jpg"
                  alt="Команда Woodlyworld с упаковкой"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="/team-3.png"
                  alt="Сотрудник с заказом"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <Image
                  src="/team-4.png"
                  alt="Процесс размещения фотографий на карте"
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Unique Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Наша уникальность и отличия
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto">
              Наши карты мира — это не просто декор, а произведения искусства с уникальными технологиями и премиальными
              материалами
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
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Наш Каталог</h2>

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mapCategories[activeCategory].items.map((item, i) => (
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

                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow bg-white">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm flex-grow">{item.description}</p>

                      {/* Price Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-orange-600">{item.price}</span>
                          <span className="text-sm text-gray-500">сум</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg text-gray-400 line-through">{item.oldPrice}</span>
                          <span className="text-sm text-gray-400">сум</span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => {
                          const amoButton = document.getElementById('amoforms_action_btn');
                          if (amoButton) {
                            amoButton.click();
                          }
                        }}
                      >
                        Заказать <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Map Process - Compact Version */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Как получить карту?</h2>
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
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Получить консультацию</h2>
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 px-12 py-4 text-lg"
                onClick={() => {
                  const amoButton = document.getElementById('amoforms_action_btn');
                  if (amoButton) {
                    amoButton.click();
                  }
                }}
              >
                Получить консультацию
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Slider */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Карты в интерьере</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  Как устанавливается карта на стену?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Каждая карта поставляется с подробной инструкцией и всеми необходимыми крепежными элементами.
                  Установка занимает около 30 минут и не требует специальных навыков.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  Можно ли управлять LED-подсветкой?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Да, LED-карты поставляются с пультом управления и мобильным приложением для настройки цвета, яркости и
                  режимов подсветки.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">Какие размеры карт доступны?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Мы предлагаем карты различных размеров: от компактных 60x40 см до больших 200x120 см. Также возможно
                  изготовление карт по индивидуальным размерам.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  Как ухаживать за деревянной картой?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Карты покрыты защитным лаком и не требуют особого ухода. Достаточно периодически протирать сухой
                  тряпкой от пыли. Избегайте попадания прямых солнечных лучей и влаги.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
