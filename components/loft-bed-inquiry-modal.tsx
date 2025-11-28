"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Phone, User, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { useMetaPixel } from "@/hooks/use-meta-pixel"
import { usePhoneValidation } from "@/hooks/use-phone-validation"
import { useEffect } from "react"

interface LoftBedInquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoftBedInquiryModal({ isOpen, onClose }: LoftBedInquiryModalProps) {
  const { t } = useLanguage()
  const { trackLead, trackCustomEvent, trackModalOpen } = useMetaPixel()
  const { phoneError, handlePhoneChange, isPhoneValid } = usePhoneValidation()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Отслеживаем открытие модального окна
  useEffect(() => {
    if (isOpen) {
      trackModalOpen('default', 'loft-bed');
    }
  }, [isOpen, trackModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Валидируем номер телефона перед отправкой
    if (!isPhoneValid(phone)) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Создаем FormData с данными
      const formData = new FormData()
      formData.append('name', name)
      formData.append('phone', phone)
      formData.append('source', 'loft-bed')
      formData.append('timestamp', new Date().toISOString())

      // Отправляем через наш локальный API route
      const response = await fetch('/api/loft-bed-inquiry', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success) {
          // Успешная отправка
          trackLead();
          alert(t('loftBedCTATitle'));
          setName("")
          setPhone("")
          onClose()
        } else {
          throw new Error(result.message || 'Ошибка при отправке заявки')
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error)
      alert(t('modalErrorFallback'))
      setName("")
      setPhone("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-fit">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 border border-gray-200"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {t('loftBedCTATitle')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('loftBedCTASubtitle')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-green-600" />
                  {t('yourName')}
                </label>
                <Input
                  id="modal-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                  className="bg-white w-full h-12 px-4 text-lg border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 rounded-xl transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-600" />
                  {t('phoneNumber')}
                </label>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value, setPhone)}
                  placeholder="+998 90 123 45 67"
                  required
                  className={`bg-white w-full h-12 px-4 text-lg border-2 rounded-xl transition-all duration-200 ${
                    phoneError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-200'
                  }`}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !!phoneError}
                className="w-full h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {t('submittingRequest')}
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('loftBedCTAButton')}
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                {t('modalPrivacyNotice')}
              </p>
              
              {/* Alternative Contact Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">{t('modalAlternativeContact')}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      trackCustomEvent('Contact', { method: 'telegram', source: 'loft-bed' });
                      window.open(`https://t.me/palkarme?text=${encodeURIComponent('Здравствуйте! Хочу получить 3D-проект кровати-чердака')}`, '_blank');
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    {t('modalTelegram')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      trackCustomEvent('Contact', { method: 'phone', source: 'loft-bed' });
                      window.open('tel:+998773007890');
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('modalCall')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

