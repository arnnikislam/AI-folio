/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove the headers configuration as it might cause issues with Vercel
  // Enable static exports for Vercel deployment
  output: 'standalone',
};

module.exports = nextConfig;
