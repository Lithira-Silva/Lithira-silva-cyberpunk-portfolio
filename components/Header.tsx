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
    link.href = '/resume/Lithira Silva  - CV Original.pdf'
    link.download = 'Lithira-Silva-CV.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 overflow-hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        backdropFilter: scrolled 
          ? 'blur(25px) saturate(160%) brightness(1.02)' 
          : 'blur(20px) saturate(140%) brightness(1.01)',
        WebkitBackdropFilter: scrolled 
          ? 'blur(25px) saturate(160%) brightness(1.02)' 
          : 'blur(20px) saturate(140%) brightness(1.01)',
        background: scrolled 
          ? `
            radial-gradient(ellipse at top, rgba(0, 255, 255, 0.04) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 255, 255, 0.03) 25%, rgba(0, 200, 255, 0.02) 50%, rgba(0, 150, 255, 0.015) 75%, rgba(0, 0, 0, 0.6) 100%),
            linear-gradient(90deg, rgba(0, 255, 255, 0.008) 0%, rgba(0, 255, 255, 0.015) 50%, rgba(0, 255, 255, 0.008) 100%)
          `
          : `
            radial-gradient(ellipse at top, rgba(0, 255, 255, 0.02) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 255, 255, 0.015) 30%, rgba(0, 200, 255, 0.008) 60%, rgba(0, 0, 0, 0.35) 100%),
            linear-gradient(90deg, rgba(0, 255, 255, 0.004) 0%, rgba(0, 255, 255, 0.008) 50%, rgba(0, 255, 255, 0.004) 100%)
          `,
        borderBottom: scrolled 
          ? '1px solid rgba(0, 255, 255, 0.08)' 
          : '1px solid rgba(0, 255, 255, 0.04)',
        boxShadow: scrolled 
          ? `
            0 15px 50px rgba(0, 0, 0, 0.4),
            0 8px 25px rgba(0, 255, 255, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            inset 0 -1px 0 rgba(0, 255, 255, 0.04),
            0 0 80px rgba(0, 255, 255, 0.01)
          `
          : `
            0 8px 25px rgba(0, 0, 0, 0.2),
            0 4px 15px rgba(0, 255, 255, 0.02),
            inset 0 1px 0 rgba(255, 255, 255, 0.015),
            inset 0 -1px 0 rgba(0, 255, 255, 0.02),
            0 0 40px rgba(0, 255, 255, 0.008)
          `
      }}
    >
      {/* Liquid Glass Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary liquid glass layer */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 200, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.01) 0%, transparent 50%)
            `,
            filter: 'blur(1px)'
          }}
        />
        
        {/* Secondary liquid refraction layer */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(0, 255, 255, 0.015) 50%, transparent 60%)
            `,
            filter: 'blur(0.5px)'
          }}
        />
        
        {/* Liquid flow animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(0, 255, 255, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(0, 255, 255, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(0, 255, 255, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.03) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ filter: 'blur(2px)' }}
        />
      </div>

      {/* Enhanced ambient glow line */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-700 ${
          scrolled ? 'opacity-25' : 'opacity-15'
        }`}
        style={{
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              rgba(0, 255, 255, 0.15) 10%, 
              rgba(0, 255, 255, 0.4) 25%, 
              rgba(0, 255, 255, 0.6) 50%, 
              rgba(0, 255, 255, 0.4) 75%, 
              rgba(0, 255, 255, 0.15) 90%, 
              transparent 100%
            )
          `,
          boxShadow: `
            0 0 15px rgba(0, 255, 255, 0.2),
            0 0 30px rgba(0, 255, 255, 0.1),
            0 0 45px rgba(0, 255, 255, 0.05)
          `,
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Liquid glass surface highlights */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
      <div className="absolute top-1 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40" />
      
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <motion.div
            className="flex-shrink-0 z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => scrollToSection('#home', 'home')}
              className="group relative flex items-center transition-all duration-300"
            >
              {/* Logo background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-cyan-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-110" />
              
              <div className="relative px-4 py-3 rounded-xl transition-all duration-300 group-hover:bg-white/5">
                <span className="font-orbitron font-bold text-white text-xl tracking-wide relative">
                  Lithira
                  <span className="text-cyan-400 ml-1 relative">
                    Silva
                    {/* Text glow effect */}
                    <span className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300">
                      Silva
                    </span>
                  </span>
                </span>
              </div>
            </button>
          </motion.div>

          {/* Enhanced Desktop Navigation with Liquid Glass */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div 
              className="relative flex items-center space-x-1 px-6 py-3 rounded-2xl overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.04) 50%, rgba(0, 0, 0, 0.45) 100%),
                  radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.04) 0%, transparent 50%),
                  radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
                `,
                backdropFilter: 'blur(15px) saturate(140%) brightness(1.02)',
                WebkitBackdropFilter: 'blur(15px) saturate(140%) brightness(1.02)',
                border: '1px solid rgba(0, 255, 255, 0.08)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  0 4px 16px rgba(0, 255, 255, 0.04),
                  inset 0 1px 0 rgba(255, 255, 255, 0.03),
                  inset 0 -1px 0 rgba(0, 255, 255, 0.04)
                `
              }}
            >
              {/* Liquid glass surface effects */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Primary liquid layer */}
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `
                      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
                      linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)
                    `,
                    filter: 'blur(1px)'
                  }}
                />
                
                {/* Flowing liquid animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(0, 255, 255, 0.05) 0%, transparent 50%)',
                      'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, transparent 50%)',
                      'linear-gradient(225deg, rgba(0, 255, 255, 0.05) 0%, transparent 50%)',
                      'linear-gradient(315deg, rgba(0, 255, 255, 0.05) 0%, transparent 50%)',
                      'linear-gradient(45deg, rgba(0, 255, 255, 0.05) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ filter: 'blur(1.5px)' }}
                />
              </div>
              
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.id)}
                  className={`relative font-mono text-sm font-medium transition-all duration-300 group px-3 py-2 z-10 ${
                    activeSection === item.id 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -1
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 tracking-wide">
                    {item.name}
                  </span>
                  
                  {/* Clean underline for active state */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="activeUnderline"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Clean underline for hover state */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-white/60 transition-all duration-300 ${
                      activeSection !== item.id 
                        ? 'scale-x-0 group-hover:scale-x-100'
                        : 'scale-x-0'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Enhanced Social Links & Resume - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Premium Resume Button */}
            <motion.button
              onClick={handleDownloadResume}
              className="group relative inline-flex items-center justify-center px-5 py-2.5 font-mono font-semibold text-sm text-black rounded-xl transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.9) 0%, rgba(0, 230, 230, 1) 50%, rgba(0, 200, 255, 0.9) 100%)',
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 35px rgba(0, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} className="mr-2 relative z-10" />
              <span className="relative z-10 tracking-wide">Resume</span>
              
              {/* Animated background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" />
            </motion.button>

            {/* Elegant Social Links */}
            <div className="flex items-center space-x-2 ml-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 text-gray-400 hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-white/5 backdrop-blur-sm"
                  style={{
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 255, 255, 0.1)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.15)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon size={18} className="relative z-10" />
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-md" />
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm text-cyan-400 text-xs font-mono rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-cyan-400/20">
                    {link.name}
                  </div>
                  
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
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
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href, item.id)}
                    className={`block w-full text-left px-4 py-3 font-mono text-base transition-all duration-300 rounded-lg touch-manipulation ${
                      activeSection === item.id
                        ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5 border border-transparent'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ minHeight: '48px' }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                {/* Mobile Resume Button */}
                <motion.button
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center px-4 py-4 font-mono text-base text-black rounded-lg transition-all duration-300 mt-4 touch-manipulation"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.9) 0%, rgba(0, 230, 230, 1) 50%, rgba(0, 200, 255, 0.9) 100%)',
                    minHeight: '52px'
                  }}
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
                <div className="flex items-center justify-center space-x-8 pt-6 border-t border-cyan-400/10">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 rounded-lg touch-manipulation"
                      style={{ minHeight: '48px', minWidth: '48px' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon size={22} />
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