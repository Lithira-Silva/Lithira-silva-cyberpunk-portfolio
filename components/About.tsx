'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'HTML5',
  'CSS3', 'Tailwind CSS', 'Java', 'Python', 'C++', 'MySQL',
  'MongoDB', 'Git', 'GitHub', 'Android Development'
]

const achievements = [
  {
    year: '2023-Present',
    title: 'BSc (Hons) in Information Technology',
    company: 'SLIIT, Malabe',
    description: 'Specializing in Information Technology. Currently in Year 3, Semester 1. Focus on Software Engineering, Full-Stack Development, and Cloud Computing',
    logo: '/education-logos/sliit-logo.png' // SLIIT logo added
  },
  {
    year: '2022-2023',
    title: 'G.C.E. Advanced Level - Commerce Stream',
    company: 'D. S. Senanayake College, Colombo',
    description: 'Completed Advanced Level in Commerce Stream (English Medium). Passed subjects: Accounting, Economics, and ICT with strong performance',
    logo: '/education-logos/ds-senanayake-logo.png' // Add your D.S. Senanayake College logo here
  },
  {
    year: '2019',
    title: 'G.C.E. Ordinary Level',
    company: 'I-GATE College, Thalawathugoda',
    description: 'Successfully completed General Certificate of Education Ordinary Level. Built strong foundation in core subjects and analytical thinking',
    logo: '/education-logos/igate-logo.jpeg' // I-GATE College logo added
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
      { threshold: 0.3 }
    )

    const timelineItems = timelineRef.current?.querySelectorAll('[data-index]')
    timelineItems?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={timelineRef} className="w-full">
      {/* Desktop - Cool Horizontal Timeline */}
      <div className="hidden lg:block relative">
        {/* Timeline Line - Reduced brightness */}
        <div className="absolute top-24 left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-400/10 via-cyan-400/40 to-cyan-400/10 rounded-full shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-sm rounded-full"></div>
        </div>
        
        {/* Timeline Dots - Smaller and less bright */}
        {achievements.map((_, index) => (
          <div
            key={`dot-${index}`}
            className="absolute top-[5.75rem] w-4 h-4 bg-gradient-to-br from-cyan-400/80 to-cyan-500/80 rounded-full shadow-md border-2 border-black z-20"
            style={{ 
              left: `${8 + (index * (100 - 16) / (achievements.length - 1))}%`,
              boxShadow: '0 0 8px rgba(0, 255, 255, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="absolute inset-0.5 bg-gradient-to-br from-cyan-300/60 to-cyan-600/60 rounded-full"></div>
          </div>
        ))}
        
        {/* Education Cards */}
        <div className="flex justify-between items-start pt-16 pb-8 px-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              data-index={index}
              className="relative w-80 group"
              initial={{ opacity: 0, y: 50 }}
              animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Timeline Connector Line - Reduced brightness */}
              <div className="absolute top-8 left-1/2 w-0.5 h-16 bg-gradient-to-b from-cyan-400/40 to-transparent transform -translate-x-1/2"></div>
              
              {/* Education Card */}
              <div 
                className={`relative mt-24 p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                  index % 2 === 0 ? 'transform -translate-y-8' : 'transform translate-y-8'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(0, 255, 255, 0.08) 30%, rgba(15, 15, 15, 0.95) 100%)',
                  backdropFilter: 'blur(25px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(150%)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 255, 255, 0.1)'
                }}
              >
                {/* Year Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-6 py-3 rounded-full text-sm font-mono font-bold shadow-xl z-10 whitespace-nowrap">
                  {achievement.year}
                </div>
                
                {/* Institution Logo */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-cyan-400/50 shadow-xl z-10 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={achievement.logo}
                    alt={`${achievement.company} logo`}
                    width={40}
                    height={40}
                    className="object-contain rounded-full"
                    onError={(e) => {
                      (e.target as HTMLElement).closest('.w-16')?.classList.add('hidden')
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-orbitron font-bold text-xl text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400/60 rounded-full"></div>
                    <p className="text-cyan-400 font-mono text-base font-medium">
                      {achievement.company}
                    </p>
                  </div>
                  
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet - Vertical Timeline */}
      <div className="lg:hidden space-y-6 md:space-y-8 relative px-2">
        {/* Vertical Timeline Line - More visible */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400/30 via-cyan-400/60 to-cyan-400/30 rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-cyan-400/40 to-cyan-400/10 blur-sm rounded-full"></div>
        </div>
        
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            data-index={index}
            className="relative pl-12 sm:pl-16"
            initial={{ opacity: 0, x: -30 }}
            animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            {/* Timeline Dot - More visible */}
            <div className="absolute left-2 top-6 w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full shadow-lg border-2 border-black z-10">
              <div className="absolute inset-1 bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-full"></div>
            </div>
            
            {/* Mobile Education Card */}
            <div 
              className="p-4 sm:p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] relative min-h-[160px]"
              style={{
                background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(0, 255, 255, 0.12) 30%, rgba(15, 15, 15, 0.95) 100%)',
                backdropFilter: 'blur(15px) saturate(140%)',
                WebkitBackdropFilter: 'blur(15px) saturate(140%)',
                border: '1px solid rgba(0, 255, 255, 0.4)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Mobile Logo */}
              <div className="absolute top-3 right-3 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-cyan-400/50 shadow-lg">
                <Image
                  src={achievement.logo}
                  alt={`${achievement.company} logo`}
                  width={32}
                  height={32}
                  className="object-contain rounded-full"
                  onError={(e) => {
                    (e.target as HTMLElement).closest('.w-14')?.classList.add('hidden')
                  }}
                />
              </div>
              
              {/* Year Badge */}
              <span className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-4 py-2 rounded-full text-sm font-mono font-bold mb-4 shadow-lg">
                {achievement.year}
              </span>
              
              <h4 className="font-orbitron font-bold text-lg sm:text-xl text-white mb-3 leading-tight pr-16">
                {achievement.title}
              </h4>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <p className="text-cyan-400 font-mono text-sm sm:text-base font-medium">
                  {achievement.company}
                </p>
              </div>
              
              <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">
                {achievement.description}
              </p>
            </div>
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
      className="py-12 sm:py-16 md:py-20 lg:py-32 section-padding bg-black min-h-screen"
    >
      <div className="container-max">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 md:mb-6">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-cyan-400 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400 group shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Lithira Silva - IT Student & Full-Stack Developer"
                  fill
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-110"
                  priority
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glass Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-4 md:space-y-6 text-gray-300 font-mono leading-relaxed px-2">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                As an <strong className="text-cyan-400">IT undergraduate at SLIIT</strong> specializing in Information Technology, 
                I am a passionate Full-Stack Developer with a growing proficiency in <strong className="text-white">TypeScript</strong>, 
                alongside a strong foundation in <strong className="text-white">Java</strong>, <strong className="text-white">Python</strong>, 
                <strong className="text-white">C++</strong>, and the <strong className="text-cyan-400">MERN stack</strong>.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed">
                Currently diving into <strong className="text-cyan-400">cloud computing</strong>, I aim to master the latest advancements 
                and integrate <strong className="text-white">AI technologies</strong> to elevate my skills to global standards. 
                My diverse interests span <strong className="text-white">software engineering</strong>, 
                <strong className="text-white">web and mobile app development</strong>, and <strong className="text-white">cloud solutions</strong>.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed">
                My passion is fueled by hands-on projects like <strong className="text-cyan-400">construction bidding platforms</strong> 
                and <strong className="text-cyan-400">Android apps</strong>, where I continuously challenge myself to build innovative solutions 
                that solve real-world problems with cutting-edge technology.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed">
                Beyond coding, I stay updated with <strong className="text-white">cutting-edge trends</strong> and enjoy collaborating 
                on innovative tech initiatives. I believe in the power of continuous learning and am always eager to explore 
                new technologies that can make a meaningful impact.
              </p>
            </div>

            {/* Skills */}
            <div className="pt-4">
              <h3 className="font-orbitron font-bold text-lg sm:text-xl md:text-2xl text-white mb-4 md:mb-6">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
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
          className="mt-16 md:mt-20 pt-6 md:pt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="font-orbitron font-bold text-lg sm:text-xl md:text-2xl text-white mb-8 md:mb-12 text-center">
            Education
          </h3>
          <AnimatedTimeline />
        </motion.div>
      </div>
    </section>
  )
}