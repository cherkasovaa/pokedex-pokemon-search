/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/PokeAPI/**')],
  },
};

export default nextConfig;
