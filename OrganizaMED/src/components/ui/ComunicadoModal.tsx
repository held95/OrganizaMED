import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText } from 'lucide-react'

export default function ComunicadoModal() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-pointer"
              aria-label="Fechar comunicado"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <h2 className="mb-2 font-heading text-2xl font-bold text-navy dark:text-white">
                Institucional
              </h2>

              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Clique em um dos documentos abaixo para visualizar.
              </p>

              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    window.open('/convocacao-30-04-2026.pdf', '_blank', 'noopener,noreferrer')
                  }
                  className="flex flex-1 flex-col items-center gap-3 rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:border-teal hover:bg-teal-50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer dark:border-gray-600 dark:hover:border-teal dark:hover:bg-teal/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                    <FileText size={28} className="text-teal" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Convocação dia 30 de abril
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
