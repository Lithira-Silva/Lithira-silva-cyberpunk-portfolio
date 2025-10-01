/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Fix workspace root detection
  outputFileTracingRoot: __dirname,
  
  // Allow cross-origin requests from network IP during development
  allowedDevOrigins: ['192.168.1.5:3000'],
  
  // Fix cross-origin dev warning
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
  
  // Next.js 15 optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Enable new Next.js 15 features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig