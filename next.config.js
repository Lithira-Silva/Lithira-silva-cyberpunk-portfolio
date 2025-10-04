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
  
  // Configure for network access
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  
  // Allow network IP access in development  
  allowedDevOrigins: ['192.168.1.3:3000', 'localhost:3000'],
  
  // Enable Next.js 15 features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Fix workspace root detection
  outputFileTracingRoot: __dirname,
  
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
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  
  // Next.js 15 optimizations
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig