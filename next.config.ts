import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.opunaboekine.ng/api/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "api.opunaboekine.ng" },
      { hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
