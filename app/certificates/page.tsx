import { Metadata } from 'next'
import AllCertificatesShowcase from '@/components/AllCertificatesShowcase'

export const metadata: Metadata = {
  title: 'Certifications | Lithira Silva - Full-Stack AI Engineer',
  description: 'Explore my comprehensive portfolio of professional certifications in cloud computing, artificial intelligence, DevOps, and modern development practices.',
  keywords: [
    'certifications',
    'professional certificates',
    'AWS certifications',
    'Google Cloud certifications',
    'Azure certifications',
    'AI certifications',
    'DevOps certifications',
    'cloud computing',
    'machine learning',
    'Kubernetes',
    'TensorFlow'
  ],
  openGraph: {
    title: 'Certifications | Lithira Silva - AI Engineer Portfolio',
    description: 'Professional certifications validating expertise in cloud computing, AI/ML, and modern development practices.',
    url: 'https://lithirasilva.dev/certificates',
    type: 'website',
    images: [
      {
        url: 'https://lithirasilva.dev/og-certificates.jpg',
        width: 1200,
        height: 630,
        alt: 'Lithira Silva Professional Certifications',
      },
    ],
  },
}

export default function CertificatesPage() {
  return (
    <main className="bg-black text-white">
      <AllCertificatesShowcase />
    </main>
  )
}