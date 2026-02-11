"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePhoneValidation } from "@/hooks/use-phone-validation"
import { useMetaPixel } from "@/hooks/use-meta-pixel"
import { useLanguage } from "@/lib/language-context"

interface WoodlyworldQuizModalProps {
  isOpen: boolean
  onClose: () => void
}

type DestinationOption = "home" | "gift" | "office" | "school"
type WallWidthOption = "100" | "200" | "300" | "400" | "500plus" | "advice"
type CityOption = "tashkent" | "samarkand" | "andijan" | "fergana" | "bukhara" | "khorezm" | "other"

export function WoodlyworldQuizModal({ isOpen, onClose }: WoodlyworldQuizModalProps) {
  const { language } = useLanguage()
  const isUz = language === "uz"

  const [step, setStep] = useState(1)
  const [destination, setDestination] = useState<DestinationOption | null>(null)
  const [wallWidth, setWallWidth] = useState<WallWidthOption | null>(null)
  const [values, setValues] = useState<string[]>([])
  const [city, setCity] = useState<CityOption | null>(null)
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { phoneError, handlePhoneChange, isPhoneValid } = usePhoneValidation()
  const { trackLead, trackCustomEvent, trackModalOpen } = useMetaPixel()
  const trackModalOpenRef = useRef(trackModalOpen)

  const valueOptions = isUz
    ? [
        "Mamlakatlarni belgilash imkoniyati",
        "Tabiiy yog‘ochdan tayyorlangan",
        "Gipoallergen materiallar",
        "Geografiyani o‘rganish imkoniyati",
        "Turli xil dizaynlar",
        "Istalgan mamlakat, shahar yoki hudud xaritasini individual buyurtma qilish mumkin",
        "15 yil kafolat",
        "O‘zbekiston bo‘ylab bepul yetkazib berish",
      ]
    : [
        "Можно отмечать страны",
        "Натуральное дерево",
        "Гиппоалергенные материалы",
        "Можно изучать географию",
        "Разнообразный дизайн",
        "Индивидуальная карта любой страны, города или района",
        "Гарантия 15 лет",
        "Бесплатная доставка по Узбекистану",
      ]

  // Всегда держим актуальную функцию трекинга в ref, чтобы не ловить бесконечный цикл
  useEffect(() => {
    trackModalOpenRef.current = trackModalOpen
  }, [trackModalOpen])

  // Отслеживание открытия модалки в пикселе + сброс шагов при открытии
  useEffect(() => {
    if (!isOpen) return

    trackModalOpenRef.current("quiz", "woodlyworld")
    setStep(1)
    setDestination(null)
    setWallWidth(null)
    setValues([])
    setCity(null)
    setPhone("")
  }, [isOpen])

  const toggleValue = (label: string) => {
    setValues((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPhoneValid(phone)) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("phone", phone)
      formData.append("quiz_type", "woodlyworld_entry")
      if (destination) {
        formData.append("quiz_destination", destination)
      }
      if (wallWidth) {
        formData.append("quiz_wall_width", wallWidth)
      }
      if (values.length) {
        formData.append("quiz_values", values.join(", "))
      }
      if (city) {
        formData.append("quiz_city", city)
      }

      const response = await fetch("/api/woodlyworld-inquiry", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Ошибка при отправке заявки")
      }

      trackLead()
      trackCustomEvent("QuizCompleted", { source: "woodlyworld", variant: "entry" })

      setStep(7)
    } catch (error) {
      console.error("Ошибка при отправке заявки из квиза:", error)
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами в Telegram @woodlyworld.")
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isUz
                ? "Bir necha daqiqada siz uchun ideal dunyo xaritasini tanlab beramiz"
                : "Подберём идеальную карту мира за считанные минуты"}
            </h2>
            <p className="text-lg text-gray-700">
              {isUz
                ? "🎁 Siz uchun Sovg‘a: interyeringizga mos bepul dizayn-loyiha"
                : "🎁 В подарок: дизайн-проект под ваш интерьер"}
            </p>
            <Button
              className="mt-4 w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-semibold rounded-2xl"
              onClick={() => setStep(2)}
            >
              {isUz ? "👉 Xaritani tanlash" : "👉 Подобрать карту"}
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz ? "👉 Xaritani qayerga qo'ymoqchisiz?" : "👉 Куда вам нужна карта?"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={destination === "home" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setDestination("home")
                  setStep(3)
                }}
              >
                {isUz ? "Uy uchun" : "Для дома"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={destination === "gift" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setDestination("gift")
                  setStep(3)
                }}
              >
                {isUz ? "Sovg‘a uchun" : "В подарок"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={destination === "office" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setDestination("office")
                  setStep(3)
                }}
              >
                {isUz ? "Ofis / biznes uchun" : "Для офиса / бизнеса"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={destination === "school" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setDestination("school")
                  setStep(3)
                }}
              >
                {isUz ? "Maktab / davlat tashkiloti uchun" : "Для школы / госорганизации"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz
                ? "👉 Devoringizning taxminiy kengligi qancha?"
                : "👉 Какой у вас размер ширины стены?"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={wallWidth === "100" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setWallWidth("100")
                  setStep(4)
                }}
              >
                {isUz ? "Taxminan 100 sm" : "Приблизительно 100 см"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={wallWidth === "200" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setWallWidth("200")
                  setStep(4)
                }}
              >
                {isUz ? "Taxminan 200 sm" : "Приблизительно 200 см"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={wallWidth === "300" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setWallWidth("300")
                  setStep(4)
                }}
              >
                {isUz ? "Taxminan 300 sm" : "Приблизительно 300 см"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={wallWidth === "400" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setWallWidth("400")
                  setStep(4)
                }}
              >
                {isUz ? "Taxminan 400 sm" : "Приблизительно 400 см"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={wallWidth === "500plus" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setWallWidth("500plus")
                  setStep(4)
                }}
              >
                {isUz ? "Taxminan 500 sm va undan ko'p" : "Приблизительно 500 см и больше"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={wallWidth === "advice" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setWallWidth("advice")
                  setStep(4)
                }}
              >
                {isUz ? "Maslahat kerak" : "Нужен совет"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz
                ? "👉 Sizga eng ko‘p nima yoqti va nimalar qiziqtirdi?"
                : "Что вас больше всего зацепило?"}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-2">
              {isUz
                ? "Bir nechta variantni tanlashingiz mumkin"
                : "Можно выбрать несколько вариантов"}
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
              {valueOptions.map((label) => {
                const active = values.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleValue(label)}
                    className={`w-full text-left px-4 py-2 rounded-xl border text-sm transition-all ${
                      active
                        ? "bg-orange-50 border-orange-500 text-orange-700"
                        : "bg-white border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <Button
              className="mt-2 w-full h-11 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-base font-semibold rounded-2xl"
              onClick={() => setStep(5)}
            >
              {isUz ? "Keyingi" : "Далее"}
            </Button>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz
                ? "Sizga qayerga yetqazib berish kerak?"
                : "Куда вам нужно доставить?"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={city === "tashkent" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("tashkent")
                  setStep(6)
                }}
              >
                {isUz ? "Toshkent" : "Ташкент"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={city === "samarkand" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("samarkand")
                  setStep(6)
                }}
              >
                {isUz ? "Samarqand" : "Самарканд"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={city === "andijan" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("andijan")
                  setStep(6)
                }}
              >
                {isUz ? "Andijon" : "Андижан"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={city === "fergana" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("fergana")
                  setStep(6)
                }}
              >
                {isUz ? "Farg‘ona" : "Фергана"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={city === "bukhara" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("bukhara")
                  setStep(6)
                }}
              >
                {isUz ? "Buxoro" : "Бухара"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={city === "khorezm" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("khorezm")
                  setStep(6)
                }}
              >
                {isUz ? "Xorazm" : "Хорезм"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={city === "other" ? "default" : "outline"}
                className="w-full justify-between bg-white text-gray-900 hover:bg-orange-50"
                onClick={() => {
                  setCity("other")
                  setStep(6)
                }}
              >
                {isUz ? "Boshqa viloyat" : "Другая область"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="mt-2 w-full h-11 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-base font-semibold rounded-2xl"
              onClick={() => setStep(6)}
            >
              {isUz ? "Keyingi" : "Далее"}
            </Button>
          </div>
        )
      case 6:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isUz ? "🎁 Sizning bonusingiz tayyor" : "🎁 Ваш бонус готов"}
              </h2>
              <p className="text-sm text-gray-700">
                {isUz ? "Biz siz uchun bepul tayyorlaymiz:" : "Мы бесплатно подготовим:"}
              </p>
              <ul className="text-sm text-gray-700 text-left list-disc list-inside space-y-1">
                <li>
                  {isUz
                    ? "interyeringizga mos dizayn-loyiha"
                    : "дизайн-проект карты в вашем интерьере"}
                </li>
                <li>
                  {isUz
                    ? "o‘lcham va rang bo‘yicha individual yordam"
                    : "персональный подбор размера и цвета"}
                </li>
              </ul>
            </div>

            <div>
              <label
                htmlFor="quiz-phone"
                className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                {isUz ? "📞 Telefon raqamingiz" : "📞 Номер телефона"}
              </label>
              <Input
                id="quiz-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value, setPhone)}
                placeholder="+998 90 123 45 67"
                required
                className={`bg-white w-full h-12 px-4 text-lg border-2 rounded-xl transition-all duration-200 ${
                  phoneError
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                }`}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !!phoneError}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-bold rounded-2xl shadow-lg disabled:opacity-60"
            >
              {isSubmitting
                ? isUz
                  ? "Yuborilmoqda..."
                  : "Отправляем..."
                : isUz
                ? "Dizayn-loyihani olish"
                : "Получить дизайн-проект"}
            </Button>
          </form>
        )
      case 7:
        return (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isUz ? "Rahmat!" : "Спасибо!"}
            </h2>
            <p className="text-gray-700">
              {isUz
                ? "Yaqin vaqt ichida menejerimiz siz bilan bog‘lanadi."
                : "Наш менеджер свяжется с вами в ближайшее время."}
            </p>
            <p className="text-gray-700">
              {isUz
                ? "Shu vaqt ichida telegram kanalimiz bilan tanishib chiqishingiz mumkin:"
                : "А пока можете ознакомиться с нашим Telegram-каналом:"}
            </p>
            <Button
              className="w-full h-11 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold rounded-2xl"
              onClick={() => {
                window.open("https://t.me/woodlyworld", "_blank")
              }}
            >
              {isUz ? "Telegram kanalini ochish" : "Открыть канал в Telegram"}
            </Button>
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={onClose}
            >
              {isUz ? "Yopish" : "Закрыть"}
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Затемнение */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Модалка */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Прогресс (простая подпись шага) */}
            {step < 7 && (
              <p className="text-xs text-gray-400 mb-3">
                {isUz ? `Bosqich ${step} / 6` : `Шаг ${step} из 6`}
              </p>
            )}

            {renderStepContent()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


