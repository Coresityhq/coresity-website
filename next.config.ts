import type { NextConfig } from 'next'

// The site is a static export: `next build` writes plain HTML, JS and CSS to
// `out/`, which nginx serves (see docker/nginx/default.conf). There is no
// Node server in production.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  // next/image needs a server to optimise; the site uses plain <img> anyway.
  images: { unoptimized: true },
  // Keep the dev-only badge out of the way of the homepage story (and its
  // Playwright overflow checks).
  devIndicators: false,
}

export default nextConfig
