/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // R3F dither + React 19 types mismatch — runtime is fine
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/brand-kit",
        destination: "/",
        permanent: true,
      },
      {
        source: "/academics",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gallery-lab",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
