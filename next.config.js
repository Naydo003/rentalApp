/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        // For seed images. Delete later.
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
