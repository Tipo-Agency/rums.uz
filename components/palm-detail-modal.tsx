"use client"
import { Button } from "@/components/ui/button"
import { X, Send, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface PalmDetailModalProps {
  isOpen: boolean
  onClose: () => void
  palmName: string
  palmDescription: string
  linkHref: string
}

export function PalmDetailModal({ isOpen, onClose, palmName, palmDescription, linkHref }: PalmDetailModalProps) {
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{palmName}</h2>
              <p className="text-gray-600 mb-4">{palmDescription}</p>
              <p className="text-sm text-gray-500">
                Оставьте заявку или ознакомьтесь подробнее с нашим каталогом пальм
              </p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg font-semibold mb-6"
            >
              <Send className="w-4 h-4 mr-2" />
              Оставить заявку
            </Button>

            <div className="border-t pt-4">
              <Link href={linkHref} passHref>
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
