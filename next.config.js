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
        hostname: "corislo.vercel.app",
        pathname: "/images**"
      },
       {
        protocol: "http",
        hostname: "corislo.vercel.app",
        pathname: "/images**"
      }
    ],
  },
};

module.exports = nextConfig;
