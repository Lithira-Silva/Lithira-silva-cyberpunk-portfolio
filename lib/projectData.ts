// Centralized project data - Single source of truth
// Update project information here and it will sync across all components

export interface ProjectData {
  id: number
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  category: string
  year: string
  featured: boolean
  status: 'Live' | 'In Development' | 'Completed'
  metrics: {
    [key: string]: string
  }
  links: {
    liveHost: string
    github: string
  }
  highlights?: string[]
}

// Main projects array - UPDATE PROJECT DATA HERE
export const allProjects: ProjectData[] = [
  {
    id: 1,
    title: 'BuildMart - Construction Management System',
    description: 'Next-generation auction and procurement platform revolutionizing construction industry operations through intelligent bidding systems, real-time project oversight, and automated financial management.',
    longDescription: 'BuildMart transforms traditional construction management by integrating advanced bidding algorithms, automated contractor ranking systems, real-time milestone tracking, and comprehensive financial dashboards. Built by a dedicated team of 5 developers, this platform streamlines procurement, enhances collaboration, and ensures projects are delivered on time and within budget through cutting-edge web technologies.',
    image: '/projects/Buildmart.jpg',
    technologies: ['React.js', 'Material-UI', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Vercel', 'Git'],
    category: 'Full-Stack',
    year: '2025',
    featured: true,
    status: 'Live',
    metrics: {
      // Metrics removed as requested
    },
    links: {
      liveHost: 'https://buildmart-system.vercel.app/',
      github: 'https://github.com/luqmanbooso/BuildMart'
    },
    highlights: [
      'Intelligent bidding & contractor management',
      'Real-time project & job tracking',
      'Automated financial reporting system',
      'Smart supplier & logistics management',
      'Advanced inventory & procurement control',
      'Secure payment gateway integration'
    ]
  }
  // Add more projects here as needed
]

// Derived data arrays
export const featuredProjects = allProjects.filter(project => project.featured)
export const categories = ['All', ...Array.from(new Set(allProjects.map(project => project.category)))]
export const years = ['All', ...Array.from(new Set(allProjects.map(project => project.year))).sort().reverse()]

// Helper functions
export const getProjectById = (id: number): ProjectData | undefined => {
  return allProjects.find(project => project.id === id)
}

export const getProjectsByCategory = (category: string): ProjectData[] => {
  if (category === 'All') return allProjects
  return allProjects.filter(project => project.category === category)
}

export const getProjectsByYear = (year: string): ProjectData[] => {
  if (year === 'All') return allProjects
  return allProjects.filter(project => project.year === year)
}

export const searchProjects = (searchTerm: string): ProjectData[] => {
  if (!searchTerm) return allProjects
  
  const term = searchTerm.toLowerCase()
  return allProjects.filter(project =>
    project.title.toLowerCase().includes(term) ||
    project.description.toLowerCase().includes(term) ||
    (project.longDescription && project.longDescription.toLowerCase().includes(term)) ||
    project.technologies.some(tech => tech.toLowerCase().includes(term)) ||
    (project.highlights && project.highlights.some(highlight => highlight.toLowerCase().includes(term)))
  )
}