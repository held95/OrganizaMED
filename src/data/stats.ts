import { UserCheck, Stethoscope, Award, ThumbsUp } from 'lucide-react'
import type { Stat } from '../types'

export const stats: Stat[] = [
  { end: 1500, suffix: '+', label: 'Pacientes Atendidos', icon: UserCheck },
  { end: 50, suffix: '+', label: 'Medicos Especialistas', icon: Stethoscope },
  { end: 20, suffix: '+', label: 'Anos de Experiencia', icon: Award },
  { end: 99, suffix: '%', label: 'Taxa de Satisfacao', icon: ThumbsUp },
]
