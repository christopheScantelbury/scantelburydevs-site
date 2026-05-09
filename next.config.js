/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'scantelburydevs.com.br' }],
        destination: 'https://www.scantelburydevs.com.br/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
