'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Award, Calendar, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'

const certificates = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    description: 'Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform with focus on scalability, security, and cost optimization.',
    image: '/cert-aws-pro.jpg',
    credentialId: 'AWS-PSA-2024-001',
    issueDate: '2024',
    expiryDate: '2027',
    verifyUrl: 'https://aws.amazon.com/verification/cert-001',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security', 'Cost Optimization'],
    level: 'Professional',
    featured: true
  },
  {
    id: 2,
    title: 'Google Cloud Professional Machine Learning Engineer',
    issuer: 'Google Cloud',
    description: 'Professional certification validating skills in designing, building, and productionizing ML models using Google Cloud technologies and best practices.',
    image: '/cert-gcp-ml.jpg',
    credentialId: 'GCP-MLE-2024-002',
    issueDate: '2024',
    expiryDate: '2026',
    verifyUrl: 'https://cloud.google.com/certification/verify/cert-002',
    skills: ['TensorFlow', 'AutoML', 'BigQuery ML', 'Vertex AI', 'MLOps'],
    level: 'Professional',
    featured: true
  },
  {
    id: 3,
    title: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    description: 'Certification demonstrating proficiency in implementing AI solutions using Azure Cognitive Services, Machine Learning, and Knowledge Mining services.',
    image: '/cert-azure-ai.jpg',
    credentialId: 'AZ-AI-2024-003',
    issueDate: '2024',
    expiryDate: '2026',
    verifyUrl: 'https://learn.microsoft.com/verification/cert-003',
    skills: ['Azure AI', 'Cognitive Services', 'Computer Vision', 'NLP', 'Bot Framework'],
    level: 'Associate',
    featured: true
  },
  {
    id: 4,
    title: 'Kubernetes Certified Application Developer',
    issuer: 'Cloud Native Computing Foundation',
    description: 'Certification proving ability to design, build and configure cloud native applications for Kubernetes.',
    image: '/cert-ckad.jpg',
    credentialId: 'CKAD-2024-004',
    issueDate: '2024',
    expiryDate: '2027',
    verifyUrl: 'https://cncf.io/certification/verify/cert-004',
    skills: ['Kubernetes', 'Docker', 'Microservices', 'DevOps', 'Container Orchestration'],
    level: 'Professional',
    featured: false
  },
  {
    id: 5,
    title: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    description: 'Google certification program demonstrating proficiency in using TensorFlow to solve deep learning and ML problems.',
    image: '/cert-tensorflow.jpg',
    credentialId: 'TF-DEV-2023-005',
    issueDate: '2023',
    expiryDate: '2026',
    verifyUrl: 'https://tensorflow.org/certificate/verify/cert-005',
    skills: ['TensorFlow', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
    level: 'Professional',
    featured: false
  },
  {
    id: 6,
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    description: 'Certification validating skills in Infrastructure as Code using Terraform for cloud resource management.',
    image: '/cert-terraform.jpg',
    credentialId: 'HC-TA-2023-006',
    issueDate: '2023',
    expiryDate: '2025',
    verifyUrl: 'https://hashicorp.com/certification/verify/cert-006',
    skills: ['Terraform', 'Infrastructure as Code', 'Cloud Automation', 'DevOps'],
    level: 'Associate',
    featured: false
  }
]

// Get only featured certificates for homepage
const featuredCertificates = certificates.filter(cert => cert.featured)

interface CertificateCardProps {
  certificate: typeof certificates[0]
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
        
        {/* Action Buttons */}
        <motion.div
          className="absolute top-4 right-4 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={certificate.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 transition-all duration-300 hover:scale-110"
            aria-label={`Verify ${certificate.title}`}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <CheckCircle size={18} />
          </a>
        </motion.div>

        {/* Certificate Level Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-bold ${
            certificate.level === 'Professional' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-blue-500 text-white'
          }`}>
            <Star size={12} className="mr-1" />
            {certificate.level}
          </span>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-orbitron font-bold text-xl text-white mb-2 line-clamp-2">
          {certificate.title}
        </h3>
        
        <p className="text-cyan-400 font-mono text-sm mb-3">
          {certificate.issuer}
        </p>
        
        <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4 flex-1">
          {certificate.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {certificate.skills.map((skill) => (
            <span key={skill} className="tech-badge text-xs">
              {skill}
            </span>
          ))}
        </div>

        {/* Certificate Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Issued:</span>
            <span className="text-cyan-400 font-medium">{certificate.issueDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Expires:</span>
            <span className="text-cyan-400 font-medium">{certificate.expiryDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">ID:</span>
            <span className="text-cyan-400 font-medium font-mono text-xs">{certificate.credentialId}</span>
          </div>
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
          {featuredCertificates.map((certificate, index) => (
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
            Explore {certificates.length - featuredCertificates.length}+ more professional certifications
          </p>
        </motion.div>
      </div>
    </section>
  )
}