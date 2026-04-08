import ScrollReveal from './ScrollReveal'

interface TimelineItem {
  year: string
  title: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-8 border-l-2 border-teal/30">
      {items.map((item, i) => (
        <ScrollReveal key={item.year} delay={i * 0.15} direction="right">
          <div className="relative mb-8 last:mb-0">
            <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-teal border-2 border-white dark:border-gray-800" />
            <div className="text-teal font-bold text-sm">{item.year}</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium mt-1">{item.title}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
