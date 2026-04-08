import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export interface Stat {
  end: number
  suffix: string
  label: string
  icon: LucideIcon
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
}

export interface FAQItemData {
  question: string
  answer: string
}

export interface Partner {
  name: string
}

export interface HowItWorksStep {
  icon: LucideIcon
  title: string
  description: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
