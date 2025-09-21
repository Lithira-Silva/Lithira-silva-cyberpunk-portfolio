'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Search, Filter, ArrowLeft, Calendar, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { allProjects, categories, years, type ProjectData } from '@/lib/projectData'

interface ProjectCardProps {
  project: ProjectData
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showAllTechnologies, setShowAllTechnologies] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden transition-all duration-500 bg-gray-900 border border-gray-700 rounded-lg group hover:border-cyan-400 hover:scale-105"
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
      <div className="relative h-48 overflow-hidden sm:h-52 md:h-48">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-mono rounded-full ${
              project.status === 'Live'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="absolute top-3 right-3 flex space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-400 hover:bg-cyan-400/20 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-400 hover:bg-cyan-400/20 transition-colors"
          >
            <Github size={14} />
          </a>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-4 md:p-6">
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded">
            {project.category}
          </span>
          <span className="text-gray-400 flex items-center">
            <Calendar size={12} className="mr-1" />
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold text-white font-orbitron md:text-xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-gray-300 font-mono line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {(showAllTechnologies ? project.technologies : project.technologies.slice(0, 4)).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <button
              onClick={() => setShowAllTechnologies(!showAllTechnologies)}
              className="px-2 py-1 text-xs text-cyan-400 rounded font-mono hover:text-cyan-300 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {showAllTechnologies 
                ? 'Show less' 
                : `+${project.technologies.length - 4} more`
              }
            </button>
          )}
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
    <div className="min-h-screen pt-20 bg-black lg:pt-16">
      {/* Header */}
      <div className="py-8 section-padding md:py-12 lg:py-16">
        <div className="container-max">
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center mr-6 text-gray-400 transition-colors duration-300 hover:text-cyan-400"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            className="mb-8 text-center md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-4 text-3xl font-black text-white font-orbitron sm:text-4xl md:text-5xl lg:text-6xl">
              All <span className="text-cyan-400">Projects</span>
            </h1>
            <div className="w-16 h-1 mx-auto mb-4 bg-cyan-400 sm:w-24 md:mb-6"></div>
            <p className="max-w-3xl mx-auto font-mono text-base leading-relaxed text-gray-300 sm:text-lg">
              Explore my comprehensive construction management platform, showcasing full-stack development 
              expertise with advanced bidding systems, real-time project tracking, and automated financial management.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 font-mono text-sm text-white placeholder-gray-400 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 font-mono text-sm text-white transition-colors bg-gray-900 border border-gray-700 rounded-lg hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={16} className="mr-2" />
                Filters
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  ↓
                </motion.div>
              </motion.button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Category Filter */}
                      <div>
                        <label className="block mb-2 font-mono text-sm text-gray-400">
                          Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`px-3 py-2 text-sm font-mono rounded transition-colors duration-300 min-h-[44px] ${
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
                        <label className="block mb-2 font-mono text-sm text-gray-400">
                          Year
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {years.map((year) => (
                            <button
                              key={year}
                              onClick={() => setSelectedYear(year)}
                              className={`px-3 py-2 text-sm font-mono rounded transition-colors duration-300 min-h-[44px] ${
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
            <p className="font-mono text-sm text-gray-400">
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
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
              className="py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 font-mono text-lg text-gray-400">
                No projects found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedYear('All')
                  setSearchTerm('')
                }}
                className="font-mono underline text-cyan-400 hover:text-cyan-300"
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