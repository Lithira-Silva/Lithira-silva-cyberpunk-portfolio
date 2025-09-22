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
  },
  {
    id: 2,
    title: 'FitGeek - Premium Fitness and Wellness Website',
    description: 'Modern, responsive fitness and wellness platform crafted for premium gym centers, featuring comprehensive service showcases, membership packages, trainer profiles, and integrated contact systems.',
    longDescription: 'FitGeek is a comprehensive digital platform that serves as a one-stop hub for health enthusiasts, providing detailed information on fitness services, membership packages, trainer profiles, and wellness programs. Built with modern web technologies, this responsive website delivers a seamless user experience across all devices with clean UI/UX design, smooth animations, and interactive elements.',
    image: '/projects/fitgeek.jpg',
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'EmailJS', 'React Router', 'ESLint', 'PostCSS'],
    category: 'Frontend',
    year: '2025',
    featured: true,
    status: 'Live',
    metrics: {},
    links: {
      liveHost: 'https://fitgeek-website.vercel.app/',
      github: 'https://github.com/Lithira-Silva/fitgeek-website'
    },
    highlights: [
      'Responsive design for all device types',
      'Modern UI/UX with smooth animations',
      'Functional contact system with EmailJS',
      'Comprehensive membership package comparison',
      'SEO optimized semantic HTML structure',
      'Type-safe development with TypeScript'
    ]
  },
  {
    id: 3,
    title: 'SpendWise - Personal Finance Management App',
    description: 'Cutting-edge Android personal finance management app designed with modern development practices, featuring intuitive budget tracking, expense management, and visual analytics through Material Design 3 interface.',
    longDescription: 'SpendWise empowers users in tracking income and expenses, managing budgets, and gaining insights into spending patterns through intuitive visual charts and statistics. Built with Jetpack Compose and MVVM architecture, this app offers a clean, Material Design 3 interface and robust features tailored for Android users seeking complete financial control.',
    image: '/projects/spendwise.jpg',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material Design 3', 'MVVM', 'Android SDK', 'Gradle', 'SharedPreferences', 'MPAndroidChart'],
    category: 'Mobile',
    year: '2025',
    featured: true,
    status: 'Completed',
    metrics: {},
    links: {
      liveHost: '',
      github: 'https://github.com/Lithira-Silva/SpendWise---Personal-Finance-Management-App'
    },
    highlights: [
      'Modern Jetpack Compose declarative UI',
      'Material Design 3 polished interface',
      'MVVM architecture for scalability',
      'Visual charts and spending analytics',
      'Local data persistence with DataStore',
      'Target SDK 35 with Android best practices'
    ]
  },
  {
    id: 4,
    title: 'NexTo - AI-Powered Task Management Application',
    description: 'Sophisticated AI-powered task management platform that exemplifies modern full-stack development with natural language parsing, priority detection, and personalized productivity insights.',
    longDescription: 'NexTo is a production-ready productivity platform that integrates advanced frontend design, intelligent backend architecture, and cutting-edge AI features. The application offers seamless task management through natural language parsing, smart categorization, priority detection, and personalized insights, creating an intuitive user experience powered by modern web technologies.',
    image: '/projects/nexto.jpg',
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase', 'PostgreSQL', 'AI/NLP'],
    category: 'Full-Stack',
    year: '2025',
    featured: false,
    status: 'In Development',
    metrics: {},
    links: {
      liveHost: '',
      github: 'https://github.com/Lithira-Silva/NexTo'
    },
    highlights: [
      'AI-powered natural language task parsing',
      'Smart priority detection and categorization',
      'Real-time collaboration with Supabase',
      'Advanced productivity insights and analytics',
      'Context-aware suggestions and recommendations',
      'Modern Next.js 14 with App Router architecture'
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