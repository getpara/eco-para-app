import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /pino-pretty/ }, { module: /@farcaster/ }];
    return config;
  },
};

export default nextConfig;
