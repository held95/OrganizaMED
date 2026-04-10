import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-offwhite dark:bg-gray-900" aria-labelledby="servicos-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="servicos-heading"
          title="Nossos Servicos"
          subtitle="Atuacao completa na gestao e execucao de servicos medicos"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
