"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Instagram, ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Youtube } from "lucide-react"

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isProductsOpen, setProductsOpen] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState<"instagram" | "telegram" | null>(null)
  const [expandedSocial, setExpandedSocial] = useState<"instagram" | "telegram" | null>(null)
  const pathname = usePathname()

  const productsRef = useRef<HTMLDivElement>(null)
  const instagramRef = useRef<HTMLDivElement>(null)
  const telegramRef = useRef<HTMLDivElement>(null)

  // Dynamic phone numbers based on current page
  const getPhoneNumber = () => {
    if (pathname === "/ecopalma") return "+998 77-300-78-90"
    if (pathname === "/woodlyworld") return "+998 77-300-78-90"
    if (pathname === "/babyjoy") return "+998 77-300-78-90"
    return "+998 77-300-78-90" // Default PalkarMe number
  }

  const getLogo = () => {
    if (pathname === "/ecopalma") return <Image src="logo/ecopalma.png" alt="Ecopalma" width={90} height={90} />
    if (pathname === "/woodlyworld") return <Image src="logo/woodlyworld.png" alt="Woodlyworld" width={60} height={60} />
    if (pathname === "/babyjoy") return <Image src="logo/babyjoy.png" alt="Babyjoy" width={90} height={90} />
    return <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
  }

  const getSiteInfo = () => {
    if (pathname === "/ecopalma") return {
      name: "Ecopalma",
      description: "Искусственные пальмы"
    }
    if (pathname === "/woodlyworld") return {
      name: "Woodlyworld", 
      description: "Деревянные карты"
    }
    if (pathname === "/babyjoy") return {
      name: "Babyjoy",
      description: "Детская мебель"
    }
    return {
      name: "RUMS.UZ",
      description: "Пальмы • Карты • Мебель"
    }
  }

  const socialBrands = {
    instagram: [
      {
        name: "Ecopalma",
        color: "from-green-500 to-green-600",
        href: "https://www.instagram.com/ecopalma.uz/?igsh=MWxvMnd4ZnoyeTFjaA%3D%3D",
      },
      {
        name: "Woodlyworld",
        color: "from-orange-500 to-orange-600",
        href: "https://www.instagram.com/woodlyworld.uz/",
      },
      {
        name: "Babyjoy",
        color: "from-purple-500 to-purple-600",
        href: "https://www.instagram.com/babyjoy.uz?igsh=NG0yaDliem5uaHg0&utm_source=qr",
      },
    ],
    telegram: [
      {
        name: "Ecopalma",
        color: "from-green-500 to-green-600",
        href: "https://t.me/ecopalmatashkent",
      },
      {
        name: "Woodlyworld",
        color: "from-orange-500 to-orange-600",
        href: "https://t.me/woodlyworld",
      },
      {
        name: "Babyjoy",
        color: "from-purple-500 to-purple-600",
        href: "https://t.me/babyjoy_uz",
      },
    ],
  }

  // Закрытие меню при клике вне их области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (productsRef.current && !productsRef.current.contains(target)) {
        setProductsOpen(false)
      }
      if (instagramRef.current && !instagramRef.current.contains(target)) {
        if (hoveredSocial === "instagram") setHoveredSocial(null)
      }
      if (telegramRef.current && !telegramRef.current.contains(target)) {
        if (hoveredSocial === "telegram") setHoveredSocial(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [hoveredSocial])

  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-[70px]">
          <div className="flex items-center gap-3">
            {getLogo()}
            <div className="hidden sm:flex flex-col">
              <div className="text-2xl font-bold text-gray-900 leading-none">{getSiteInfo().name}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{getSiteInfo().description}</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-green-600 font-medium text-[15px] transition-colors">
              Главная
            </Link>
            <div className="relative" ref={productsRef}>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium text-[15px] transition-colors py-2"
                onClick={() => setProductsOpen(!isProductsOpen)}
              >
                Продукты
                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50">
                  <Link
                    href="/ecopalma"
                    className="flex items-center gap-3 px-4 py-3 hover:translate-x-2 transition-all duration-300"
                    onClick={() => setProductsOpen(false)}
                  >
                    <Image src="logo/ecopalma.png" alt="Ecopalma" width={64} height={64} />
                    <div>
                      <div className="font-semibold text-gray-900">Пальмы</div>
                      <div className="text-xs text-gray-500">Искусственные пальмы Ecopalma</div>
                    </div>
                  </Link>
                  <Link
                    href="/woodlyworld"
                    className="flex items-center gap-3 px-4 py-3 hover:translate-x-2 transition-all duration-300"
                    onClick={() => setProductsOpen(false)}
                  >
                    <Image src="logo/woodlyworld.png" alt="Woodlyworld" width={50} height={50} className="pl-3"/>
                    <div className="pl-3">
                      <div className="font-semibold text-gray-900">Карты</div>
                      <div className="text-xs text-gray-500">Деревянные карты Woodlyworld</div>
                    </div>
                  </Link>
                  <Link
                    href="/babyjoy"
                    className="flex items-center gap-3 px-4 py-3 hover:translate-x-2 transition-all duration-300"
                    onClick={() => setProductsOpen(false)}
                  >
                    <Image src="logo/babyjoy.png" alt="Babyjoy" width={64} height={64} />
                    <div>
                      <div className="font-semibold text-gray-900">Детская мебель</div>
                      <div className="text-xs text-gray-500">Мебель Babyjoy</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="lg:flex items-center gap-6">
            <a
              href={`tel:${getPhoneNumber().replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              <Phone className="w-4 h-4" /> {getPhoneNumber()}
            </a>
            <div className=" gap-3 relative hidden lg:flex">
              {/* Instagram */}
              <div className="relative" ref={instagramRef}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setHoveredSocial(hoveredSocial === "instagram" ? null : "instagram")
                  }}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                {hoveredSocial === "instagram" && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 flex flex-col gap-3 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                    {socialBrands.instagram.map((brand, i) => (
                      <div key={brand.name} className="flex flex-col items-center group">
                        <a
                          href={brand.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${brand.color} flex items-center justify-center text-white hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg relative group-hover:shadow-2xl`}
                          style={{
                            transform: `translateY(${i * 2}px) rotate(${(i - 1) * 5}deg)`,
                            transformOrigin: "center top",
                          }}
                          title={`${brand.name} Instagram`}
                        >
                          <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                        </a>
                        <span className="text-xs text-gray-800 mt-2 font-semibold bg-gray-50 px-2 py-1 rounded-full group-hover:bg-gray-100 group-hover:scale-105 transition-all duration-200">
                          {brand.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Telegram */}
              <div className="relative" ref={telegramRef}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setHoveredSocial(hoveredSocial === "telegram" ? null : "telegram")
                  }}
                  className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <TelegramIcon className="w-5 h-5" />
                </a>
                {hoveredSocial === "telegram" && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 flex flex-col gap-3 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                    {socialBrands.telegram.map((brand, i) => (
                      <div key={brand.name} className="flex flex-col items-center group">
                        <a
                          href={brand.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${brand.color} flex items-center justify-center text-white hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}
                          style={{
                            transform: `translateY(${i * 2}px) rotate(${(i - 1) * 5}deg)`,
                            transformOrigin: "center top",
                          }}
                          title={`${brand.name} Telegram`}
                        >
                          <TelegramIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                        </a>
                        <span className="text-xs text-gray-800 mt-2 font-semibold bg-gray-50 px-2 py-1 rounded-full group-hover:bg-gray-100 group-hover:scale-105 transition-all duration-200">
                          {brand.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
              Ru
            </button> */}
            </div>

          </div>
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
            <div className="py-4 space-y-4">
              {/* Main Navigation */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Главная
                </Link>
                
                {/* Products Dropdown */}
                    <div className="mt-2 space-y-2">
                      <Link
                        href="/ecopalma"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image src="logo/ecopalma.png" alt="Ecopalma" width={64} height={64} />
                        <div>
                          <div className="font-semibold text-gray-900">Пальмы</div>
                          <div className="text-xs text-gray-500">Искусственные пальмы Ecopalma</div>
                        </div>
                      </Link>
                      <Link
                        href="/woodlyworld"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image src="logo/woodlyworld.png" alt="Woodlyworld" width={50} height={50} className="pl-3"/>
                        <div className="pl-3">
                          <div className="font-semibold text-gray-900">Карты</div>
                          <div className="text-xs text-gray-500">Деревянные карты Woodlyworld</div>
                        </div>
                      </Link>
                      <Link
                        href="/babyjoy"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image src="logo/babyjoy.png" alt="Babyjoy" width={64} height={64} />
                        <div>
                          <div className="font-semibold text-gray-900">Детская мебель</div>
                          <div className="text-xs text-gray-500">Мебель Babyjoy</div>
                        </div>
                      </Link>
                    </div>
              </div>

              {/* Contact Info */}
              <div className="px-4 py-3 border-t border-gray-100">
                <a
                  href={`tel:${getPhoneNumber().replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-gray-700 font-medium mt-4 ml-4"
                >
                  <Phone className="w-4 h-4" /> {getPhoneNumber()}
                </a>
              </div>

              {/* Social Links */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="space-y-2">
                  {/* Instagram */}
                  <div>
                    <button
                      onClick={() => setExpandedSocial(expandedSocial === "instagram" ? null : "instagram")}
                      className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                          <Instagram className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">Instagram</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSocial === "instagram" ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSocial === "instagram" && (
                      <div className="mt-2 ml-11 space-y-2">
                        {socialBrands.instagram.map((brand) => (
                          <a
                            key={brand.name}
                            href={brand.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${brand.color} flex items-center justify-center`}>
                              <Instagram className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-600 text-sm">{brand.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Telegram */}
                  <div>
                    <button
                      onClick={() => setExpandedSocial(expandedSocial === "telegram" ? null : "telegram")}
                      className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <TelegramIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">Telegram</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSocial === "telegram" ? "rotate-180" : ""}`} />
                    </button>
                    {expandedSocial === "telegram" && (
                      <div className="mt-2 ml-11 space-y-2">
                        {socialBrands.telegram.map((brand) => (
                          <a
                            key={brand.name}
                            href={brand.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${brand.color} flex items-center justify-center`}>
                              <TelegramIcon className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-600 text-sm">{brand.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Language Selector */}
              {/* <div className="px-4 py-3 border-t border-gray-100">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
                  Ru
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
