import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.scdn.co", // Allow all subdomains of Spotify's CDN
        pathname: "/**", // Allow all image paths under the domain
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net", // Allow all subdomains of Facebook's CDN
        pathname: "/**", // Allow all image paths under the domain
      },
    ],
  },
};

export default nextConfig;