 /** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // 👇 Only uncomment if your GitHub Pages URL is ajayw36.github.io/Portfolio-Website/
  basePath: '/Portfolio-Website',
  assetPrefix: '/Portfolio-Website/',
}

module.exports = nextConfig
