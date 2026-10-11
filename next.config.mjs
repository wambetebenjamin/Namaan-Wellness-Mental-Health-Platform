/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Next.js 16 blocks cross-origin dev requests by default.
  // Allow the Arena / e2b live-preview hostnames so the preview works.
  allowedDevOrigins: ['*.e2b.app', '*.e2b.dev', '*.arena.ai'],

  // No remote image optimisation patterns are required: all imagery is
  // served locally from /public/images.
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders(),
      },
    ];
  },
};

/**
 * Security headers. Also mirrored in vercel.json for production deploys.
 * Mental health platform: strict transport, no embedding, minimal referrer.
 */
function securityHeaders() {
  return [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
  ];
}

export default nextConfig;
