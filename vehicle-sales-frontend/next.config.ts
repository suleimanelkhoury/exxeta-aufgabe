const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://vehicle-sales-backend:5000/:path*'
      }
    ];
  }
};

export default nextConfig;