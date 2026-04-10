import SkipNav from './components/ui/SkipNav'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import HowItWorks from './components/sections/HowItWorks'
import PublicacoesInstitucionais from './components/sections/PublicacoesInstitucionais'
import Partners from './components/sections/Partners'
import HighlightBanner from './components/sections/HighlightBanner'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import SpeedDial from './components/ui/SpeedDial'
import ComunicadoModal from './components/ui/ComunicadoModal'

export default function App() {
  return (
    <>
      <ComunicadoModal />
      <SkipNav />
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Stats />
        <About />
        <HowItWorks />
        <PublicacoesInstitucionais />
        <Partners />
        <HighlightBanner />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <SpeedDial />
    </>
  )
}
