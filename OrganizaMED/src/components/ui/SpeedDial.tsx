import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Mail, MessageSquare, X } from 'lucide-react'

const actions = [
  { icon: Phone, label: 'Ligar', href: 'tel:+551134567890', color: 'bg-green-500' },
  { icon: Mail, label: 'Email', href: 'mailto:contato@organizamed.com.br', color: 'bg-blue-500' },
  { icon: MessageSquare, label: 'WhatsApp', href: 'https://wa.me/551134567890', color: 'bg-emerald-500' },
]

export default function SpeedDial() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fechar opcoes de contato' : 'Abrir opcoes de contato'}
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-teal text-white shadow-lg hover:bg-teal-dark transition-all flex items-center justify-center cursor-pointer"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <div className="flex flex-col gap-3">
            {actions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-12 h-12 rounded-full ${action.color} text-white shadow-md flex items-center justify-center hover:scale-110 transition-transform`}
                aria-label={action.label}
              >
                <action.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
