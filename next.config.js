/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "images.pexels.com",
      "firebasestorage.googleapis.com"
    ]
  }
};

module.exports = nextConfig;
