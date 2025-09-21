'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Download, FileText } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Certificates', href: '#certificates', id: 'certificates' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Lithira-Silva', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/lithira-silva-20b42a370', icon: Linkedin },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Get current scroll position
      const scrollPosition = window.scrollY + 100 // Offset for header height
      
      // Check which section is currently in view
      const sections = ['home', 'about', 'projects', 'certificates', 'skills', 'contact']
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          const elementBottom = elementTop + rect.height
          
          // Check if current scroll position is within this section
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Call once on mount to set initial state
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string, sectionId: string) => {
    if (href.startsWith('#')) {
      // Check if we're on the homepage first
      if (window.location.pathname !== '/') {
        // If not on homepage, navigate to homepage with hash
        window.location.href = '/' + href
      } else {
        // If on homepage, scroll to section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(sectionId)
        }
      }
      setIsOpen(false)
    } else {
      // For page routes, use window.location
      window.location.href = href
    }
  }

  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a')
    link.href = '/resume/Lithira-Silva-Resume.pdf' // You'll need to add your resume PDF to public/resume/
    link.download = 'Lithira-Silva-Resume.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-xl shadow-lg shadow-cyan-400/5' 
          : 'bg-black/10 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)',
        background: scrolled 
          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.4) 100%)'
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.2) 100%)',
        boxShadow: scrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.2)'
          : '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => scrollToSection('#home', 'home')}
              className="group flex items-center space-x-2"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="font-orbitron font-black text-black text-lg relative z-10">LS</span>
                  {/* Glass overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                    style={{
                      backdropFilter: 'blur(1px)',
                      WebkitBackdropFilter: 'blur(1px)'
                    }}
                  />
                  {/* Highlight */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/30 rounded-full blur-sm" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-orbitron font-bold text-white text-lg">
                  Lithira<span className="text-cyan-400">Silva</span>
                </span>
              </div>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.id)}
                  className={`relative font-mono text-sm transition-all duration-300 group px-3 py-2 rounded-lg ${
                    activeSection === item.id 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Glass background on hover */}
                  <div 
                    className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <span className="relative z-10">{item.name}</span>
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social Links & Resume - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Download Resume Button */}
            <motion.button
              onClick={handleDownloadResume}
              className="group relative inline-flex items-center justify-center px-4 py-2 font-mono font-medium text-sm text-white border border-cyan-400/50 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black mr-2 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} className="mr-2 relative z-10" />
              <span className="relative z-10">Resume</span>
              {/* Hover glass effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)'
                }}
              />
              {/* Glass shine effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </motion.button>

            {/* Social Links */}
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={18} />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-black/30 backdrop-blur-xl border-t border-cyan-400/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(0, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-cyan-400/20">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href, item.id)}
                    className={`block w-full text-left px-3 py-2 font-mono text-base transition-all duration-300 rounded-md ${
                      activeSection === item.id
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                {/* Mobile Resume Button */}
                <motion.button
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center px-3 py-3 font-mono text-base text-white bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-md hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} className="mr-2" />
                  Download Resume
                </motion.button>
                
                {/* Mobile Social Links */}
                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-cyan-400/10">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon size={20} />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}