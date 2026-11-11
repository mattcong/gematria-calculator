/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/api/calculate-alphabet': ['files/**/*'],
  },
}

module.exports = nextConfig
