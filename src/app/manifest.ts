import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ScantelburyDevs',
    short_name: 'ScantelburyDevs',
    description: 'Software que funciona. Time que entrega.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1E',
    theme_color: '#0A0F1E',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
