import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [425, 800, 1280],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "wordpress.bayholidays.co.za" },
    ],
  },
};

export default nextConfig;
