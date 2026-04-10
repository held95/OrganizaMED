import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import StatItem from '../ui/StatItem'
import { stats } from '../../data/stats'

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-navy" aria-label="Estatisticas">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
