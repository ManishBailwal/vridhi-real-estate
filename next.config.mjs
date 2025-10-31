/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Allow external placeholder images used as fallbacks (e.g. placehold.co)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow SVGs from trusted remote sources (these placeholders return SVG)
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
