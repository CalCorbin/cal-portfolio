/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/garage-sales',
        destination:
          'https://data.okc.gov/services/portal/api/data/records/Garage%20Sales',
      },
    ];
  },
};

module.exports = nextConfig;
