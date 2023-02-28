/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['localhost','cdn.shopify.com'],
  },
}
module.exports = nextConfig