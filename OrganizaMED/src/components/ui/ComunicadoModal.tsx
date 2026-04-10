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
            className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-pointer"
              aria-label="Fechar comunicado"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
                <FileText size={32} className="text-teal" />
              </div>

              <h2 className="mb-2 font-heading text-2xl font-bold text-navy dark:text-white">
                Comunicado
              </h2>

              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Clique no botão abaixo para visualizar o comunicado.
              </p>

              <button
                onClick={() =>
                  window.open('/comunicado.pdf', '_blank', 'noopener,noreferrer')
                }
                className="w-full rounded-lg bg-teal px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Abrir Comunicado
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
