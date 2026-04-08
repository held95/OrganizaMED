import { CalendarCheck, Stethoscope, FileSearch, Activity } from 'lucide-react'
import type { HowItWorksStep } from '../types'

export const steps: HowItWorksStep[] = [
  {
    icon: CalendarCheck,
    title: 'Agende',
    description: 'Escolha o melhor horario para sua consulta online ou presencial.',
  },
  {
    icon: Stethoscope,
    title: 'Consulte',
    description: 'Seja atendido por nossos especialistas qualificados.',
  },
  {
    icon: FileSearch,
    title: 'Diagnostique',
    description: 'Receba seu diagnostico com precisao e agilidade.',
  },
  {
    icon: Activity,
    title: 'Acompanhe',
    description: 'Monitore sua saude com acompanhamento continuo.',
  },
]
