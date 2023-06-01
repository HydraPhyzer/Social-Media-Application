/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['localhost','cdn.shopify.com',"fakestoreapi.com"],
  },
}
module.exports = nextConfig