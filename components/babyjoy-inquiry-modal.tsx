"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Baby, Phone, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface BabyjoyInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  variant?: 'default' | 'consultation' | 'learn-more'
}

export function BabyjoyInquiryModal({ isOpen, onClose, variant = 'default' }: BabyjoyInquiryModalProps) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Создаем FormData с данными
      const formData = new FormData()
      formData.append('name', name)
      formData.append('phone', phone)
      formData.append('source', 'babyjoy')
      formData.append('timestamp', new Date().toISOString())

      // Отправляем через наш локальный API route (избегаем CORS)
      const response = await fetch('/api/babyjoy-inquiry', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success) {
          // Успешная отправка
          const successMessage = variant === 'consultation' ? 
            t('modalConsultationSuccessBabyjoy') :
            variant === 'learn-more' ? 
            t('modalLearnMoreSuccessBabyjoy') :
            t('modalOrderSuccessBabyjoy');
          
          alert(successMessage);
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
      
      // Показываем альтернативный способ связи
      alert(t('modalErrorFallback'))
      
      // В любом случае очищаем форму
      setName("")
      setPhone("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 border border-purple-100"
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
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Baby className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {variant === 'consultation' ? t('modalConsultationTitle') :
                 variant === 'learn-more' ? t('modalLearnMoreTitle') :
                 t('orderChildrenFurniture')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {variant === 'consultation' ? t('modalConsultationDescriptionBabyjoy') :
                 variant === 'learn-more' ? t('modalLearnMoreDescriptionBabyjoy') :
                 t('modalOrderDescriptionBabyjoy')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
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
                  className="bg-white w-full h-12 px-4 text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-purple-500" />
                  {t('phoneNumber')}
                </label>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  required
                  className="bg-white w-full h-12 px-4 text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {variant === 'consultation' ? t('submittingConsultation') :
                     variant === 'learn-more' ? t('submittingInquiry') :
                     t('submittingRequest')}
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {variant === 'consultation' ? t('modalConsultationButton') :
                     variant === 'learn-more' ? t('modalLearnMoreButton') :
                     t('modalOrderButton')}
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
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                          onClick={() => window.open(`https://wa.me/998901234567?text=${encodeURIComponent(t('modalWhatsAppMessageBabyjoy'))}`, '_blank')}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                                          {t('modalWhatsApp')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    onClick={() => window.open('tel:+998901234567')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                                          {t('modalCall')}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
