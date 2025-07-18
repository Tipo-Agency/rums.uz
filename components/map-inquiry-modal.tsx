"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface MapInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  mapType: string
  mapDescription: string
}

export function MapInquiryModal({ isOpen, onClose, mapType, mapDescription }: MapInquiryModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would normally send the data to your backend
    console.log("Map inquiry submitted:", { name, phone, mapType })

    setIsSubmitting(false)
    setName("")
    setPhone("")
    onClose()

    // Show success message
    alert(`Спасибо за интерес к "${mapType}"! Мы свяжемся с вами в ближайшее время.`)
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{mapType}</h2>
              <p className="text-gray-600 mb-4">{mapDescription}</p>
              <p className="text-sm text-gray-500">
                Оставьте заявку на консультацию или ознакомьтесь подробнее с нашим каталогом карт
              </p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              Оставить заявку
            </Button>

            <div className="border-t pt-4">
              <Link href="/woodlyworld" passHref>
                <Button
                  asChild
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold bg-transparent"
                  onClick={onClose}
                >
                  <a>
                    <Eye className="w-4 h-4 mr-2" />
                    Ознакомиться подробнее
                  </a>
                </Button>
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
