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
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/meet-our-team", destination: "/about", permanent: true },
      {
        source: "/estate-agency/bay-holiday-homes/35848",
        destination: "/about",
        permanent: true,
      },
      { source: "/contact-us", destination: "/#contact", permanent: true },
      {
        source: "/property-to-rent",
        destination: "/properties",
        permanent: true,
      },
      {
        source: "/find-a-property",
        destination: "/properties",
        permanent: true,
      },
      {
        source: "/property-to-rent-in-plettenberg-bay-c325",
        destination: "/properties",
        permanent: true,
      },
      {
        source: "/:slug*-:id(\\d{6,})",
        destination: "/properties",
        permanent: true,
      },
      { source: "/management", destination: "/", permanent: true },
      { source: "/home-management", destination: "/", permanent: true },
      { source: "/articles/news", destination: "/", permanent: true },
      { source: "/things-to-do", destination: "/", permanent: true },
      { source: "/profile/login", destination: "/", permanent: true },
      { source: "/list-your-property", destination: "/", permanent: true },
      { source: "/email-alerts", destination: "/", permanent: true },
      { source: "/property-for-sale", destination: "/", permanent: true },
      { source: "/terms-and-conditions", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
