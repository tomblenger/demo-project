/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'localhost',
      // add other domains if needed
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      }
    ],
  },
  transpilePackages: ['@oakistni/db', '@oakistni/utils'],
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3001',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Handle absolute imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@assets': require('path').resolve(__dirname, 'public/assets'),

      '@components': require('path').resolve(__dirname, 'src/components'),
      '@layout': require('path').resolve(__dirname, 'src/layout'),
      '@svg': require('path').resolve(__dirname, 'src/svg'),
      '@hooks': require('path').resolve(__dirname, 'src/hooks'),
      '@redux': require('path').resolve(__dirname, 'src/redux'),
      '@ui': require('path').resolve(__dirname, 'src/ui'),
      '@utils': require('path').resolve(__dirname, 'src/utils'),
      '@lib': require('path').resolve(__dirname, 'src/lib'),
    };
    
    return config;
  },
};

module.exports = nextConfig;
