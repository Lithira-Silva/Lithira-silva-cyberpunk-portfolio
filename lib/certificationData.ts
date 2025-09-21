// Centralized certification data - Single source of truth
// Update certification information here and it will sync across all components

export interface CertificationData {
  id: number
  title: string
  issuer: string
  description: string
  longDescription?: string
  image: string
  credentialId: string
  issueDate: string
  expiryDate: string
  verifyUrl: string
  downloadUrl?: string // Optional download link for certificate PDF/image
  skills: string[]
  category: string
  level: 'Associate' | 'Professional' | 'Expert'
  featured: boolean
  status: 'Valid' | 'Expired' | 'Pending'
}

// Main certifications array - UPDATE CERTIFICATION DATA HERE
export const allCertifications: CertificationData[] = [
  {
    id: 1,
    title: 'ChatGPT Prompt Engineering Mastery',
    issuer: 'Udemy',
    description: 'Comprehensive certification in ChatGPT prompt engineering techniques, mastering advanced AI interaction patterns and optimization strategies for effective prompt design.',
    longDescription: 'This certificate validates expertise in ChatGPT prompt engineering mastery, covering advanced techniques for creating effective prompts, understanding AI model behaviors, and optimizing interactions for various use cases. The course provides practical skills in prompt design, conversation flow management, and AI-assisted problem solving.',
    image: '/certificates/images/udemy chatgpt certificate.jpg',
    credentialId: 'UC-4d4877c-3197-4780-91fe-11c37be0a162',
    issueDate: '2025',
    expiryDate: 'Never',
    verifyUrl: 'https://ude.my/UC-4d4877c-3197-4780-91fe-11c37be0a162',
    downloadUrl: '/certificates/pdfs/udemy chatgpt certificate.pdf',
    skills: ['ChatGPT', 'Prompt Engineering', 'AI Interaction', 'Natural Language Processing', 'AI Optimization'],
    category: 'AI/ML',
    level: 'Professional',
    featured: true,
    status: 'Valid'
  },
  {
    id: 2,
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    description: 'Comprehensive full-stack web development certification covering modern web technologies, frameworks, and development practices in a complete 61.5-hour intensive bootcamp.',
    longDescription: 'This certificate validates completion of an intensive full-stack web development bootcamp taught by Dr. Angela Yu. The comprehensive 61.5-hour course covers frontend and backend technologies, database management, deployment strategies, and modern development practices essential for professional web development.',
    image: '/certificates/images/Udemy Full-Stack.jpg',
    credentialId: 'UC-3451d8b7-42c8-b295-6cb252a37',
    issueDate: '2025',
    expiryDate: 'Never',
    verifyUrl: 'https://ude.my/UC-3451d8b7-42c8-b295-6cb252a37',
    downloadUrl: '/certificates/pdfs/Udemy Full-Stack PDF.pdf',
    skills: ['Full-Stack Development', 'JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Database Management', 'Web APIs', 'Deployment'],
    category: 'Web Development',
    level: 'Professional',
    featured: true,
    status: 'Valid'
  },
  {
    id: 3,
    title: 'Getting Started with DevOps on AWS',
    issuer: 'AWS Training & Certification',
    description: 'AWS official training certification covering DevOps culture, methods, and tools on AWS platform. Focuses on developing and delivering secure applications at high velocity using cloud-native practices.',
    longDescription: 'This certificate validates completion of AWS official training on DevOps fundamentals within the AWS ecosystem. The course covers DevOps culture and methodologies, AWS tools for continuous integration and deployment, infrastructure as code, and best practices for developing, deploying, and monitoring applications on AWS cloud infrastructure.',
    image: '/certificates/images/Getting started to devops.png',
    credentialId: 'AWS-DEVOPS-START-2025-001', // Generated ID since none provided
    issueDate: '2025',
    expiryDate: 'Never',
    verifyUrl: 'https://aws.training', // AWS Skill Builder platform
    downloadUrl: '/certificates/pdfs/Getting started to devops.pdf',
    skills: ['AWS', 'DevOps', 'Cloud Infrastructure', 'CI/CD', 'Application Deployment', 'Monitoring', 'Security', 'Infrastructure as Code'],
    category: 'Cloud',
    level: 'Associate',
    featured: true,
    status: 'Valid'
  }
  // Add more certifications here as needed
]

// Derived data arrays
export const featuredCertifications = allCertifications.filter(cert => cert.featured)
export const categories = ['All', ...Array.from(new Set(allCertifications.map(cert => cert.category)))]
export const years = ['All', ...Array.from(new Set(allCertifications.map(cert => cert.issueDate))).sort().reverse()]
export const levels = ['All', ...Array.from(new Set(allCertifications.map(cert => cert.level)))]

// Helper functions
export const getCertificationById = (id: number): CertificationData | undefined => {
  return allCertifications.find(cert => cert.id === id)
}

export const getCertificationsByCategory = (category: string): CertificationData[] => {
  if (category === 'All') return allCertifications
  return allCertifications.filter(cert => cert.category === category)
}

export const getCertificationsByYear = (year: string): CertificationData[] => {
  if (year === 'All') return allCertifications
  return allCertifications.filter(cert => cert.issueDate === year)
}

export const getCertificationsByLevel = (level: string): CertificationData[] => {
  if (level === 'All') return allCertifications
  return allCertifications.filter(cert => cert.level === level)
}

export const searchCertifications = (searchTerm: string): CertificationData[] => {
  if (!searchTerm) return allCertifications
  
  const term = searchTerm.toLowerCase()
  return allCertifications.filter(cert =>
    cert.title.toLowerCase().includes(term) ||
    cert.issuer.toLowerCase().includes(term) ||
    cert.description.toLowerCase().includes(term) ||
    (cert.longDescription && cert.longDescription.toLowerCase().includes(term)) ||
    cert.skills.some(skill => skill.toLowerCase().includes(term)) ||
    cert.credentialId.toLowerCase().includes(term)
  )
}