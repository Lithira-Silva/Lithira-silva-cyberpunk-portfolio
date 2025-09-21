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
        className="h-full p-4 rounded-xl transition-all duration-500 hover:scale-105 border cursor-pointer"
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, ${categoryColors[skill.category]}15 30%, rgba(10, 10, 10, 0.95) 100%)`
            : 'linear-gradient(135deg, rgba(20, 20, 20, 0.85) 0%, rgba(0, 255, 255, 0.05) 30%, rgba(10, 10, 10, 0.9) 100%)',
          backdropFilter: 'blur(18px) saturate(160%)',
          WebkitBackdropFilter: 'blur(18px) saturate(160%)',
          borderColor: isHovered ? categoryColors[skill.category] : 'rgba(115, 115, 115, 0.25)',
          boxShadow: isHovered 
            ? `0 25px 50px ${categoryColors[skill.category]}25, inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 40px ${categoryColors[skill.category]}15`
            : '0 15px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Skill Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <IconComponent 
              size={20} 
              className="flex-shrink-0"
              color={categoryColors[skill.category]}
            />
            <div>
              <h3 className="font-orbitron font-bold text-white text-sm">{skill.name}</h3>
              <span 
                className="text-xs font-mono font-medium"
                style={{ color: categoryColors[skill.category] }}
              >
                {categoryLabels[skill.category]}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div 
              className="text-lg font-orbitron font-black"
              style={{ color: categoryColors[skill.category] }}
            >
              {skill.level}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: categoryColors[skill.category] }}
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.5, delay: index * 0.05 + 0.5 }}
            />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${categoryColors[skill.category]}10 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
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

        {/* Skills Grid - Compact Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Category Legend - Compact */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {Object.entries(categoryLabels).map(([key, label]) => {
            const IconComponent = categoryIcons[key as keyof typeof categoryIcons]
            return (
              <div key={key} className="flex items-center space-x-2">
                <IconComponent 
                  size={16} 
                  color={categoryColors[key as keyof typeof categoryColors]}
                />
                <span className="text-gray-300 font-mono text-sm">{label}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}