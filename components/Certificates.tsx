'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Award, Calendar, Download } from 'lucide-react'
import Image from 'next/image'
import { CertificationData, featuredCertifications, allCertifications } from '@/lib/certificationData'

interface CertificateCardProps {
  certificate: CertificationData
  index: number
  isVisible: boolean
}

function CertificateCard({ certificate, index, isVisible }: CertificateCardProps) {
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
      {/* Certificate Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={certificate.image}
          alt={certificate.title}
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
      </div>

      {/* Certificate Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-orbitron font-bold text-xl text-white mb-2 line-clamp-2">
          {certificate.title}
        </h3>
        
        {/* Download Button - Small button under certificate name */}
        {certificate.downloadUrl && (
          <div className="mb-3">
            <a
              href={certificate.downloadUrl}
              download
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-white text-xs font-mono transition-all duration-300 hover:scale-105"
              aria-label={`Download ${certificate.title}`}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 255, 255, 0.15) 50%, rgba(0, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(10px) saturate(150%)',
                WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                border: '1px solid rgba(0, 255, 255, 0.4)',
                boxShadow: '0 4px 15px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
            >
              <Download size={14} className="mr-1.5" />
              Download PDF
            </a>
          </div>
        )}
        
        <p className="text-cyan-400 font-mono text-sm mb-3">
          {certificate.issuer}
        </p>
        
        <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4 flex-1">
          {certificate.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {certificate.skills.map((skill: string) => (
            <span key={skill} className="tech-badge text-xs">
              {skill}
            </span>
          ))}
        </div>

        {/* Certificate Details - Compact */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-400">
            {certificate.issueDate} {certificate.expiryDate !== 'Never' ? `- ${certificate.expiryDate}` : ''}
          </span>
          <span className="text-cyan-400 font-medium">{certificate.status}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certificates() {
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
      id="certificates"
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
            Professional <span className="text-cyan-400">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            Industry-recognized certifications validating expertise in cloud computing, 
            artificial intelligence, and modern development practices.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCertifications.map((certificate: CertificationData, index: number) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View All Certificates Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="/certificates"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-medium text-white border-2 border-cyan-400/50 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
          >
            <span className="mr-2 relative z-10">View All Certificates</span>
            <motion.div
              className="flex items-center relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award size={20} />
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
            Explore {allCertifications.length - featuredCertifications.length}+ more professional certifications
          </p>
        </motion.div>
      </div>
    </section>
  )
}