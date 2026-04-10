import type { LucideIcon } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

interface StepperFlowProps {
  steps: Step[]
}

export default function StepperFlow({ steps }: StepperFlowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
      {steps.map((step, i) => (
        <ScrollReveal key={step.title} delay={i * 0.15}>
          <div className="flex flex-col items-center text-center relative">
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-teal/40 to-teal/10" />
            )}
            <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center mb-4 text-lg font-bold relative z-10">
              {i + 1}
            </div>
            <step.icon className="w-8 h-8 text-teal mb-3" />
            <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
