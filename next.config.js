/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use Next.js defaults for Vercel hosting. Remove GitHub Pages-specific fields
  // such as `output: 'export'`, `basePath`, and `assetPrefix` so styles and
  // static assets are served from the root path on Vercel.
  images: {
    // Keep Next.js image optimization enabled (default). Set to `true` implicitly.
  },
}

module.exports = nextConfig
