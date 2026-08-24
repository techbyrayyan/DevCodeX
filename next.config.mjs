/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses
  compress: true,

  // Image optimization
  images: {
    // Modern formats — browser will pick AVIF or WebP automatically
    formats: ['image/avif', 'image/webp'],

    // Reasonable sizes for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Aggressive caching — 30 days
    minimumCacheTTL: 2592000,
  },

  // Serve static assets with long-lived cache headers
  async headers() {
    return [
      {
        source: '/(.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.avif|.*\\.svg|.*\\.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
