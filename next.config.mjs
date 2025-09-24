/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['lucide-react'],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    
    // Fix for Web3Modal SSR issues
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Handle indexedDB SSR issues
    if (isServer) {
      config.externals.push('idb-keyval');
    }
    
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      type: 'javascript/auto',
    });

    return config;
  },
  typescript: {
    // Disable type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  // Suppress hydration warnings for Web3Modal
  reactStrictMode: false,
};

export default nextConfig;