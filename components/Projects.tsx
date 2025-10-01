'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Users, Zap, TrendingUp, Calendar } from 'lucide-react'
import Image from 'next/image'
import { featuredProjects, type ProjectData } from '@/lib/projectData'

interface ProjectCardProps {
  project: ProjectData
  index: number
  isVisible: boolean
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showAllTechnologies, setShowAllTechnologies] = useState(false)

  return (
    <motion.div
      className="group h-full overflow-hidden rounded-xl transition-all duration-500 hover:scale-105"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.85) 0%, rgba(0, 255, 255, 0.08) 30%, rgba(10, 10, 10, 0.9) 100%)',
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        border: isHovered ? '1px solid rgba(0, 255, 255, 0.5)' : '1px solid rgba(115, 115, 115, 0.25)',
        boxShadow: isHovered 
          ? '0 25px 50px rgba(0, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 40px rgba(0, 255, 255, 0.1)' 
          : '0 15px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        
        {/* Enhanced visibility overlay for light images */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/40"></div>
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-cyan-400 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.03 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-4 text-xs font-mono">
          <div className="flex items-center space-x-2">
            {project.status === 'Live' && (
              <span 
                className="px-2 py-1 text-green-300 rounded-full border border-green-400/40 font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(34, 197, 94, 0.1) 100%)',
                  backdropFilter: 'blur(8px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(150%)',
                  boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                Live
              </span>
            )}
            {project.status === 'Completed' && (
              <span 
                className="px-2 py-1 text-blue-300 rounded-full border border-blue-400/40 font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(59, 130, 246, 0.1) 100%)',
                  backdropFilter: 'blur(8px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(150%)',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                Completed
              </span>
            )}
            <span 
              className="px-3 py-1 bg-cyan-400/15 text-cyan-400 rounded-full border border-cyan-400/30"
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0, 255, 255, 0.15)'
              }}
            >
              {project.category}
            </span>
          </div>
          <span className="text-gray-400 flex items-center">
            <Calendar size={12} className="mr-1" />
            {project.year}
          </span>
        </div>

        <h3 className="font-orbitron font-bold text-xl text-white mb-3 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Technologies with Expansion */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(showAllTechnologies ? project.technologies : project.technologies.slice(0, 4)).map((tech) => (
            <span key={tech} className="tech-badge text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <button
              onClick={() => setShowAllTechnologies(!showAllTechnologies)}
              className="px-3 py-1 text-xs text-cyan-400 rounded-full font-mono hover:text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 border border-cyan-400/30"
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0, 255, 255, 0.15)'
              }}
            >
              {showAllTechnologies 
                ? 'Show less' 
                : `+${project.technologies.length - 4} more`
              }
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          {project.links.liveHost && (
            <a
              href={project.links.liveHost}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-mono text-sm font-medium text-white transition-all duration-300 hover:scale-105 group/btn"
              aria-label={`View ${project.title} live hosted application`}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                border: '1px solid rgba(0, 255, 255, 0.4)',
                boxShadow: '0 4px 15px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <ExternalLink size={16} className="mr-2" />
              View Live
            </a>
          )}
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${project.links.liveHost ? 'flex-1' : 'w-full'} flex items-center justify-center px-4 py-3 rounded-lg font-mono text-sm font-medium text-white transition-all duration-300 hover:scale-105 group/btn`}
            aria-label={`View ${project.title} source code repository`}
            style={{
              background: 'linear-gradient(135deg, rgba(115, 115, 115, 0.15) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(115, 115, 115, 0.1) 100%)',
              backdropFilter: 'blur(12px) saturate(150%)',
              WebkitBackdropFilter: 'blur(12px) saturate(150%)',
              border: '1px solid rgba(115, 115, 115, 0.4)',
              boxShadow: '0 4px 15px rgba(115, 115, 115, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <Github size={16} className="mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-32 section-padding bg-black"
    >
      <div className="container-max">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
            Featured <span className="text-cyan-400">Project</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-cyan-400 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-300 font-mono text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive construction management platform showcasing full-stack development 
            expertise with advanced bidding systems and automated project oversight.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-medium text-white border-2 border-cyan-400/50 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
          >
            <span className="mr-2 relative z-10">View Project Details</span>
            <motion.div
              className="flex items-center relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ExternalLink size={20} />
            </motion.div>
            {/* Glass hover effect */}
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/25 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            />
            {/* Shine effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
          </a>
          <p className="text-gray-400 font-mono text-sm mt-4">
            Explore comprehensive project documentation and features
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-300 font-mono mb-6">
            Want to see more details or collaborate on something amazing?
          </p>
          <a
            href="https://github.com/Lithira-Silva"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-medium text-white border-2 border-cyan-400/60 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.18) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 255, 255, 0.12) 100%)',
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              boxShadow: '0 0 50px rgba(0, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 255, 255, 0.1)'
            }}
          >
            <Github className="mr-2 relative z-10" size={20} />
            <span className="relative z-10">View GitHub Profile</span>
            {/* Premium glass hover effect */}
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/30 via-white/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)'
              }}
            />
            {/* Multiple shine layers */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="absolute top-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}