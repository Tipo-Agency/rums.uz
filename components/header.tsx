"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Instagram, ChevronDown, Menu, X, Languages } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

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
  const { language, setLanguage, t } = useLanguage()

  const productsRef = useRef<HTMLDivElement>(null)
  const instagramRef = useRef<HTMLDivElement>(null)
  const telegramRef = useRef<HTMLDivElement>(null)

  // Dynamic phone numbers based on current page
  const getPhoneNumber = () => {
    if (pathname === "/ecopalma") return "+998 99-810-48-80"
    if (pathname === "/woodlyworld") return "+998 95-086-44-46"
    if (pathname === "/babyjoy") return "+998 95-822-77-15"
    if (pathname === "/loft-bed") return "+998 70-018-44-46"
    return "+998 99-810-48-80" // Default PalkarMe number
  }

  const getLogo = () => {
    if (pathname === "/ecopalma") return <Image src="logo/ecopalma.png" alt="Ecopalma" className="w-full h-full object-contain" width={90} height={90} />
    if (pathname === "/woodlyworld") return <Image src="logo/woodlyworld.png" alt="Woodlyworld" className="w-full h-full object-contain" width={60} height={60} />
    if (pathname === "/babyjoy") return <Image src="logo/babyjoy.png" alt="Babyjoy" className="w-full h-full object-contain" width={90} height={90} />
    if (pathname === "/loft-bed") return <Image src="/loft-bed/Logo.png" alt="Loft Bed" className="w-full h-full object-contain rounded-xl" width={90} height={90} />
    return <div className="w-full h-full bg-gradient-to-br from-green-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">P</div>
  }

  const getSiteInfo = () => {
    if (pathname === "/ecopalma") return {
      name: "Ecopalma",
      description: t('artificialPalmsEcopalma')
    }
    if (pathname === "/woodlyworld") return {
      name: "Woodlyworld", 
      description: t('woodenMapsWoodlyworld')
    }
    if (pathname === "/babyjoy") return {
      name: "Babyjoy",
      description: t('furnitureBabyjoy')
    }
    if (pathname === "/loft-bed") return {
      name: "Loft Bed",
      description: t('loftBed')
    }
    return {
      name: "RUMS.UZ",
      description: `${t('palms')} • ${t('maps')} • ${t('childrenFurniture')}`
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
      <div className="w-full max-w-full px-3 sm:px-4 box-border">
        <nav className="flex items-center justify-between h-[70px] w-full max-w-full box-border">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 max-w-[65%] sm:max-w-[70%] overflow-hidden">
            <div className="flex-shrink-0 w-16 h-16 sm:w-16 sm:h-16">{getLogo()}</div>
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight truncate whitespace-nowrap">{getSiteInfo().name}</div>
              <div className="text-[10px] sm:text-[11px] lg:text-[12px] text-gray-500 leading-tight truncate whitespace-nowrap">{getSiteInfo().description}</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 mr-10">
            <Link href="/" className="text-gray-600 hover:text-green-600 font-medium text-[15px] transition-colors">
              {t('mainPage')}
            </Link>
            <div className="relative" ref={productsRef}>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium text-[15px] transition-colors py-2"
                onClick={() => setProductsOpen(!isProductsOpen)}
              >
                {t('products')}
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
                      <div className="font-semibold text-gray-900">{t('palms')}</div>
                      <div className="text-xs text-gray-500">{t('artificialPalmsEcopalma')}</div>
                    </div>
                  </Link>
                  <Link
                    href="/woodlyworld"
                    className="flex items-center gap-3 px-4 py-3 hover:translate-x-2 transition-all duration-300"
                    onClick={() => setProductsOpen(false)}
                  >
                    <Image src="logo/woodlyworld.png" alt="Woodlyworld" width={50} height={50} className="pl-3"/>
                    <div className="pl-3">
                      <div className="font-semibold text-gray-900">{t('maps')}</div>
                      <div className="text-xs text-gray-500">{t('woodenMapsWoodlyworld')}</div>
                    </div>
                  </Link>
                  <Link
                    href="/babyjoy"
                    className="flex items-center gap-3 px-4 py-3 hover:translate-x-2 transition-all duration-300"
                    onClick={() => setProductsOpen(false)}
                  >
                    <Image src="logo/babyjoy.png" alt="Babyjoy" width={64} height={64} />
                    <div>
                      <div className="font-semibold text-gray-900">{t('childrenFurniture')}</div>
                      <div className="text-xs text-gray-500">{t('furnitureBabyjoy')}</div>
                    </div>
                  </Link>
                  <Link
                    href="/loft-bed"
                    className="flex items-center gap-3 px-4 py-3 hover:translate-x-2 transition-all duration-300"
                    onClick={() => setProductsOpen(false)}
                  >
                    <Image src="/loft-bed/Logo.png" alt="Loft Bed" width={64} height={64} className="rounded-xl" />
                    <div>
                      <div className="font-semibold text-gray-900">{t('loftBed')}</div>
                      <div className="text-xs text-gray-500">{t('loftBedDescription')}</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="lg:flex items-center gap-6">
            {/* Language Toggle Button */}
            <button
              onClick={() => setLanguage(language === 'ru' ? 'uz' : 'ru')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
            >
              <Languages className="w-4 h-4" />
              {language === 'ru' ? 'RU' : 'UZ'}
            </button>
            <a
              href={`tel:${getPhoneNumber().replace(/\s/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors"
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
          
          {/* Mobile Language Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'uz' : 'ru')}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium transition-colors flex-shrink-0"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs">{language === 'ru' ? 'RU' : 'UZ'}</span>
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
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
                  {t('mainPage')}
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
                          <div className="font-semibold text-gray-900">{t('palms')}</div>
                          <div className="text-xs text-gray-500">{t('artificialPalmsEcopalma')}</div>
                        </div>
                      </Link>
                      <Link
                        href="/woodlyworld"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image src="logo/woodlyworld.png" alt="Woodlyworld" width={50} height={50} className="pl-3"/>
                        <div className="pl-3">
                          <div className="font-semibold text-gray-900">{t('maps')}</div>
                          <div className="text-xs text-gray-500">{t('woodenMapsWoodlyworld')}</div>
                        </div>
                      </Link>
                      <Link
                        href="/babyjoy"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image src="logo/babyjoy.png" alt="Babyjoy" width={64} height={64} />
                        <div>
                          <div className="font-semibold text-gray-900">{t('childrenFurniture')}</div>
                          <div className="text-xs text-gray-500">{t('furnitureBabyjoy')}</div>
                        </div>
                      </Link>
                      <Link
                        href="/loft-bed"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image src="/loft-bed/Logo.png" alt="Loft Bed" width={64} height={64} className="rounded-xl" />
                        <div>
                          <div className="font-semibold text-gray-900">{t('loftBed')}</div>
                          <div className="text-xs text-gray-500">{t('loftBedDescription')}</div>
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


            </div>
          </div>
        )}
      </div>
    </header>
  )
}
