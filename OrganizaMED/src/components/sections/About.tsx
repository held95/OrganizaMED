import { Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import Timeline from '../ui/Timeline'

const differentials = [
  'Equipe certificada e em constante atualizacao',
  'Tecnologia de ponta em todos os processos',
  'Atendimento humanizado e personalizado',
  'Cobertura nacional com presenca em 10+ estados',
]

const timelineItems = [
  { year: '2010', title: 'Fundacao da OrganizaMed em Sao Paulo' },
  { year: '2015', title: 'Expansao para 10 estados brasileiros' },
  { year: '2019', title: 'Lancamento da plataforma de Telemedicina' },
  { year: '2024', title: 'Mais de 1.500 pacientes atendidos' },
]

export default function About() {
  return (
    <section id="sobre" className="py-20 bg-white dark:bg-gray-800" aria-labelledby="sobre-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal direction="left">
            <SectionHeading id="sobre-heading" title="Sobre a OrganizaMed" align="left" />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Somos uma empresa especializada em solucoes medicas e hospitalares, focada em eficiencia operacional, qualidade assistencial e inovacao tecnologica.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Com mais de uma decada de experiencia, a OrganizaMed transformou a gestao de dezenas de unidades de saude em todo o Brasil, sempre priorizando o bem-estar do paciente.
            </p>
            <ul className="space-y-3 mb-6">
              {differentials.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{d}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <Timeline items={timelineItems} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
