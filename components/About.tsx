'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Django',
  'TensorFlow', 'PyTorch', 'AWS Lambda', 'Docker', 'Kubernetes',
  'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'
]

const achievements = [
  {
    year: '2024',
    title: 'AI Integration Lead',
    company: 'TechCorp',
    description: 'Led development of ML-powered recommendation system serving 2M+ users'
  },
  {
    year: '2023',
    title: 'Senior Full-Stack Engineer',
    company: 'InnovateLab',
    description: 'Built scalable microservices architecture handling 100k+ daily transactions'
  },
  {
    year: '2022',
    title: 'ML Engineer',
    company: 'DataFlow Inc',
    description: 'Developed real-time fraud detection system with 99.7% accuracy'
  },
  {
    year: '2021',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    description: 'Created MVP that secured $2M Series A funding'
  },
  {
    year: '2020',
    title: 'Software Engineer',
    company: 'CloudTech',
    description: 'Optimized database queries resulting in 60% performance improvement'
  }
]

function AnimatedTimeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index])
          }
        })
      },
      { threshold: 0.5 }
    )

    const timelineItems = timelineRef.current?.querySelectorAll('[data-index]')
    timelineItems?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={timelineRef} className="overflow-x-auto pb-4">
      <div className="flex space-x-6 min-w-max">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            data-index={index}
            className="flex-shrink-0 w-80 rounded-lg p-6 relative transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.8) 0%, rgba(0, 255, 255, 0.06) 30%, rgba(15, 15, 15, 0.85) 100%)',
              backdropFilter: 'blur(15px) saturate(140%)',
              WebkitBackdropFilter: 'blur(15px) saturate(140%)',
              border: '1px solid rgba(115, 115, 115, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="absolute -top-3 left-6 bg-cyan-400 text-black px-3 py-1 rounded-full text-sm font-mono font-bold">
              {achievement.year}
            </div>
            <h4 className="font-orbitron font-bold text-lg text-white mt-4 mb-2">
              {achievement.title}
            </h4>
            <p className="text-cyan-400 font-mono text-sm mb-3">
              {achievement.company}
            </p>
            <p className="text-gray-300 font-mono text-sm leading-relaxed">
              {achievement.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
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
      id="about"
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
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full blur-lg opacity-20"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400 group">
                <Image
                  src="/profile.jpg"
                  alt="Lithira Silva - Full-Stack AI Engineer"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6 text-gray-300 font-mono leading-relaxed">
              <p className="text-lg">
                With over <strong className="text-cyan-400">10 years</strong> of experience crafting digital solutions, 
                I specialize in building intelligent systems that bridge the gap between complex AI algorithms 
                and real-world applications.
              </p>
              
              <p>
                My journey began in traditional web development, but I quickly found my passion in the intersection 
                of <strong className="text-white">artificial intelligence</strong> and <strong className="text-white">scalable web architecture</strong>. 
                Today, I architect full-stack solutions that leverage cutting-edge ML models to solve business-critical problems.
              </p>
              
              <p>
                From building <strong className="text-cyan-400">real-time recommendation engines</strong> that serve millions of users 
                to developing <strong className="text-cyan-400">fraud detection systems</strong> with 99.7% accuracy, 
                I thrive on transforming complex data into actionable insights through elegant, performant code.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring the latest developments in <strong className="text-white">transformer architectures</strong>, 
                contributing to open-source AI projects, or mentoring the next generation of engineers who share my passion 
                for building tomorrow's intelligent systems.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-orbitron font-bold text-xl text-white mb-4">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="tech-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievement Timeline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-8 text-center">
            Career Milestones
          </h3>
          <AnimatedTimeline />
        </motion.div>
      </div>
    </section>
  )
}