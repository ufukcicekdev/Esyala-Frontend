/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['filestorages.fra1.cdn.digitaloceanspaces.com'],
  },
  experimental: {
    appDir: true, // Eğer "app" dizinini kullanıyorsanız bu gerekli.
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
