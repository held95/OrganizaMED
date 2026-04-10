import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { navLinks } from '../../data/navigation'
import Button from '../ui/Button'
import MobileMenu from '../ui/MobileMenu'
import ColorModeToggle from '../ui/ColorModeToggle'
import { cn } from '../../lib/cn'

export default function Header() {
  const scrollY = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > 50

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm dark:shadow-gray-900/30' : 'bg-transparent',
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="OrganizaMed" className="h-10 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={cn(
              'text-sm font-medium transition-colors hover:text-teal',
              isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white/90',
            )}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <ColorModeToggle />
          <Button size="sm" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
            Agende Consulta
          </Button>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <ColorModeToggle />
          <button onClick={() => setMenuOpen(true)} aria-label="Abrir menu" className={cn('p-2 cursor-pointer', isScrolled ? 'text-navy dark:text-white' : 'text-white')}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </header>
  )
}
