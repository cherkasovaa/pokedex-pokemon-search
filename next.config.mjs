import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/PokeAPI/**')],
  },
};

export default withNextIntl(nextConfig);