import { FileText, ExternalLink } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import { publications } from '../../data/publications'

export default function PublicacoesInstitucionais() {
  return (
    <section
      id="publicacoes"
      className="py-20 bg-offwhite dark:bg-gray-900"
      aria-labelledby="publicacoes-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Publicações Institucionais"
            subtitle="Documentos oficiais para acionistas e interessados"
            id="publicacoes-heading"
          />
        </ScrollReveal>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          {publications.map((pub, i) => (
            <ScrollReveal key={pub.pdfUrl} delay={i * 0.15}>
              <a
                href={pub.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 transition-colors group-hover:bg-teal/20">
                  <FileText size={32} className="text-teal" />
                </div>

                <h3 className="mb-2 text-center font-heading text-lg font-bold text-gray-900 dark:text-gray-100">
                  {pub.title}
                </h3>

                <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  {pub.description}
                </p>

                <span className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 font-semibold text-white transition-all duration-200 group-hover:bg-teal-dark group-hover:scale-[1.02]">
                  Abrir Documento
                  <ExternalLink size={16} />
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
