/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "api.gpt.ge",
      },
    ],
  },
  typescript: {
    // 完全禁用TypeScript检查
    ignoreBuildErrors: true,
  },
  eslint: {
    // 完全禁用ESLint检查
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
