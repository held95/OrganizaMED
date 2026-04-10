import { Building2, Users, HeartPulse, Monitor } from 'lucide-react'
import type { Service } from '../types'

export const services: Service[] = [
  {
    icon: Building2,
    title: 'Gestao Hospitalar',
    description: 'Administracao eficiente de unidades de saude com tecnologia de ponta e processos otimizados.',
  },
  {
    icon: Users,
    title: 'Equipe Medica',
    description: 'Profissionais qualificados para diversas especialidades medicas com formacao continuada.',
  },
  {
    icon: HeartPulse,
    title: 'Procedimentos Cirurgicos',
    description: 'Organizacao e execucao de cirurgias com seguranca, precisao e acompanhamento completo.',
  },
  {
    icon: Monitor,
    title: 'Telemedicina',
    description: 'Atendimento remoto com tecnologia avancada, acessibilidade e praticidade para o paciente.',
  },
]
