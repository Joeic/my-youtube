import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "image.mux.com",
    },
    {
      protocol: "https",
      hostname: "utfs.io",
    },
  ],
  },
};

export default nextConfig;
