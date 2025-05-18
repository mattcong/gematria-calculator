/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/calculate-alphabet': ['files/**/*'],
    },
  },
}

module.exports = nextConfig
