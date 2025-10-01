'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
}

// Cyberpunk typing animation texts
const typingTexts = [
  "Full-Stack AI Engineer | Crafting Intelligent Systems That Scale",
  "Building Scalable Intelligent Systems with MERN & AWS",
  "Machine Learning Engineer | Transforming Data into Intelligence", 
  "Cloud Architect | Designing Tomorrow's Digital Infrastructure",
  "DevOps Engineer | Automating the Future with Docker & Kubernetes",
  "Full-Stack Developer | Creating Seamless User Experiences"
]

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
  const animationRef = useRef<number | undefined>(undefined)

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

function TypingAnimation() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const targetText = typingTexts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1))
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
        }
      }
    }, isDeleting ? 50 : Math.random() * 100 + 50) // Variable speed for realistic typing

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="relative">
      {currentText}
      <span 
        className={`inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-8 xl:h-10 2xl:h-12 bg-cyan-400 ml-1 transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animation: 'glow 1.5s ease-in-out infinite alternate' }}
      />
    </span>
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
    <section id="home" className="relative flex items-center justify-center min-h-screen pt-24 overflow-hidden bg-black md:pt-20 lg:pt-16">
      {/* Animated Background */}
      <AnimatedParticles />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl px-4 py-8 mx-auto text-center sm:px-6 sm:py-12 lg:py-16">
        <motion.h1
          className="mb-6 text-3xl font-black leading-tight font-orbitron sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl sm:mb-8 lg:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="block mb-2 text-white">Lithira Silva:</span>
          <span className="block text-transparent bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text">
            Architect of Tomorrow's Code
          </span>
        </motion.h1>

        <motion.h2
          className="font-mono text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-300 mb-12 sm:mb-16 lg:mb-12 leading-relaxed max-w-4xl mx-auto min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[4rem] lg:min-h-[5rem] xl:min-h-[6rem] px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <TypingAnimation />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button
            onClick={scrollToProjects}
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono text-sm font-medium text-white transition-all duration-300 border-2 rounded-lg group sm:px-8 sm:py-4 sm:text-base border-cyan-400/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(15px) saturate(180%)',
              WebkitBackdropFilter: 'blur(15px) saturate(180%)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 255, 255, 0.1)'
            }}
          >
            <span className="relative z-10 mr-2">View Projects</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <ChevronDown size={18} />
            </motion.div>
            {/* Hover glass effect */}
            <div
              className="absolute inset-0 transition-all duration-300 rounded-lg opacity-0 bg-gradient-to-r from-cyan-400/30 to-cyan-500/20 group-hover:opacity-100"
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            />
            {/* Glass shine effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16 lg:mt-12"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="w-5 h-8 p-1 border-2 border-gray-400 rounded-full sm:w-6 sm:h-10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-cyan-400 rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
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