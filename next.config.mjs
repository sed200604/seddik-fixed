/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },

  // Compiler options - strip console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // Security + caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static assets 1 year
        source: '/(.*)\\.(ico|png|jpg|jpeg|webp|avif|svg|woff|woff2|ttf|eot)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/tax',
        destination: '/tax-filing',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
