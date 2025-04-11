/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
    unoptimized: true,
  },
  // Enable static exports for Vercel deployment if needed
  // output: 'export',
};

module.exports = nextConfig;
