'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Users, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { featuredProjects, type ProjectData } from '@/lib/projectData'

interface ProjectCardProps {
  project: ProjectData
  index: number
  isVisible: boolean
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-cyan-400 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Action Buttons */}
        <motion.div
          className="absolute top-4 right-4 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 transition-all duration-300 hover:scale-110"
            aria-label={`View ${project.title} live demo`}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 transition-all duration-300 hover:scale-110"
            aria-label={`View ${project.title} source code`}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <Github size={18} />
          </a>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-orbitron font-bold text-xl text-white mb-3 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-badge text-xs">
              {tech}
            </span>
          ))}
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
      className="py-20 md:py-32 section-padding bg-black"
    >
      <div className="container-max">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Featured <span className="text-cyan-400">Project</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive construction management platform showcasing full-stack development 
            expertise with advanced bidding systems and automated project oversight.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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