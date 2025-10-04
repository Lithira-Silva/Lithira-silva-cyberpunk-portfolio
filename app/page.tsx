import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingResumeButton from '@/components/FloatingResumeButton'

export default function Home() {
  return (
    <main id="main-content" className="text-white bg-black">
      <Header />
      <FloatingResumeButton />
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}