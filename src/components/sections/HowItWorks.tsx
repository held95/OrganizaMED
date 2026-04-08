import SectionHeading from '../ui/SectionHeading'
import StepperFlow from '../ui/StepperFlow'
import { steps } from '../../data/howItWorks'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-offwhite dark:bg-gray-900" aria-labelledby="como-funciona-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="como-funciona-heading"
          title="Como Funciona"
          subtitle="Seu caminho para uma saude melhor em 4 passos simples"
        />
        <StepperFlow steps={steps} />
      </div>
    </section>
  )
}
