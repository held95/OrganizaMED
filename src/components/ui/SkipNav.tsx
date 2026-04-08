export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
    >
      Pular para conteudo principal
    </a>
  )
}
