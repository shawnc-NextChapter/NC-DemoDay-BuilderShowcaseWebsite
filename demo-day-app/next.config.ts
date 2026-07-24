import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow unoptimized images during development (before real assets arrive)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
