/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "192.168.10.138",

        port: "5005", // Include the port if it's part of the hostname
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Add localhost with the port 3000
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home", // redirect `/` to `/home` by default
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
