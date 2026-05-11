/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["react", "@supabase/supabase-js", "zustand"]
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, immutable" }
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=300" }
        ],
      },
    ];
  },
};

export default nextConfig;
