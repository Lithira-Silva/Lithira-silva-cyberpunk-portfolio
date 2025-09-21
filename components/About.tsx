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
    year: '2025',
    title: 'Information Technology Degree',
    company: 'SLIIT (Sri Lanka Institute of Information Technology)',
    description: 'Pursuing Bachelor of Science in Information Technology with focus on Full-Stack Development and Cloud Computing'
  },
  {
    year: '2024',
    title: 'Advanced Cloud Computing Certification',
    company: 'Professional Development',
    description: 'Completed AWS Solutions Architect Professional and Google Cloud ML Engineer certifications'
  },
  {
    year: '2023',
    title: 'Full-Stack Development Specialization',
    company: 'Technical Training',
    description: 'Mastered MERN stack, TypeScript, and modern web development frameworks through intensive projects'
  },
  {
    year: '2022',
    title: 'Programming Foundations',
    company: 'Academic Study',
    description: 'Built strong foundation in Java, Python, C++, and software engineering principles'
  },
  {
    year: '2021',
    title: 'IT Foundation Studies',
    company: 'SLIIT',
    description: 'Started Information Technology degree program, establishing core computing and mathematics skills'
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
                  alt="Lithira Silva - IT Student & Full-Stack Developer"
                  fill
                  sizes="(max-width: 768px) 320px, 320px"
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
                As an <strong className="text-cyan-400">IT undergraduate at SLIIT</strong> specializing in Information Technology, 
                I am a passionate Full-Stack Developer with a growing proficiency in <strong className="text-white">TypeScript</strong>, 
                alongside a strong foundation in <strong className="text-white">Java</strong>, <strong className="text-white">Python</strong>, 
                <strong className="text-white">C++</strong>, and the <strong className="text-cyan-400">MERN stack</strong>.
              </p>
              
              <p>
                Currently diving into <strong className="text-cyan-400">cloud computing</strong>, I aim to master the latest advancements 
                and integrate <strong className="text-white">AI technologies</strong> to elevate my skills to global standards. 
                My diverse interests span <strong className="text-white">software engineering</strong>, 
                <strong className="text-white">web and mobile app development</strong>, and <strong className="text-white">cloud solutions</strong>.
              </p>
              
              <p>
                My passion is fueled by hands-on projects like <strong className="text-cyan-400">construction bidding platforms</strong> 
                and <strong className="text-cyan-400">Android apps</strong>, where I continuously challenge myself to build innovative solutions 
                that solve real-world problems with cutting-edge technology.
              </p>
              
              <p>
                Beyond coding, I stay updated with <strong className="text-white">cutting-edge trends</strong> and enjoy collaborating 
                on innovative tech initiatives. I believe in the power of continuous learning and am always eager to explore 
                new technologies that can make a meaningful impact.
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
            Education
          </h3>
          <AnimatedTimeline />
        </motion.div>
      </div>
    </section>
  )
}