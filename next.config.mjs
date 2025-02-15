const nextConfig = {
  // output: "standalone",
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost:3000", "192.168.1.100:3000"],
      allowedOrigins: ["localhost:3000", "192.168.1.100:3000"],
    },
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
