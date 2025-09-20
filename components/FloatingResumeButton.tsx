'use client'

import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import { useState } from 'react'

export default function FloatingResumeButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a')
    link.href = '/resume/Lithira-Silva-Resume.pdf'
    link.download = 'Lithira-Silva-Resume.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3 }}
    >
      <motion.button
        onClick={handleDownloadResume}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center bg-black/80 backdrop-blur-md border border-cyan-400/30 rounded-full transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
        whileHover={{ scale: 1.05, x: 10 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
        }}
      >
        {/* Icon Container */}
        <div className="w-14 h-14 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FileText size={24} className="text-cyan-400" />
          </motion.div>
        </div>

        {/* Expandable Text */}
        <motion.div
          className="overflow-hidden whitespace-nowrap"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 flex items-center">
            <span className="font-mono text-sm text-white mr-2">
              Download Resume
            </span>
            <Download size={16} className="text-cyan-400" />
          </div>
        </motion.div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -10 
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-black/90 backdrop-blur-md border border-cyan-400/30 rounded-lg px-3 py-2">
          <p className="font-mono text-xs text-white whitespace-nowrap">
            Get my latest resume
          </p>
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2">
            <div className="w-2 h-2 bg-black/90 border-l border-b border-cyan-400/30 rotate-45"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}