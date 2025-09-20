import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState, RefObject } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Smooth scroll utility
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

// Intersection Observer for animations
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  threshold = 0.1
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold }
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [elementRef, threshold])

  return isIntersecting
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Animation utilities
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Particle system utilities
export interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
}

export function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: randomBetween(0, canvasWidth),
    y: canvasHeight + 50,
    size: randomBetween(1, 3),
    speedX: randomBetween(-0.5, 0.5),
    speedY: randomBetween(-2, -0.5),
    opacity: randomBetween(0.3, 0.8),
    life: randomBetween(0.5, 1),
  }
}

export function updateParticle(particle: Particle, deltaTime: number): Particle {
  return {
    ...particle,
    x: particle.x + particle.speedX * deltaTime,
    y: particle.y + particle.speedY * deltaTime,
    life: particle.life - deltaTime * 0.001,
    opacity: particle.opacity * particle.life,
  }
}

// Form validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateForm(data: {
  name: string
  email: string
  message: string
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

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
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Local storage utilities
export function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
    return defaultValue
  }
}