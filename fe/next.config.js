/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.prathammotors.com",
      },
      {
        protocol: "https",
        hostname: "imgd.aeplcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.livemint.com",
      },
      {
        protocol: "https",
        hostname: "www.carandbike.com",
      },
      {
        protocol: "https",
        hostname: "c.ndtvimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn.skoda-auto.com",
      },
      {
        protocol: "https",
        hostname: "img.autocarindia.com",
      },
      {
        protocol: "https",
        hostname: "media.zigcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.financialexpress.com",
      },
    ],
  },
};

module.exports = nextConfig;
