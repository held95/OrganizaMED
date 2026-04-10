import SectionHeading from '../ui/SectionHeading'
import Marquee from '../ui/Marquee'
import { partners } from '../../data/partners'

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center w-36 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 px-4 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-900/30 shrink-0">
      <span className="font-heading font-semibold text-sm text-gray-500 dark:text-gray-400 hover:text-navy transition-colors text-center">{name}</span>
    </div>
  )
}

export default function Partners() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800" aria-label="Parceiros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Parceiros de Confianca" />
        <Marquee>
          {partners.map((p) => (
            <PartnerLogo key={p.name} name={p.name} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
