import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MarqueeProps {
  children: ReactNode
  speed?: number
}

export default function Marquee({ children, speed = 30 }: MarqueeProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className="flex flex-wrap justify-center gap-8">{children}</div>
  }

  return (
    <div className="overflow-hidden">
      <div className="flex w-max" style={{ animation: `marquee ${speed}s linear infinite` }}>
        <div className="flex items-center gap-16 px-8">{children}</div>
        <div className="flex items-center gap-16 px-8" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
