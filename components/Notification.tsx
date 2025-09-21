'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X, Zap } from 'lucide-react'

interface NotificationProps {
  isVisible: boolean
  type: 'success' | 'error'
  title: string
  message: string
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

const Notification = ({ 
  isVisible, 
  type, 
  title, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: NotificationProps) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoClose, duration, onClose])

  const iconConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-cyan-500/20',
      borderColor: 'border-green-400/30',
      glowColor: 'shadow-green-400/25'
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-400/30',
      glowColor: 'shadow-red-400/25'
    }
  }

  const config = iconConfig[type]
  const Icon = config.icon

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md mx-4"
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.5 
          }}
        >
          <div
            className={`
              relative overflow-hidden rounded-2xl border ${config.borderColor} 
              backdrop-blur-xl shadow-2xl ${config.glowColor}
              bg-gradient-to-br ${config.bgGradient}
            `}
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(0, 0, 0, 0.9) 0%, 
                  rgba(0, 255, 255, 0.08) 30%, 
                  rgba(15, 15, 15, 0.95) 70%,
                  rgba(0, 0, 0, 0.9) 100%
                )
              `,
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.6),
                0 0 30px ${type === 'success' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 100, 0.2)'},
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 80%, cyan 1px, transparent 1px),
                    radial-gradient(circle at 80% 20%, cyan 1px, transparent 1px),
                    radial-gradient(circle at 40% 40%, cyan 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px, 30px 30px, 70px 70px'
                }}
              />
            </div>

            {/* Glowing Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, 
                  transparent, 
                  ${type === 'success' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 100, 0.2)'}, 
                  transparent
                )`,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Content */}
            <div className="relative p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon with glow effect */}
                <motion.div
                  className={`flex-shrink-0 ${config.color}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div 
                    className="p-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, 
                        ${type === 'success' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 100, 0.2)'} 0%, 
                        transparent 70%
                      )`,
                      boxShadow: `0 0 20px ${type === 'success' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 0, 100, 0.3)'}`
                    }}
                  >
                    <Icon size={24} />
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <motion.h4
                    className="font-orbitron font-bold text-lg text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {title}
                  </motion.h4>
                  <motion.p
                    className="font-mono text-sm text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {message}
                  </motion.p>
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Progress Bar for Auto-close */}
              {autoClose && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                />
              )}

              {/* Floating Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 ${config.color} rounded-full opacity-60`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notification