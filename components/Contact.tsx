'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Twitter, Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm(data: FormData): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Lithira-Silva',
    color: '#ffffff'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/lithirasilva',
    color: '#0077B5'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/lithirasilva',
    color: '#1DA1F2'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:lithira@example.com',
    color: '#00FFFF'
  }
]

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setStatus({ type: 'loading' })
    setErrors({})

    try {
      // Simulate API call - replace with actual form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact me directly via email.'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-mono text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-transparent border rounded-lg font-mono text-white placeholder-gray-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
          }`}
          placeholder="Your full name"
          disabled={status.type === 'loading'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400 font-mono">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-transparent border rounded-lg font-mono text-white placeholder-gray-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
          }`}
          placeholder="your.email@example.com"
          disabled={status.type === 'loading'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400 font-mono">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-mono text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-transparent border rounded-lg font-mono text-white placeholder-gray-500 transition-colors duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
            errors.message ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
          }`}
          placeholder="Tell me about your project or say hello..."
          disabled={status.type === 'loading'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400 font-mono">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full glow-button disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: status.type === 'loading' ? 1 : 1.02 }}
        whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
      >
        {status.type === 'loading' ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            Sending...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Send size={20} className="mr-2" />
            Send Message
          </div>
        )}
      </motion.button>

      {/* Status Messages */}
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center p-4 rounded-lg font-mono text-sm ${
            status.type === 'success'
              ? 'bg-green-900/50 border border-green-700 text-green-300'
              : 'bg-red-900/50 border border-red-700 text-red-300'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle size={20} className="mr-2 flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          )}
          {status.message}
        </motion.div>
      )}
    </form>
  )
}

export default function Contact() {
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
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 section-padding bg-black relative overflow-hidden"
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none grid-overlay"
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Let's <span className="text-cyan-400">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            Ready to build something extraordinary together? Whether you have a project in mind 
            or just want to discuss the future of AI, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-orbitron font-bold text-2xl text-white mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h3 className="font-orbitron font-bold text-2xl text-white mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4 text-gray-300 font-mono">
                <p className="leading-relaxed">
                  I'm always excited to discuss new opportunities, innovative projects, 
                  or potential collaborations in the AI/ML space.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Response time:</strong> Usually within 24 hours
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Location:</strong> San Francisco, CA (Open to remote)
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Availability:</strong> Open for freelance & full-time opportunities
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-orbitron font-bold text-lg text-white mb-4">
                Connect on Social
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      color: social.color,
                      borderColor: social.color,
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Connect on ${social.name}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h4 className="font-orbitron font-bold text-lg text-white mb-4">
                Quick Stats
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono">10+</div>
                  <div className="text-xs text-gray-400 font-mono">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono">50+</div>
                  <div className="text-xs text-gray-400 font-mono">Projects Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono">99%</div>
                  <div className="text-xs text-gray-400 font-mono">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono">24h</div>
                  <div className="text-xs text-gray-400 font-mono">Response Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-400 font-mono text-sm">
            © 2025 Lithira Silva | Built with Next.js & Love | 
            <span className="text-cyan-400 ml-1">Architecting Tomorrow's Code</span>
          </p>
        </motion.footer>
      </div>
    </section>
  )
}