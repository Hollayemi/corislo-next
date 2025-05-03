/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configure Content Security Policy for client-side scripts
      config.module.rules.push({
        test: /maps\.googleapis\.com/,
        use: ["script-loader"],
      });
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/xmart/image/upload/**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/xmart/image/upload/**',
      },
      {
        protocol: "https",
        hostname: "corisio.com",
        pathname: "/images**"
      },
       {
        protocol: "http",
        hostname: "corislo.vercel.app",
        pathname: "/images**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname (be careful, this is wild)
      },
    ],
  },
};

module.exports = nextConfig;
