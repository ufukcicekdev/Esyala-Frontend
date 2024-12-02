/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
  ...(isMobile ? { output: 'export' } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['filestorages.fra1.cdn.digitaloceanspaces.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/customerauth/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + '/customerauth/:path*'
      },
    ];
  },
};

module.exports = nextConfig;
