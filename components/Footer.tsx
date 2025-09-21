'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink,
  Code2,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Heart,
  ArrowUp,
  Calendar,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Colombo',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    const footerElement = document.getElementById('footer')
    if (footerElement) observer.observe(footerElement)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/lithira-silva',
      color: 'hover:text-purple-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/lithira-silva',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:lithira.silva@example.com',
      color: 'hover:text-green-400'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ]

  const techStack = [
    { name: 'React/Next.js', icon: Code2 },
    { name: 'TypeScript', icon: Database },
    { name: 'Cloud Computing', icon: Cloud },
    { name: 'Mobile Dev', icon: Smartphone },
    { name: 'Web Development', icon: Globe }
  ]

  return (
    <footer 
      id="footer"
      className="relative bg-black border-t border-cyan-400/20 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-max py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="p-6 rounded-2xl backdrop-blur-md border border-cyan-400/20 group hover:border-cyan-400/40 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.8) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(15, 15, 15, 0.8) 100%)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Lithira Silva
                </h3>
                <p className="text-cyan-400 font-mono text-sm mb-4">
                  Full-Stack Developer & IT Student
                </p>
                <p className="text-gray-400 font-mono text-xs leading-relaxed mb-4">
                  Building tomorrow's digital solutions with cutting-edge technology and innovative thinking.
                </p>
                
                {/* Live Status */}
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{currentTime} LKT</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-orbitron font-bold text-lg text-white mb-6">
                Navigation
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 font-mono text-sm transition-all duration-300 flex items-center space-x-2 group"
                    >
                      <div className="w-1 h-1 bg-cyan-400/50 rounded-full group-hover:bg-cyan-400 transition-colors"></div>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-orbitron font-bold text-lg text-white mb-6">
                Tech Stack
              </h4>
              <ul className="space-y-3">
                {techStack.map((tech, index) => (
                  <motion.li 
                    key={tech.name}
                    className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <tech.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                    <span className="font-mono text-sm">{tech.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Resume */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-orbitron font-bold text-lg text-white mb-6">
                Get In Touch
              </h4>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-400 font-mono text-sm">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 font-mono text-sm">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Available for opportunities</span>
                </div>
              </div>

              {/* Resume Download */}
              <motion.a
                href="/resume/lithira-silva-resume.pdf"
                download
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black px-4 py-3 rounded-lg font-mono font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25 mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.a>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-cyan-400/20 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:scale-110`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-cyan-400/20"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="container-max py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-500 font-mono text-sm">
                <span>© 2025 Lithira Silva. Powered by</span>
                <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                <span>and pure</span>
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>chaos</span>
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 font-mono text-sm transition-colors duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4 group-hover:transform group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer