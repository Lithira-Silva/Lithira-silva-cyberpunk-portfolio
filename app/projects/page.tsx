import { Metadata } from 'next'
import AllProjectsShowcase from '@/components/AllProjectsShowcase'

export const metadata: Metadata = {
  title: 'Projects | Lithira Silva - Full-Stack AI Engineer',
  description: 'Explore my comprehensive portfolio of AI-powered applications, machine learning systems, and innovative full-stack solutions.',
  keywords: [
    'projects',
    'portfolio',
    'AI applications',
    'machine learning',
    'full-stack development',
    'React',
    'Next.js',
    'Python',
    'TensorFlow',
    'AWS'
  ],
  openGraph: {
    title: 'Projects | Lithira Silva - AI Engineer Portfolio',
    description: 'Discover innovative AI-powered projects and scalable full-stack applications built with cutting-edge technologies.',
    url: 'https://lithirasilva.dev/projects',
    type: 'website',
    images: [
      {
        url: 'https://lithirasilva.dev/og-projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Lithira Silva Projects Portfolio',
      },
    ],
  },
}

export default function ProjectsPage() {
  return (
    <main className="bg-black text-white">
      <AllProjectsShowcase />
    </main>
  )
}