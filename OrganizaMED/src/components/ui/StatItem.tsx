import type { LucideIcon } from 'lucide-react'
import CountUpModule from 'react-countup'

const CountUp = typeof CountUpModule === 'object' && 'default' in CountUpModule
  ? (CountUpModule as unknown as { default: typeof CountUpModule }).default
  : CountUpModule
import { useInView } from 'react-intersection-observer'
import ProgressRing from './ProgressRing'

interface StatItemProps {
  end: number
  suffix: string
  label: string
  icon: LucideIcon
}

export default function StatItem({ end, suffix, label, icon: Icon }: StatItemProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <div ref={ref} className="flex flex-col items-center text-center text-white">
      <div className="relative mb-3">
        <ProgressRing progress={inView ? (suffix === '%' ? end : 100) : 0} size={80} strokeWidth={3} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-7 h-7 text-teal-light" />
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-bold font-heading">
        {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : `0${suffix}`}
      </div>
      <div className="text-gray-400 mt-1 text-sm">{label}</div>
    </div>
  )
}
