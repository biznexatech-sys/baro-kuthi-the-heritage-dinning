import type { NextConfig } from 'next';

// Static export for Hostinger shared hosting: `next build` writes plain HTML/CSS/JS to out/.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // /story/ → out/story/index.html, which Apache serves without rewrites
  images: { unoptimized: true }, // no image server on static hosting; ship pre-sized WebP/AVIF
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
