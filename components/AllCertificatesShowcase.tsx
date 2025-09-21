'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Award, Search, Filter, ArrowLeft, Calendar, Star, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Extended certificates array with all certificates
const allCertificates = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    description: 'Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform with focus on scalability, security, and cost optimization.',
    longDescription: 'This professional-level certification validates advanced technical skills and experience in designing distributed applications and systems on the AWS platform. Covers complex scenarios including multi-tier architectures, enterprise workloads, and cost optimization strategies.',
    image: '/cert-aws-pro.jpg',
    credentialId: 'AWS-PSA-2024-001',
    issueDate: '2024',
    expiryDate: '2027',
    verifyUrl: 'https://aws.amazon.com/verification/cert-001',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security', 'Cost Optimization', 'Lambda', 'EC2', 'VPC'],
    category: 'Cloud',
    level: 'Professional',
    featured: true,
    status: 'Valid'
  },
  {
    id: 2,
    title: 'Google Cloud Professional Machine Learning Engineer',
    issuer: 'Google Cloud',
    description: 'Professional certification validating skills in designing, building, and productionizing ML models using Google Cloud technologies and best practices.',
    longDescription: 'Validates the ability to design, build, and productionize ML models to solve business challenges using Google Cloud technologies and proven ML methodologies.',
    image: '/cert-gcp-ml.jpg',
    credentialId: 'GCP-MLE-2024-002',
    issueDate: '2024',
    expiryDate: '2026',
    verifyUrl: 'https://cloud.google.com/certification/verify/cert-002',
    skills: ['TensorFlow', 'AutoML', 'BigQuery ML', 'Vertex AI', 'MLOps', 'Kubeflow', 'AI Platform'],
    category: 'AI/ML',
    level: 'Professional',
    featured: true,
    status: 'Valid'
  },
  {
    id: 3,
    title: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    description: 'Certification demonstrating proficiency in implementing AI solutions using Azure Cognitive Services, Machine Learning, and Knowledge Mining services.',
    longDescription: 'Validates skills in implementing AI solutions that leverage Azure Cognitive Services, Azure Cognitive Search, and Microsoft Bot Framework.',
    image: '/cert-azure-ai.jpg',
    credentialId: 'AZ-AI-2024-003',
    issueDate: '2024',
    expiryDate: '2026',
    verifyUrl: 'https://learn.microsoft.com/verification/cert-003',
    skills: ['Azure AI', 'Cognitive Services', 'Computer Vision', 'NLP', 'Bot Framework', 'LUIS', 'QnA Maker'],
    category: 'AI/ML',
    level: 'Associate',
    featured: true,
    status: 'Valid'
  },
  {
    id: 4,
    title: 'Kubernetes Certified Application Developer (CKAD)',
    issuer: 'Cloud Native Computing Foundation',
    description: 'Certification proving ability to design, build and configure cloud native applications for Kubernetes.',
    longDescription: 'Performance-based certification that validates the ability to design, build and configure cloud native applications for Kubernetes.',
    image: '/cert-ckad.jpg',
    credentialId: 'CKAD-2024-004',
    issueDate: '2024',
    expiryDate: '2027',
    verifyUrl: 'https://cncf.io/certification/verify/cert-004',
    skills: ['Kubernetes', 'Docker', 'Microservices', 'DevOps', 'Container Orchestration', 'Helm', 'Pod Security'],
    category: 'DevOps',
    level: 'Professional',
    featured: false,
    status: 'Valid'
  },
  {
    id: 5,
    title: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    description: 'Google certification program demonstrating proficiency in using TensorFlow to solve deep learning and ML problems.',
    longDescription: 'Demonstrates proficiency in using TensorFlow to solve deep learning and machine learning problems. Covers computer vision, natural language processing, time series, and sequences.',
    image: '/cert-tensorflow.jpg',
    credentialId: 'TF-DEV-2023-005',
    issueDate: '2023',
    expiryDate: '2026',
    verifyUrl: 'https://tensorflow.org/certificate/verify/cert-005',
    skills: ['TensorFlow', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'Time Series', 'Keras'],
    category: 'AI/ML',
    level: 'Professional',
    featured: false,
    status: 'Valid'
  },
  {
    id: 6,
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    description: 'Certification validating skills in Infrastructure as Code using Terraform for cloud resource management.',
    longDescription: 'Validates foundational skills and knowledge in Infrastructure as Code (IaC) using Terraform. Covers Terraform basics, configuration language, and workflow.',
    image: '/cert-terraform.jpg',
    credentialId: 'HC-TA-2023-006',
    issueDate: '2023',
    expiryDate: '2025',
    verifyUrl: 'https://hashicorp.com/certification/verify/cert-006',
    skills: ['Terraform', 'Infrastructure as Code', 'Cloud Automation', 'DevOps', 'HCL', 'State Management'],
    category: 'DevOps',
    level: 'Associate',
    featured: false,
    status: 'Valid'
  },
  {
    id: 7,
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    description: 'Performance-based certification validating skills in Kubernetes administration and cluster management.',
    longDescription: 'Performance-based certification that validates skills, knowledge, and competency to perform the role of a Kubernetes Administrator.',
    image: '/cert-cka.jpg',
    credentialId: 'CKA-2023-007',
    issueDate: '2023',
    expiryDate: '2026',
    verifyUrl: 'https://cncf.io/certification/verify/cert-007',
    skills: ['Kubernetes', 'Cluster Administration', 'Networking', 'Storage', 'Security', 'Troubleshooting'],
    category: 'DevOps',
    level: 'Professional',
    featured: false,
    status: 'Valid'
  },
  {
    id: 8,
    title: 'AWS Certified DevOps Engineer - Professional',
    issuer: 'Amazon Web Services',
    description: 'Advanced certification validating technical expertise in provisioning, operating, and managing distributed application systems on AWS.',
    longDescription: 'Validates technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform with focus on DevOps methodologies.',
    image: '/cert-aws-devops.jpg',
    credentialId: 'AWS-DOE-2023-008',
    issueDate: '2023',
    expiryDate: '2026',
    verifyUrl: 'https://aws.amazon.com/verification/cert-008',
    skills: ['AWS', 'DevOps', 'CI/CD', 'Infrastructure as Code', 'Monitoring', 'CloudFormation', 'CodePipeline'],
    category: 'Cloud',
    level: 'Professional',
    featured: false,
    status: 'Valid'
  }
]

// Get unique categories and years for filtering
const categories = ['All', ...Array.from(new Set(allCertificates.map(cert => cert.category)))]
const years = ['All', ...Array.from(new Set(allCertificates.map(cert => cert.issueDate))).sort().reverse()]

interface CertificateCardProps {
  certificate: typeof allCertificates[0]
  index: number
}

function CertificateCard({ certificate, index }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group h-full overflow-hidden rounded-xl transition-all duration-500 hover:scale-105"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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
        
        {/* Action Button */}
        <motion.div
          className="absolute top-4 right-4"
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

        {/* Category Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-bold bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">
            {certificate.category}
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
          {certificate.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="tech-badge text-xs">
              {skill}
            </span>
          ))}
          {certificate.skills.length > 4 && (
            <span className="tech-badge text-xs opacity-60">
              +{certificate.skills.length - 4} more
            </span>
          )}
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
            <span className="text-gray-400">Status:</span>
            <span className="text-green-400 font-medium">{certificate.status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AllCertificatesShowcase() {
  const [filteredCertificates, setFilteredCertificates] = useState(allCertificates)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = allCertificates

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(cert => cert.category === selectedCategory)
    }

    // Filter by year
    if (selectedYear !== 'All') {
      filtered = filtered.filter(cert => cert.issueDate === selectedYear)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredCertificates(filtered)
  }, [selectedCategory, selectedYear, searchTerm])

  return (
    <div className="min-h-screen bg-black pt-20 lg:pt-16">
      {/* Header */}
      <div className="section-padding py-12 lg:py-16">
        <div className="container-max">
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-300 mr-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              All <span className="text-cyan-400">Certifications</span>
            </h1>
            <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
            <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
              Complete portfolio of {allCertificates.length} professional certifications spanning cloud computing,
              artificial intelligence, DevOps, and modern development practices.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search certifications, issuers, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(10, 10, 10, 0.6) 100%)',
                    backdropFilter: 'blur(12px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(120%)',
                    border: '1px solid rgba(115, 115, 115, 0.3)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                  }}
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 rounded-lg text-white transition-colors duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(10, 10, 10, 0.6) 100%)',
                  backdropFilter: 'blur(12px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(120%)',
                  border: '1px solid rgba(115, 115, 115, 0.3)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                }}
              >
                <Filter size={20} className="mr-2" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="mt-6 p-6 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.8) 0%, rgba(0, 255, 255, 0.06) 40%, rgba(15, 15, 15, 0.85) 100%)',
                    backdropFilter: 'blur(16px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                    border: '1px solid rgba(115, 115, 115, 0.3)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-3">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 text-sm font-mono rounded transition-colors duration-300 ${
                              selectedCategory === category
                                ? 'bg-cyan-400 text-black'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-3">Year</label>
                      <div className="flex flex-wrap gap-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-3 py-1 text-sm font-mono rounded transition-colors duration-300 ${
                              selectedYear === year
                                ? 'bg-cyan-400 text-black'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Count */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-gray-400 font-mono text-sm">
              Showing {filteredCertificates.length} of {allCertificates.length} certifications
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredCertificates.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 font-mono text-lg mb-4">
                No certifications found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedYear('All')
                  setSearchTerm('')
                }}
                className="text-cyan-400 hover:text-cyan-300 font-mono underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}