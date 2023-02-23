/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    // 서버 환경에서는 Node.js 모듈 경로 설정
    if (isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    // 모듈 로더 설정
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  generateBuildId: () => 'dangder',
  exportPathMap: () => ({
    '/404': { page: '/404' },
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
