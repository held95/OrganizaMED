import { motion } from 'framer-motion'

interface HighlightTextProps {
  children: string
  delay?: number
}

export default function HighlightText({ children, delay = 0.5 }: HighlightTextProps) {
  return (
    <span className="relative inline-block">
      <motion.span
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ delay, duration: 0.6, ease: 'easeOut' }}
        className="absolute bottom-1 left-0 h-3 bg-teal/20 -z-10 rounded"
      />
      {children}
    </span>
  )
}
