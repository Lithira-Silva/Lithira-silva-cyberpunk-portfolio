import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import FloatingResumeButton from '@/components/FloatingResumeButton'

export default function Home() {
  return (
    <main id="main-content" className="bg-black text-white">
      <Header />
      <FloatingResumeButton />
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Skills />
      <Contact />
    </main>
  )
}