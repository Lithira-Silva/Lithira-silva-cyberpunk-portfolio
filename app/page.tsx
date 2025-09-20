import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main id="main-content" className="bg-black text-white">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}