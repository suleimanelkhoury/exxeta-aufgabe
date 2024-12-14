const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://hotel-manager:5000/:path*'
      }
    ];
  }
};

export default nextConfig;