import type { LucideIcon } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export default function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md dark:shadow-gray-900/30 hover:shadow-lg hover:-translate-y-2 hover:border-t-[3px] hover:border-teal transition-all duration-300 group">
        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
          <Icon className="w-6 h-6 text-teal" />
        </div>
        <h3 className="font-heading text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </ScrollReveal>
  )
}
