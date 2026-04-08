import { Globe, Share2, Briefcase, Rss, Phone, Mail, MapPin } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import { services } from '../../data/services'

const socials = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Share2, href: '#', label: 'Twitter' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
  { icon: Rss, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/logo.jpeg" alt="OrganizaMed" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Excelencia em servicos medicos e hospitalares. Solucoes integradas para clinicas e hospitais.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Links Rapidos</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-teal-light transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Servicos</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.title}>
                  <span className="text-gray-400 text-sm">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-teal-light" />
                Av. Brig. Faria Lima, 1811, Jardim Paulistano, Sao Paulo - SP, 01452-001
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-teal-light" />
                (11) 3456-7890
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-teal-light" />
                contato@organizamed.com.br
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        &copy; 2026 OrganizaMed | Servicos Medicos e Hospitalares
      </div>
    </footer>
  )
}
