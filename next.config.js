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
};

module.exports = nextConfig;
