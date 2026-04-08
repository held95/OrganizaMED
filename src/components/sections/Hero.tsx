import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import HighlightText from '../ui/HighlightText'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(44,162,76,0.08),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm uppercase tracking-[0.2em] text-teal-light font-medium mb-6"
        >
          Bem-vindo a OrganizaMed
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-tight mb-6"
        >
          <HighlightText delay={1.2}>Excelencia</HighlightText> em Servicos{' '}
          <br className="hidden md:block" />
          Medicos e Hospitalares
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Solucoes integradas para clinicas, hospitais e profissionais da saude
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
            Agende sua Consulta
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}>
            Nossos Servicos
          </Button>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  )
}
