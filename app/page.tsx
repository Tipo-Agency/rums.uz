"use client"

import { useState, useEffect } from "react"
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


interface MapData {
  images: string[];
  description: string;
}

interface Maps {
  [key: string]: MapData;
}

export default function PalkarMePage() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 })
  const [activeMap, setActiveMap] = useState("3D Карты")
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
      name: "Майами",
      images: ["/cocktail-1.jpg", "/miami-2.jpg"],
      description: "Реалистичный ствол и листья премиум-качества.",
      linkHref: "/ecopalma",
    },
    {
      name: "Пляжный коктейль",
      images: ["/miami-1.jpg", "/cocktail-3.png", "/cocktail-2.jpg"],
      description: "Пышная пальма с густой кроной, создающая атмосферу тропического оазиса.",
      linkHref: "/ecopalma",
    },
    {
      name: "Экзотик",
      images: ["/exotic-palm.png", "/style-interior.jpg"],
      description: "Уникальная веерная пальма с необычной формой листьев для ценителей экзотики.",
      linkHref: "/ecopalma",
    },
    {
      name: "Баунти",
      images: ["/bounty-1.png", "/bounty-2.png", "/bounty-3.png", "/bounty-4.png"],
      description: "Элегантная пальма средних размеров, которая гармонично впишется в любой интерьер.",
      linkHref: "/ecopalma",
    },
  ]

  const furniture = [
    {
      name: "Башня помощника",
      images: [
        "/tower-1.jpeg",
        "/tower-2.jpeg",
        "/tower-3.jpeg",
        "/tower-4.jpeg",
        "/tower-5.jpeg",
        "/tower-6.jpeg",
        "/tower-7.jpeg",
      ],
      description: "Помогает ребёнку безопасно участвовать в домашних делах на уровне взрослых.",
      linkHref: "/babyjoy",
    },
    {
      name: "Растущий стол-стул",
      images: [
        "/desk-chair-1.jpeg",
        "/desk-chair-2.jpeg",
        "/desk-chair-3.jpeg",
        "/desk-chair-4.jpeg",
        "/desk-chair-5.jpeg",
        "/desk-chair-6.jpeg",
      ],
      description: "Адаптируется под рост ребёнка, обеспечивая комфорт на долгие годы.",
      linkHref: "/babyjoy",
    },
    {
      name: "Треугольник Пиклера",
      images: [
        "/pikler-1.jpeg",
        "/pikler-2.jpeg",
        "/pikler-3.jpeg",
        "/pikler-4.jpeg",
        "/pikler-5.jpeg",
        "/pikler-6.jpeg",
        "/pikler-7.jpeg",
      ],
      description: "Развивает моторику и координацию, стимулируя физическую активность.",
      linkHref: "/babyjoy",
    },
    {
      name: "Детская тележка",
      images: ["/cart-1.jpeg", "/cart-2.jpeg", "/cart-3.jpeg"],
      description: "Идеально подходит для хранения игрушек и развития навыков самостоятельности.",
      linkHref: "/babyjoy",
    },
    {
      name: "Двухэтажная кроватка",
      images: ["/bunk-bed-1.jpeg", "/bunk-bed-2.jpeg"],
      description: "Функциональная двухэтажная кроватка с встроенными ящиками и рабочим местом.",
      linkHref: "/babyjoy",
    },
  ]

  const maps: Maps = {
    "3D Карты": {
      images: ["/map-3d-1.jpeg", "/map-3d-2.jpeg", "/map-3d-3.jpeg"],
      description: "Объемные карты с потрясающей детализацией, создающие эффект присутствия.",
    },
    "Фото-Карты": {
      images: ["/map-photo-1.png", "/map-photo-2.png", "/map-flags.jpeg"],
      description: "Персонализированные карты, на которых можно размещать свои фотографии из путешествий.",
    },
    "2D Карты": {
      images: ["/map-2d-1.jpeg", "/map-package.png"],
      description: "Классические плоские карты, идеально вписывающиеся в любой современный интерьер.",
    },
    "LED Карты": {
      images: ["/map-led-1.jpeg", "/map-led-2.jpeg"],
      description: "Карты с LED-подсветкой, создающие уютную и футуристичную атмосферу в комнате.",
    },
  }

  const [currentMapImageIndex, setCurrentMapImageIndex] = useState(0)

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

  useEffect(() => {
    setCurrentMapImageIndex(0)
  }, [activeMap])

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
      title: "Искусственные пальмы",
      description:
        "Мы производим высококачественные искусственные пальмы, которые станут отличным дополнением к вашему интерьеру.",
    },
    {
      icon: Map,
      title: "Деревянные карты",
      description:
        "Наши деревянные карты изготовлены из натуральных материалов и отличаются высоким качеством исполнения.",
    },
    {
      icon: Baby,
      title: "Корпусная мебель",
      description:
        "Мы предлагаем широкий выбор корпусной мебели, изготовленной с использованием современных технологий и качественных материалов.",
    },
    {
      icon: Palette,
      title: "Индивидуальный дизайн",
      description:
        "Разрабатываем уникальный дизайн мебели и декоративных изделий, соответствующий вашим пожеланиям и стилю.",
    },
    {
      icon: Sparkles,
      title: "Услуги по персонализации",
      description:
        "Предлагаем услуги по персонализации мебели и декоративных изделий, чтобы каждый заказ был уникальным.",
    },
    {
      icon: Wrench,
      title: "Поставка материалов",
      description:
        "Осуществляем поставку качественных материалов для самостоятельного изготовления декоративных изделий и мебели.",
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
        mapType={activeMap}
        mapDescription={maps[activeMap].description}
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
                Ограниченное предложение
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
                <span className="text-white drop-shadow-lg">Уютные предметы</span>{" "}
                <span className="block bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                  интерьера
                </span>{" "}
                <span className="text-white drop-shadow-lg text-4xl md:text-5xl">со скидкой</span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium">
                Создаём уют для вашего дома. Успейте купить по выгодной цене!
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
                <a href="tel:+998950824446">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Связаться с менеджером
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
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Ecopalma — Уникальные пальмы</h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Реалистичные искусственные пальмы по индивидуальному заказу, которые преобразят любое пространство.
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Woodlyworld — Карты мира</h2>
              <p className="text-xl text-gray-300 mb-8 min-h-[6rem]">{maps[activeMap].description}</p>
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Оставить заявку
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  <Link href="/woodlyworld">
                    Смотреть все карты <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative h-96 lg:h-auto lg:aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeMap}-${currentMapImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={maps[activeMap].images[currentMapImageIndex] || "/placeholder.svg"}
                      alt={activeMap}
                      fill
                      className="rounded-2xl shadow-2xl object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Image indicators */}
                {maps[activeMap].images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {maps[activeMap].images.map((_, index) => (
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
                Babyjoy — Мебель для детей
              </h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Качественная детская корпусная мебель, которую можно собрать за 5 минут.
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
                Показано {currentFurnitureIndex + 1}-{Math.min(currentFurnitureIndex + itemsPerPage, furniture.length)}{" "}
                из {furniture.length} товаров
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
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наши Услуги</h2>
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
                Полный цикл производства декоративных изделий от дизайна до поставки материалов.
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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Варианты Доставки</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Package,
                  title: "Доставка по Ташкенту",
                  desc: "Осуществляется сразу после изготовления мебели. Бесплатная доставка и профессиональная сборка.",
                },
                {
                  icon: Truck,
                  title: "Доставка по Узбекистану",
                  desc: "Возможна на следующий день после готовности заказа. Доставляем в любой город республики.",
                },
                {
                  icon: Globe,
                  title: "Доставка по всему миру",
                  desc: "Также доступна международная доставка. Надежная упаковка и быстрая отправка.",
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
