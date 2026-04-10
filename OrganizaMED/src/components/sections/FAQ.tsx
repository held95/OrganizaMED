import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import FAQItem from '../ui/FAQItem'
import ScrollReveal from '../ui/ScrollReveal'
import { faqItems } from '../../data/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-offwhite dark:bg-gray-900" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading id="faq-heading" title="Perguntas Frequentes" subtitle="Tire suas duvidas sobre nossos servicos" />
        <ScrollReveal>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 md:p-8">
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
