import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/core', '@repo/http', 'lucide-react', 'framer-motion'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' },
      { protocol: 'http', hostname: '*' },
    ],
    unoptimized: true,
  },
  output: 'standalone',
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  cleanDistDir: true,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
    optimizePackageImports: ['@repo/ui', '@repo/core', '@repo/http', 'framer-motion', 'xlsx'],
  },
  pageExtensions: ['tsx', 'ts'],

  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,

    DOMAIN: process.env.DOMAIN,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,

    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev',
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev',

    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    AUTH_KAKAO_ID: process.env.AUTH_KAKAO_ID,
    AUTH_KAKAO_SECRET: process.env.AUTH_KAKAO_SECRET,
    NEXT_PUBLIC_KAKAO_SCRIPT: process.env.NEXT_PUBLIC_KAKAO_SCRIPT,

    AUTH_NAVER_ID: process.env.AUTH_NAVER_ID,
    AUTH_NAVER_SECRET: process.env.AUTH_NAVER_SECRET,

    NEXT_PUBLIC_TOSS_CLIENT_ID: process.env.NEXT_PUBLIC_TOSS_CLIENT_ID,
    TOSS_SECRET_ID: process.env.TOSS_SECRET_ID,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})(nextConfig);
