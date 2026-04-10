import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  id?: string
}

export default function SectionHeading({ title, subtitle, align = 'center', light, id }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left')}>
      <div className={cn('w-15 h-[3px] rounded-full mb-4', light ? 'bg-teal-light' : 'bg-teal', align === 'center' ? 'mx-auto' : '')} />
      <h2 id={id} className={cn('font-heading text-[clamp(1.875rem,4vw,2.25rem)] font-bold', light ? 'text-white' : 'text-gray-900 dark:text-gray-100')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 max-w-2xl text-lg', light ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400', align === 'center' ? 'mx-auto' : '')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
