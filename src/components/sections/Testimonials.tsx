import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'
import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'
import ScrollReveal from '../ui/ScrollReveal'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="depoimentos" className="py-20 bg-offwhite dark:bg-gray-900" aria-labelledby="depoimentos-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="depoimentos-heading"
          title="O que Nossos Pacientes Dizem"
          subtitle="Depoimentos reais de quem confia na OrganizaMed"
        />
        <ScrollReveal>
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carousel" aria-label="Depoimentos de pacientes">
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2" role="group" aria-roledescription="slide" aria-label={`Depoimento ${i + 1} de ${testimonials.length}`}>
                    <TestimonialCard {...t} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={scrollPrev} aria-label="Depoimento anterior" className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-teal hover:text-white hover:border-teal transition-colors cursor-pointer dark:text-gray-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} aria-label="Proximo depoimento" className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-teal hover:text-white hover:border-teal transition-colors cursor-pointer dark:text-gray-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
