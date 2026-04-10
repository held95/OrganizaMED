import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'

export default function HighlightBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal to-navy text-white text-center" aria-label="Chamada para acao">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-4">
            Pronto para Cuidar da Sua Saude?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Transforme a gestao da sua operacao de saude com a OrganizaMed
          </p>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
            Agende sua Consulta
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
