'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Users, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'AI-Powered E-Commerce Predictor',
    description: 'Real-time recommendation engine using collaborative filtering and deep learning to predict customer preferences with 94% accuracy.',
    image: '/project-1.jpg',
    technologies: ['React', 'Node.js', 'TensorFlow', 'PostgreSQL', 'AWS'],
    metrics: {
      users: '500k+',
      uptime: '99.9%',
      performance: '200ms avg response'
    },
    links: {
      live: 'https://demo.example.com',
      github: 'https://github.com/Lithira-Silva/ai-ecommerce'
    },
    featured: true
  },
  {
    id: 2,
    title: 'Real-Time Fraud Detection System',
    description: 'ML-powered fraud detection using ensemble models and real-time stream processing to identify suspicious transactions instantly.',
    image: '/project-2.jpg',
    technologies: ['Python', 'Kafka', 'scikit-learn', 'Redis', 'Docker'],
    metrics: {
      accuracy: '99.7%',
      processing: '10ms detection',
      savings: '$2M+ protected'
    },
    links: {
      live: 'https://fraud-demo.example.com',
      github: 'https://github.com/Lithira-Silva/fraud-detection'
    },
    featured: true
  },
  {
    id: 3,
    title: 'Intelligent Content Management',
    description: 'AI-driven CMS with automatic content categorization, sentiment analysis, and personalized content delivery.',
    image: '/project-3.jpg',
    technologies: ['Next.js', 'OpenAI API', 'MongoDB', 'Elasticsearch'],
    metrics: {
      content: '1M+ articles',
      engagement: '+45% CTR',
      automation: '80% faster'
    },
    links: {
      live: 'https://cms-demo.example.com',
      github: 'https://github.com/Lithira-Silva/ai-cms'
    },
    featured: true
  },
  {
    id: 4,
    title: 'Predictive Analytics Dashboard',
    description: 'Real-time business intelligence platform with predictive modeling and interactive data visualization.',
    image: '/project-4.jpg',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    metrics: {
      datapoints: '100M+',
      predictions: '92% accuracy',
      insights: 'Real-time'
    },
    links: {
      live: 'https://analytics-demo.example.com',
      github: 'https://github.com/Lithira-Silva/predictive-dashboard'
    },
    featured: false
  },
  {
    id: 5,
    title: 'Neural Network Trading Bot',
    description: 'Algorithmic trading system using LSTM networks and technical analysis for cryptocurrency market predictions.',
    image: '/project-5.jpg',
    technologies: ['Python', 'PyTorch', 'WebSocket', 'TimescaleDB'],
    metrics: {
      roi: '+127% YoY',
      trades: '10k+ executed',
      latency: '<1ms'
    },
    links: {
      live: 'https://trading-demo.example.com',
      github: 'https://github.com/Lithira-Silva/neural-trading'
    },
    featured: false
  },
  {
    id: 6,
    title: 'Smart City IoT Platform',
    description: 'Scalable IoT data processing platform with edge computing and real-time environmental monitoring.',
    image: '/project-6.jpg',
    technologies: ['Go', 'InfluxDB', 'Kubernetes', 'MQTT', 'Grafana'],
    metrics: {
      sensors: '50k+ connected',
      data: '1TB+ daily',
      cities: '12 deployed'
    },
    links: {
      live: 'https://iot-demo.example.com',
      github: 'https://github.com/Lithira-Silva/smart-city'
    },
    featured: false
  }
]

// Get only featured projects for homepage
const featuredProjects = projects.filter(project => project.featured)

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isVisible: boolean
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="project-card group h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
            className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300"
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300"
            aria-label={`View ${project.title} source code`}
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

        {/* Metrics */}
        <div className="space-y-2">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400 capitalize">{key}:</span>
              <span className="text-cyan-400 font-medium">{value}</span>
            </div>
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
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            A showcase of intelligent systems that push the boundaries of what's possible 
            when cutting-edge AI meets scalable engineering.
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
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-medium text-white bg-transparent border-2 border-cyan-400 rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            }}
          >
            <span className="mr-2">View All Projects</span>
            <motion.div
              className="flex items-center"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ExternalLink size={20} />
            </motion.div>
            <div
              className="absolute inset-0 rounded-lg bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              aria-hidden="true"
            />
          </a>
          <p className="text-gray-400 font-mono text-sm mt-4">
            Explore {projects.length - featuredProjects.length}+ more innovative projects
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
            Want to see more projects or collaborate on something amazing?
          </p>
          <a
            href="https://github.com/Lithira-Silva"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button"
          >
            <Github className="mr-2" size={20} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}