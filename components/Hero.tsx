'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mail } from 'lucide-react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: canvasHeight + 50,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: -Math.random() * 2 - 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    life: Math.random() * 0.5 + 0.5,
  }
}

function AnimatedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    particlesRef.current = Array.from({ length: 50 }, () =>
      createParticle(canvas.width, canvas.height)
    )

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          life: particle.life - 0.001,
          opacity: particle.opacity * particle.life,
        }))
        .filter((particle) => particle.life > 0 && particle.y > -50)

      // Add new particles
      while (particlesRef.current.length < 50) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height))
      }

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#00FFFF'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

function FloatingContactIcon() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 sm:bottom-8 sm:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={() => {
          const contactSection = document.getElementById('contact')
          contactSection?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-black shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
        aria-label="Contact me"
      >
        <Mail size={24} />
      </button>
    </motion.div>
  )
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <AnimatedParticles />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.h1
          className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="block text-white">Lithira Silva:</span>
          <span className="block bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent">
            Architect of Tomorrow's Code
          </span>
        </motion.h1>

        <motion.h2
          className="font-mono text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Full-Stack AI Engineer | Crafting Intelligent Systems That Scale
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-medium text-white bg-transparent border-2 border-cyan-400 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            }}
          >
            <span className="mr-2">View Projects</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={20} />
            </motion.div>
            <div
              className="absolute inset-0 rounded-lg bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              aria-hidden="true"
            />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full p-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-cyan-400 rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Contact Icon */}
      <FloatingContactIcon />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />
    </section>
  )
}