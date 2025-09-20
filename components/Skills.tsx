'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'ai' | 'tools'
  icon: string
}

const skills: Skill[] = [
  { name: 'React/Next.js', level: 95, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 92, category: 'frontend', icon: '🟦' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: '🎨' },
  { name: 'Node.js', level: 94, category: 'backend', icon: '🟢' },
  { name: 'Python/Django', level: 96, category: 'backend', icon: '🐍' },
  { name: 'PostgreSQL', level: 88, category: 'backend', icon: '🐘' },
  { name: 'TensorFlow', level: 89, category: 'ai', icon: '🧠' },
  { name: 'PyTorch', level: 85, category: 'ai', icon: '🔥' },
  { name: 'OpenAI API', level: 91, category: 'ai', icon: '🤖' },
  { name: 'Docker', level: 87, category: 'tools', icon: '🐳' },
  { name: 'AWS/Cloud', level: 83, category: 'tools', icon: '☁️' },
  { name: 'Git/GitHub', level: 93, category: 'tools', icon: '📦' },
]

const categoryColors = {
  frontend: '#00FFFF',
  backend: '#FF6B6B',
  ai: '#4ECDC4',
  tools: '#FFE66D'
}

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  ai: 'AI/ML',
  tools: 'DevOps'
}

function SkillOrb({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate position in constellation pattern
  const angle = (index * 360) / skills.length
  const radius = 180 + (skill.level / 100) * 50
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative group">
        {/* Skill Orb */}
        <motion.div
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            borderColor: categoryColors[skill.category],
            backgroundColor: isHovered ? categoryColors[skill.category] : 'transparent',
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered
              ? `0 0 20px ${categoryColors[skill.category]}80`
              : `0 0 10px ${categoryColors[skill.category]}40`,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-2xl">{skill.icon}</span>
        </motion.div>

        {/* Progress Ring */}
        <svg
          className="absolute inset-0 w-16 h-16 -rotate-90"
          viewBox="0 0 64 64"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke={categoryColors[skill.category]}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
            animate={
              isVisible
                ? {
                    strokeDashoffset:
                      2 * Math.PI * 28 - (skill.level / 100) * 2 * Math.PI * 28,
                  }
                : {}
            }
            transition={{ duration: 1.5, delay: index * 0.1 }}
          />
        </svg>

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-black border border-gray-700 rounded-lg pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-white font-mono text-sm whitespace-nowrap text-center">
            <div className="font-bold">{skill.name}</div>
            <div className="text-xs" style={{ color: categoryColors[skill.category] }}>
              {skill.level}% • {categoryLabels[skill.category]}
            </div>
          </div>
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #374151',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function ConstellationLines({ isVisible }: { isVisible: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {skills.map((skill, index) => {
        const nextIndex = (index + 1) % skills.length
        const angle1 = (index * 360) / skills.length
        const angle2 = (nextIndex * 360) / skills.length
        const radius1 = 180 + (skill.level / 100) * 50
        const radius2 = 180 + (skills[nextIndex].level / 100) * 50
        
        const x1 = Math.cos((angle1 * Math.PI) / 180) * radius1
        const y1 = Math.sin((angle1 * Math.PI) / 180) * radius1
        const x2 = Math.cos((angle2 * Math.PI) / 180) * radius2
        const y2 = Math.sin((angle2 * Math.PI) / 180) * radius2

        return (
          <motion.line
            key={index}
            x1={`calc(50% + ${x1}px)`}
            y1={`calc(50% + ${y1}px)`}
            x2={`calc(50% + ${x2}px)`}
            y2={`calc(50% + ${y2}px)`}
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1 + index * 0.1 }}
          />
        )
      })}
    </svg>
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
      { threshold: 0.3 }
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Technical <span className="text-cyan-400">Constellation</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            A visual representation of my technical expertise across the full stack of modern development.
            Hover over each skill to see proficiency levels and categories.
          </p>
        </motion.div>

        {/* Skills Constellation */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-square relative min-h-[600px]">
            {/* Center Hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-cyan-400 bg-black flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              style={{
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>

            {/* Constellation Lines */}
            <ConstellationLines isVisible={isVisible} />

            {/* Skill Orbs */}
            {skills.map((skill, index) => (
              <SkillOrb
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: categoryColors[key as keyof typeof categoryColors] }}
              />
              <span className="text-gray-300 font-mono text-sm">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}