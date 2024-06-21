/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'a0.muscache.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'mcixqhlrpmuoyfiwxizo.supabase.co',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'flagcdn.com',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

export default nextConfig
