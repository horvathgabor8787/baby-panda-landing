/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/nevre-szolo-babaajandek", destination: "/", permanent: true },
    ];
  },
};
module.exports = nextConfig;
