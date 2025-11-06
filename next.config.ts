// next.config.js or next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.google.com"], // ✅ Add external image domain here
  },
};

export default nextConfig;
