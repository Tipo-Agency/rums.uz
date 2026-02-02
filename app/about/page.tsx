"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Package, MapPin, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useOrderModal } from "@/lib/order-modal-context"

export default function AboutPage() {
  const { t } = useLanguage()
  const orderModal = useOrderModal()

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <Header />
      <main className="pt-[70px]">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("aboutCompanyTitle")}</h1>
              <p className="text-xl text-gray-600">{t("aboutCompanySubtitle")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-12"
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Package className="w-8 h-8 text-green-600" />
                  {t("aboutWhoWeAre")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{t("aboutWhoWeAreDesc")}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-green-600" />
                  {t("aboutGeography")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{t("aboutGeographyDesc")}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                  {t("aboutGuarantees")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{t("aboutGuaranteesDesc")}</p>
              </div>
            </motion.div>

            {orderModal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mt-16"
              >
                <Button
                  size="lg"
                  onClick={() => orderModal.openOrderModal()}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full"
                >
                  {t("heroCTAButton")}
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
