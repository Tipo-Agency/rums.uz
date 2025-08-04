"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.26 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
)

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-white leading-none">RUMS.UZ</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{t('palms')} • {t('maps')} • {t('childrenFurniture')}</div>
              </div>
            </div>
            <p className="text-gray-400">
              {t('createComfortWithQualityItems')}
            </p>
            {/* <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/ecopalma.uz/?igsh=MWxvMnd4ZnoyeTFjaA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://t.me/ecopalmatashkent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TelegramIcon className="w-6 h-6" />
              </a>
            </div> */}
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t('navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('homePage')}
                </a>
              </li>
              <li>
                <a href="/ecopalma" className="text-gray-400 hover:text-white transition-colors">
                  {t('palms')}
                </a>
              </li>
              <li>
                <a href="/woodlyworld" className="text-gray-400 hover:text-white transition-colors">
                  {t('maps')}
                </a>
              </li>
              <li>
                <a href="/babyjoy" className="text-gray-400 hover:text-white transition-colors">
                  {t('childrenFurniture')}
                </a>
              </li>
            </ul>
          </div>
          {/* <div>
            <h4 className="font-bold text-lg mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div> */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('contacts')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-500" />
                <span>Ташкент, Узбекистан</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span>+998 77-300-78-90</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} rums.uz {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}
