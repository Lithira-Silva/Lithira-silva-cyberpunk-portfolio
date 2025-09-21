'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Server, Smartphone, Brain, Cloud, Settings, Monitor, Database, Cpu, Zap, Shield, Globe, type LucideIcon } from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'cloud' | 'tools'
  icon: LucideIcon
  featured: boolean
}

// Streamlined skills data - only featured/most important skills
const skills: Skill[] = [
  // Featured Frontend Technologies
  { name: 'React/Next.js', level: 95, category: 'frontend', icon: Code, featured: true },
  { name: 'TypeScript', level: 92, category: 'frontend', icon: Monitor, featured: true },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: Globe, featured: true },

  // Featured Backend Technologies  
  { name: 'Node.js', level: 89, category: 'backend', icon: Server, featured: true },
  { name: 'Express.js', level: 87, category: 'backend', icon: Zap, featured: true },
  { name: 'MongoDB', level: 85, category: 'backend', icon: Database, featured: true },

  // Featured Mobile Development
  { name: 'Kotlin', level: 87, category: 'mobile', icon: Smartphone, featured: true },
  { name: 'Android SDK', level: 83, category: 'mobile', icon: Cpu, featured: true },

  // Featured AI/ML Technologies
  { name: 'ChatGPT/OpenAI', level: 93, category: 'ai', icon: Brain, featured: true },
  { name: 'Prompt Engineering', level: 91, category: 'ai', icon: Zap, featured: true },

  // Featured Cloud & DevOps
  { name: 'AWS', level: 84, category: 'cloud', icon: Cloud, featured: true },
  { name: 'DevOps/CI/CD', level: 83, category: 'cloud', icon: Settings, featured: true },

  // Featured Development Tools
  { name: 'Git/GitHub', level: 93, category: 'tools', icon: Settings, featured: true },
  { name: 'Vercel', level: 88, category: 'tools', icon: Shield, featured: true }
]

const categoryColors = {
  frontend: '#00FFFF',
  backend: '#FF6B6B', 
  mobile: '#4ECDC4',
  ai: '#9B59B6',
  cloud: '#FFE66D',
  tools: '#95A5A6'
}

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  ai: 'AI/ML',
  cloud: 'Cloud',
  tools: 'Tools'
}

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Code,
  backend: Server,
  mobile: Smartphone,
  ai: Brain,
  cloud: Cloud,
  tools: Settings
}

function SkillCard({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = skill.icon

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="h-full p-5 rounded-lg transition-all duration-300 hover:scale-[1.02] border relative overflow-hidden group"
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, ${categoryColors[skill.category]}12 40%, rgba(5, 5, 5, 0.98) 100%)`
            : 'linear-gradient(135deg, rgba(15, 15, 15, 0.90) 0%, rgba(0, 255, 255, 0.03) 35%, rgba(8, 8, 8, 0.92) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderColor: isHovered ? `${categoryColors[skill.category]}60` : 'rgba(100, 100, 100, 0.20)',
          boxShadow: isHovered 
            ? `0 8px 32px ${categoryColors[skill.category]}20, 0 0 0 1px ${categoryColors[skill.category]}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Skill Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div 
            className="p-2 rounded-lg flex-shrink-0"
            style={{
              background: `${categoryColors[skill.category]}15`,
              border: `1px solid ${categoryColors[skill.category]}30`
            }}
          >
            <IconComponent 
              size={20} 
              color={categoryColors[skill.category]}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-orbitron font-bold text-white text-sm leading-tight truncate mb-1">
              {skill.name}
            </h3>
            <span 
              className="text-xs font-mono font-medium uppercase tracking-wide"
              style={{ color: `${categoryColors[skill.category]}CC` }}
            >
              {categoryLabels[skill.category]}
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-gray-400">Proficiency</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i < Math.floor(skill.level / 20) 
                      ? categoryColors[skill.category] 
                      : 'rgba(100, 100, 100, 0.3)'
                  }}
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.5 + i * 0.1 }}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-800/40 rounded-full h-0.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${categoryColors[skill.category]} 0%, ${categoryColors[skill.category]}80 100%)`
              }}
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.5, delay: index * 0.05 + 0.5 }}
            />
          </div>
        </div>

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${categoryColors[skill.category]}08 0%, transparent 60%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 section-padding bg-black relative overflow-hidden"
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Technical <span className="text-cyan-400">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            Core technologies mastering full-stack development, mobile applications, 
            AI integration, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Skills Grid - Polished Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Category Legend - Enhanced */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {Object.entries(categoryLabels).map(([key, label]) => {
            const IconComponent = categoryIcons[key as keyof typeof categoryIcons]
            return (
              <div 
                key={key} 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg border"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(0, 255, 255, 0.02) 50%, rgba(5, 5, 5, 0.9) 100%)',
                  backdropFilter: 'blur(10px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(120%)',
                  borderColor: 'rgba(80, 80, 80, 0.3)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                }}
              >
                <div 
                  className="p-1.5 rounded"
                  style={{
                    background: `${categoryColors[key as keyof typeof categoryColors]}15`,
                    border: `1px solid ${categoryColors[key as keyof typeof categoryColors]}25`
                  }}
                >
                  <IconComponent 
                    size={14} 
                    color={categoryColors[key as keyof typeof categoryColors]}
                  />
                </div>
                <span className="text-gray-300 font-mono text-sm font-medium">{label}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}