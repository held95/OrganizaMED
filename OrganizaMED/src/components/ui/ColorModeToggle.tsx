import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ColorModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('organizamed-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('organizamed-theme', next ? 'dark' : 'light')
  }

  return (
    <button onClick={toggle} aria-label={dark ? 'Modo claro' : 'Modo escuro'} className="p-2 rounded-lg hover:bg-gray-100/10 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
