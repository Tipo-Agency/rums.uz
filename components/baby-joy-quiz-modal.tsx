"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePhoneValidation } from "@/hooks/use-phone-validation"
import { useMetaPixel } from "@/hooks/use-meta-pixel"
import { useLanguage } from "@/lib/language-context"

interface BabyjoyQuizModalProps {
  isOpen: boolean
  onClose: () => void
}

type AgeOption = "0-1" | "1-3" | "3-6" | "6plus"
type PreferenceOption =
  | "bunkBed"
  | "deskChair"
  | "helperTower"
  | "pikler"
  | "arch"
  | "all"
type RegionOption =
  | "tashkent"
  | "samarkand"
  | "bukhara"
  | "andijan"
  | "khorezm"
  | "fergana"
  | "other"

export function BabyjoyQuizModal({ isOpen, onClose }: BabyjoyQuizModalProps) {
  const { language } = useLanguage()
  const isUz = language === "uz"

  const [step, setStep] = useState(1)
  const [age, setAge] = useState<AgeOption | null>(null)
  const [preference, setPreference] = useState<PreferenceOption | null>(null)
  const [values, setValues] = useState<string[]>([])
  const [region, setRegion] = useState<RegionOption | null>(null)
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { phoneError, handlePhoneChange, isPhoneValid } = usePhoneValidation()
  const { trackLead, trackCustomEvent, trackModalOpen } = useMetaPixel()
  const trackModalOpenRef = useRef(trackModalOpen)

  const valueOptions = isUz
    ? [
        "Xavfsizlik va mustahkamlik",
        "Ekologik toza materiallar",
        "Farzandingiz bilan birga o'sishi",
        "Gipoallergen bo‘yoqlar",
        "Ixchamlik",
        "**Estetik dizayn**",
        "Ranglar xilma-xilligi",
      ]
    : [
        "Безопасность и надёжность",
        "Экологические материалы",
        "Растёт вместе с вашим ребёнком",
        "Гиппоалергенные краски",
        "Компактность",
        "Эстетичный дизайн",
        "Разнообразие цветов",
      ]

  // Держим актуальную функцию трекинга в ref
  useEffect(() => {
    trackModalOpenRef.current = trackModalOpen
  }, [trackModalOpen])

  // Сброс состояния и трекинг открытия
  useEffect(() => {
    if (!isOpen) return

    trackModalOpenRef.current("quiz", "babyjoy")
    setStep(1)
    setAge(null)
    setPreference(null)
    setValues([])
    setRegion(null)
    setPhone("")
  }, [isOpen])

  const toggleValue = (label: string) => {
    setValues(prev =>
      prev.includes(label) ? prev.filter(v => v !== label) : [...prev, label]
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
      formData.append("quiz_type", "babyjoy_entry")
      if (age) {
        formData.append("quiz_age", age)
      }
      if (preference) {
        formData.append("quiz_preference", preference)
      }
      if (values.length) {
        formData.append("quiz_values", values.join(", "))
      }
      if (region) {
        formData.append("quiz_region", region)
      }

      const response = await fetch("/api/babyjoy-inquiry", {
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
      trackCustomEvent("QuizCompleted", { source: "babyjoy", variant: "entry" })

      setStep(7)
    } catch (error) {
      console.error("Ошибка при отправке заявки из квиза Babyjoy:", error)
      alert(
        isUz
          ? "Ariza yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring yoki biz bilan Telegram orqali bog'laning: @babyjoy_uz."
          : "Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами в Telegram @babyjoy_uz."
      )
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isUz
                ? "Farzandingizni yoshi va ehtiyojlariga mos bolalar mebellarini tanlab beramiz"
                : "Подберём детскую мебель под возраст и нужды ребёнка"}
            </h2>
            <p className="text-lg text-gray-700">
              {isUz
                ? "🎁 Toshkent shahri bo‘yicha bepul yetkazib berish va yig‘ish"
                : "🎁 Бесплатная доставка и сборка по Ташкенту"}
            </p>
            <Button
              className="mt-4 w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-2xl"
              onClick={() => setStep(2)}
            >
              {isUz ? "👉 Mebelni tanlash" : "👉 Подобрать мебель"}
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz ? "👉 Farzandingiz nechi yoshda?" : "👉 Возраст ребёнка?"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={age === "0-1" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setAge("0-1")
                  setStep(3)
                }}
              >
                {isUz ? "0–1 yosh" : "0–1 год"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={age === "1-3" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setAge("1-3")
                  setStep(3)
                }}
              >
                {isUz ? "1–3 yosh" : "1–3 года"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={age === "3-6" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setAge("3-6")
                  setStep(3)
                }}
              >
                {isUz ? "3–6 yosh" : "3–6 лет"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={age === "6plus" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setAge("6plus")
                  setStep(3)
                }}
              >
                {isUz ? "6 yoshdan katta" : "6+ лет"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz
                ? "👉 Sizga qaysi mahsulotimiz ko‘proq yoqdi?"
                : "Что вам больше всего понравилось?"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={preference === "bunkBed" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setPreference("bunkBed")
                  setStep(4)
                }}
              >
                {isUz ? "Ikki qavatli karavot" : "Двухярусная кроватка"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={preference === "deskChair" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setPreference("deskChair")
                  setStep(4)
                }}
              >
                {isUz ? "Stol va stul" : "Стол стул"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={preference === "helperTower" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setPreference("helperTower")
                  setStep(4)
                }}
              >
                {isUz ? "Yordamchi minora" : "Башню помощника"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={preference === "pikler" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setPreference("pikler")
                  setStep(4)
                }}
              >
                {isUz ? "Pikler uchburchagi" : "Треугольник пиклера"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={preference === "arch" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setPreference("arch")
                  setStep(4)
                }}
              >
                {isUz ? "Tebranadigan arka" : "Арка качалку"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={preference === "all" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setPreference("all")
                  setStep(4)
                }}
              >
                {isUz ? "Barchasi" : "Все перечисленное"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              {isUz
                ? "👉 Sizga maxsulotimizda eng ko‘p nima yoqti?"
                : "👉 Что вас зацепило больше всего?"}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-2">
              {isUz
                ? "Bir nechta variantni tanlashingiz mumkin"
                : "Можно выбрать несколько вариантов"}
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
              {valueOptions.map(label => {
                const active = values.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleValue(label)}
                    className={`w-full text-left px-4 py-2 rounded-xl border text-sm transition-all ${
                      active
                        ? "bg-purple-50 border-purple-500 text-purple-700"
                        : "bg-white border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <Button
              className="mt-2 w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base font-semibold rounded-2xl"
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
              {isUz ? "👉 Qayerga yetkazib berish kerak?" : "👉 Куда вам доставить?"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={region === "tashkent" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("tashkent")
                  setStep(6)
                }}
              >
                {isUz ? "Toshkent" : "Ташкент"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={region === "samarkand" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("samarkand")
                  setStep(6)
                }}
              >
                {isUz ? "Samarqand" : "Самарканд"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={region === "bukhara" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("bukhara")
                  setStep(6)
                }}
              >
                {isUz ? "Buxoro" : "Бухара"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={region === "andijan" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("andijan")
                  setStep(6)
                }}
              >
                {isUz ? "Andijon" : "Андижан"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={region === "khorezm" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("khorezm")
                  setStep(6)
                }}
              >
                {isUz ? "Xorazm" : "Хорезм"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={region === "fergana" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("fergana")
                  setStep(6)
                }}
              >
                {isUz ? "Farg‘ona" : "Фергана"} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant={region === "other" ? "default" : "outline"}
                className="w-full justify-between"
                onClick={() => {
                  setRegion("other")
                  setStep(6)
                }}
              >
                {isUz ? "Boshqa viloyat" : "Другой регион"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      case 6:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isUz ? "🎁 Sizning bonusingizni saqlab qo'ydik" : "🎁 Ваш бонус зафиксирован"}
              </h2>
              <p className="text-sm text-gray-700">
                {isUz
                  ? "Buyurtma berishda siz quyidagilarga ega bo‘lasiz:"
                  : "При заказе вы получите:"}
              </p>
              <ul className="text-sm text-gray-700 text-left list-disc list-inside space-y-1">
                <li>
                  {isUz
                    ? "Toshkent bo‘yicha bepul yetkazib berish"
                    : "бесплатную доставку по Ташкенту"}
                </li>
                <li>
                  {isUz
                    ? "Mebelni bepul yig‘ib beramiz"
                    : "бесплатную сборку мебели"}
                </li>
              </ul>
            </div>

            <div>
              <label
                htmlFor="babyjoy-quiz-phone"
                className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                {isUz ? "📞 Telefon raqamingiz" : "📞 Номер телефона"}
              </label>
              <Input
                id="babyjoy-quiz-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={e => handlePhoneChange(e.target.value, setPhone)}
                placeholder="+998 90 123 45 67"
                required
                className={`bg-white w-full h-12 px-4 text-lg border-2 rounded-xl transition-all duration-200 ${
                  phoneError
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                }`}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !!phoneError}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-bold rounded-2xl shadow-lg disabled:opacity-60"
            >
              {isSubmitting
                ? isUz
                  ? "Yuborilmoqda..."
                  : "Отправляем..."
                : isUz
                ? "Tanlovni olish"
                : "Получить подбор"}
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
                ? "Menejerimiz siz bilan bog‘lanib, barcha tafsilotlarni aniqlashtiradi."
                : "Менеджер свяжется с вами и уточнит детали."}
            </p>
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

            {/* Прогресс */}
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


