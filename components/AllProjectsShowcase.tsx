'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Search, Filter, ArrowLeft, Calendar, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Extended projects array with all projects
const allProjects = [
  {
    id: 1,
    title: 'AI-Powered E-Commerce Predictor',
    description: 'Real-time recommendation engine using collaborative filtering and deep learning to predict customer preferences with 94% accuracy. Built with microservices architecture to handle millions of daily interactions.',
    longDescription: 'This sophisticated recommendation system combines collaborative filtering, content-based filtering, and deep learning to provide personalized product recommendations. The system processes user behavior in real-time and updates recommendations instantly.',
    image: '/project-1.jpg',
    technologies: ['React', 'Node.js', 'TensorFlow', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Redis'],
    category: 'AI/ML',
    year: '2024',
    featured: true,
    status: 'Live',
    metrics: {
      users: '500k+',
      uptime: '99.9%',
      performance: '200ms avg response',
      accuracy: '94%'
    },
    links: {
      live: 'https://demo.example.com',
      github: 'https://github.com/Lithira-Silva/ai-ecommerce'
    },
    highlights: [
      'Real-time ML inference pipeline',
      'Microservices architecture',
      'A/B testing framework',
      'Advanced caching strategy'
    ]
  },
  {
    id: 2,
    title: 'Real-Time Fraud Detection System',
    description: 'ML-powered fraud detection using ensemble models and real-time stream processing to identify suspicious transactions instantly.',
    longDescription: 'Advanced fraud detection system using ensemble learning with Random Forest, XGBoost, and Neural Networks. Processes transactions in real-time with sub-10ms latency.',
    image: '/project-2.jpg',
    technologies: ['Python', 'Kafka', 'scikit-learn', 'Redis', 'Docker', 'Elasticsearch', 'Grafana'],
    category: 'AI/ML',
    year: '2024',
    featured: true,
    status: 'Live',
    metrics: {
      accuracy: '99.7%',
      processing: '10ms detection',
      savings: '$2M+ protected',
      throughput: '100k+ TPS'
    },
    links: {
      live: 'https://fraud-demo.example.com',
      github: 'https://github.com/Lithira-Silva/fraud-detection'
    },
    highlights: [
      'Real-time stream processing',
      'Ensemble ML models',
      'Sub-10ms latency',
      'Automated alert system'
    ]
  },
  {
    id: 3,
    title: 'Intelligent Content Management',
    description: 'AI-driven CMS with automatic content categorization, sentiment analysis, and personalized content delivery.',
    longDescription: 'Next-generation CMS powered by NLP and computer vision for automatic content analysis, tagging, and personalized delivery based on user preferences and behavior patterns.',
    image: '/project-3.jpg',
    technologies: ['Next.js', 'OpenAI API', 'MongoDB', 'Elasticsearch', 'Redis', 'AWS S3'],
    category: 'Full-Stack',
    year: '2024',
    featured: true,
    status: 'Live',
    metrics: {
      content: '1M+ articles',
      engagement: '+45% CTR',
      automation: '80% faster',
      accuracy: '96% classification'
    },
    links: {
      live: 'https://cms-demo.example.com',
      github: 'https://github.com/Lithira-Silva/ai-cms'
    },
    highlights: [
      'AI-powered content analysis',
      'Automated SEO optimization',
      'Real-time collaboration',
      'Smart content recommendations'
    ]
  },
  {
    id: 4,
    title: 'Predictive Analytics Dashboard',
    description: 'Real-time business intelligence platform with predictive modeling and interactive data visualization.',
    longDescription: 'Comprehensive BI platform with real-time data processing, predictive analytics using time series forecasting, and interactive dashboards for business insights.',
    image: '/project-4.jpg',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'TimescaleDB', 'Apache Airflow'],
    category: 'Data Science',
    year: '2023',
    featured: false,
    status: 'Live',
    metrics: {
      datapoints: '100M+',
      predictions: '92% accuracy',
      insights: 'Real-time',
      clients: '50+ companies'
    },
    links: {
      live: 'https://analytics-demo.example.com',
      github: 'https://github.com/Lithira-Silva/predictive-dashboard'
    },
    highlights: [
      'Time series forecasting',
      'Interactive data visualization',
      'Real-time streaming',
      'Automated reporting'
    ]
  },
  {
    id: 5,
    title: 'Neural Network Trading Bot',
    description: 'Algorithmic trading system using LSTM networks and technical analysis for cryptocurrency market predictions.',
    longDescription: 'Sophisticated trading algorithm combining LSTM neural networks with traditional technical analysis indicators for cryptocurrency market prediction and automated trading.',
    image: '/project-5.jpg',
    technologies: ['Python', 'PyTorch', 'WebSocket', 'TimescaleDB', 'Binance API', 'TA-Lib'],
    category: 'AI/ML',
    year: '2023',
    featured: false,
    status: 'Live',
    metrics: {
      roi: '+127% YoY',
      trades: '10k+ executed',
      latency: '<1ms',
      sharpe: '2.3'
    },
    links: {
      live: 'https://trading-demo.example.com',
      github: 'https://github.com/Lithira-Silva/neural-trading'
    },
    highlights: [
      'LSTM neural networks',
      'Technical analysis integration',
      'Risk management system',
      'Multi-exchange support'
    ]
  },
  {
    id: 6,
    title: 'Smart City IoT Platform',
    description: 'Scalable IoT data processing platform with edge computing and real-time environmental monitoring.',
    longDescription: 'Comprehensive IoT platform for smart city infrastructure, processing data from thousands of sensors with edge computing capabilities and real-time environmental monitoring.',
    image: '/project-6.jpg',
    technologies: ['Go', 'InfluxDB', 'Kubernetes', 'MQTT', 'Grafana', 'Docker', 'Prometheus'],
    category: 'IoT',
    year: '2023',
    featured: false,
    status: 'Live',
    metrics: {
      sensors: '50k+ connected',
      data: '1TB+ daily',
      cities: '12 deployed',
      uptime: '99.8%'
    },
    links: {
      live: 'https://iot-demo.example.com',
      github: 'https://github.com/Lithira-Silva/smart-city'
    },
    highlights: [
      'Edge computing architecture',
      'Real-time monitoring',
      'Scalable data ingestion',
      'Predictive maintenance'
    ]
  },
  {
    id: 7,
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain management using blockchain technology for product authenticity and traceability.',
    longDescription: 'End-to-end supply chain tracking solution built on Ethereum blockchain, providing immutable records of product journey from manufacture to delivery.',
    image: '/project-7.jpg',
    technologies: ['Solidity', 'React', 'Web3.js', 'IPFS', 'Node.js', 'PostgreSQL'],
    category: 'Blockchain',
    year: '2023',
    featured: false,
    status: 'Beta',
    metrics: {
      products: '1M+ tracked',
      transactions: '500k+ recorded',
      partners: '200+ suppliers',
      reduction: '40% fraud'
    },
    links: {
      live: 'https://supply-demo.example.com',
      github: 'https://github.com/Lithira-Silva/blockchain-supply'
    },
    highlights: [
      'Immutable product records',
      'QR code integration',
      'Smart contract automation',
      'Multi-stakeholder dashboard'
    ]
  },
  {
    id: 8,
    title: 'AI-Powered Chatbot Platform',
    description: 'Conversational AI platform with natural language understanding and multi-channel deployment capabilities.',
    longDescription: 'Advanced chatbot platform using transformer models for natural language understanding, with support for voice, text, and video interactions across multiple channels.',
    image: '/project-8.jpg',
    technologies: ['Python', 'Transformers', 'FastAPI', 'WebSocket', 'Redis', 'PostgreSQL'],
    category: 'AI/ML',
    year: '2022',
    featured: false,
    status: 'Live',
    metrics: {
      conversations: '2M+ handled',
      accuracy: '95% intent',
      languages: '25+ supported',
      response: '<200ms'
    },
    links: {
      live: 'https://chatbot-demo.example.com',
      github: 'https://github.com/Lithira-Silva/ai-chatbot'
    },
    highlights: [
      'Multi-language support',
      'Voice integration',
      'Sentiment analysis',
      'Learning from interactions'
    ]
  }
]

const categories = ['All', 'AI/ML', 'Full-Stack', 'Data Science', 'IoT', 'Blockchain']
const years = ['All', '2024', '2023', '2022']

interface ProjectCardProps {
  project: typeof allProjects[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative bg-gray-900 border border-gray-700 rounded-lg overflow-hidden transition-all duration-500 hover:border-cyan-400 hover:scale-105"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? '0 0 30px rgba(0, 255, 255, 0.3)' : 'none',
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-mono rounded-full border ${
            project.status === 'Live' 
              ? 'bg-green-500/20 border-green-500 text-green-400'
              : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" />
          </div>
        )}

        {/* Overlay Links */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors duration-300"
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
            {project.category}
          </span>
          <span className="text-xs font-mono text-gray-400 flex items-center">
            <Calendar size={12} className="mr-1" />
            {project.year}
          </span>
        </div>

        <h3 className="font-orbitron font-bold text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-mono text-gray-400 px-2 py-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Key Metric */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-400">Key Achievement:</span>
          <span className="text-cyan-400 flex items-center">
            <TrendingUp size={12} className="mr-1" />
            {Object.values(project.metrics)[0]}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function AllProjectsShowcase() {
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = allProjects

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Filter by year
    if (selectedYear !== 'All') {
      filtered = filtered.filter(project => project.year === selectedYear)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProjects(filtered)
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
              All <span className="text-cyan-400">Projects</span>
            </h1>
            <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
            <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
              Explore my complete portfolio of {allProjects.length} innovative projects spanning AI/ML, 
              full-stack development, data science, and emerging technologies.
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
                  placeholder="Search projects, technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white hover:border-cyan-400 transition-colors duration-300"
              >
                <Filter size={20} className="mr-2" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="mt-6 p-6 bg-gray-900 border border-gray-700 rounded-lg"
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
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 font-mono text-lg mb-4">
                No projects found matching your criteria
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