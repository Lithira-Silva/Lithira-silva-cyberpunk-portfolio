'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Notification from './Notification'

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_pz0flvp'
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_uwwv9z5'
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '9TOl-Wl_HYP3dnY6K'

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

interface NotificationState {
  isVisible: boolean
  type: 'success' | 'error'
  title: string
  message: string
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
    url: 'https://www.linkedin.com/in/lithira-silva-20b42a370',
    color: '#0077B5'
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
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Map EmailJS field names to our form data keys
    let dataKey: keyof FormData
    if (name === 'user_name') dataKey = 'name'
    else if (name === 'user_email') dataKey = 'email'
    else dataKey = name as keyof FormData
    
    setFormData(prev => ({ ...prev, [dataKey]: value }))
    
    // Clear error when user starts typing
    if (errors[dataKey]) {
      setErrors(prev => ({ ...prev, [dataKey]: undefined }))
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
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)
      
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', result.text)
      
      setStatus({ type: 'success' })
      setFormData({ name: '', email: '', message: '' })
      
      // Show success notification
      setNotification({
        isVisible: true,
        type: 'success',
        title: 'Message Sent Successfully!',
        message: 'Your message has been transmitted to the mainframe. I\'ll respond within 24 hours!'
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus({ type: 'error' })
      
      // Show error notification
      setNotification({
        isVisible: true,
        type: 'error',
        title: 'Transmission Failed',
        message: 'System malfunction detected. Please try again or contact me directly via social media.'
      })
    }
  }

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-mono text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="user_name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg font-mono text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
            errors.name ? 'border-red-500' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(10, 10, 10, 0.6) 100%)',
            backdropFilter: 'blur(12px) saturate(120%)',
            WebkitBackdropFilter: 'blur(12px) saturate(120%)',
            border: errors.name ? '1px solid #ef4444' : '1px solid rgba(115, 115, 115, 0.3)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
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
          name="user_email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg font-mono text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
            errors.email ? 'border-red-500' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(10, 10, 10, 0.6) 100%)',
            backdropFilter: 'blur(12px) saturate(120%)',
            WebkitBackdropFilter: 'blur(12px) saturate(120%)',
            border: errors.email ? '1px solid #ef4444' : '1px solid rgba(115, 115, 115, 0.3)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
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
          className={`w-full px-4 py-3 rounded-lg font-mono text-white placeholder-gray-500 transition-all duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
            errors.message ? 'border-red-500' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(10, 10, 10, 0.6) 100%)',
            backdropFilter: 'blur(12px) saturate(120%)',
            WebkitBackdropFilter: 'blur(12px) saturate(120%)',
            border: errors.message ? '1px solid #ef4444' : '1px solid rgba(115, 115, 115, 0.3)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
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

      {/* Notification Component */}
      <Notification
        isVisible={notification.isVisible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={closeNotification}
        duration={6000}
      />
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
                  <strong className="text-white">Location:</strong> Colombo, Sri Lanka (Open to remote)
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
            <div 
              className="rounded-lg p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.8) 0%, rgba(0, 255, 255, 0.06) 40%, rgba(15, 15, 15, 0.85) 100%)',
                backdropFilter: 'blur(16px) saturate(140%)',
                WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                border: '1px solid rgba(115, 115, 115, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
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
      </div>
    </section>
  )
}