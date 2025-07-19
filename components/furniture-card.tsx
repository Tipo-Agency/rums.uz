"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface FurnitureCardProps {
  name: string
  images: string[]
  description: string
  linkHref: string
  onDetailsClick: () => void
}

export function FurnitureCard({ name, images, description, linkHref, onDetailsClick }: FurnitureCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white h-full flex flex-col">
      <div className="relative h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </AnimatePresence>

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-semibold mb-2 text-purple-900">{name}</h3>
        <p className="text-gray-500 mb-4 text-sm flex-grow">{description}</p>
        <div className="mt-auto">
          <Link href={linkHref}>
          <Button
            className="w-full bg-purple-300 hover:bg-purple-400 text-purple-900"
          >
            Узнать подробнее <ArrowRight className="w-4 h-4 ml-2 text-purple-900" />
          </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
