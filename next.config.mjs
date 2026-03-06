/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/tax',
        destination: '/tax-filing',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
