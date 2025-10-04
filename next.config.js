/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment optimization
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['via.placeholder.com'],
  },
  
  // Enable Next.js 15 features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Fix workspace root detection
  outputFileTracingRoot: __dirname,
  
  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Next.js 15 optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Vercel specific optimizations
  compress: true,
}

module.exports = nextConfig