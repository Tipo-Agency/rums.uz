"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would normally send the data to your backend
    console.log("Order submitted:", { name, phone })

    setIsSubmitting(false)
    setName("")
    setPhone("")
    onClose()

    // Show success message (you could add a toast notification here)
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.")
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Оставить заявку</h2>
              <p className="text-gray-600">
                Есть идея или вопрос? Напишите нам! Мы свяжемся с вами в ближайшее время, чтобы обсудить все детали.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя
                </label>
                <Input
                  id="modal-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Номер телефона
                </label>
                <Input
                  id="modal-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg font-semibold"
              >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
