"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { OrderModal } from "@/components/order-modal"

type OrderModalContextType = {
  openOrderModal: () => void
}

const OrderModalContext = createContext<OrderModalContextType | null>(null)

export function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openOrderModal = useCallback(() => setIsOpen(true), [])
  const closeOrderModal = useCallback(() => setIsOpen(false), [])

  return (
    <OrderModalContext.Provider value={{ openOrderModal }}>
      {children}
      <OrderModal isOpen={isOpen} onClose={closeOrderModal} />
    </OrderModalContext.Provider>
  )
}

export function useOrderModal() {
  const ctx = useContext(OrderModalContext)
  return ctx
}
