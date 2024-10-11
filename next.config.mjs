/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/admin/:path*",
      destination: "http://localhost:3000/admin/:path*",
    },
  ],
  experimental: {
    // without this, 'Error: Expected Upload to be a GraphQL nullable type.'
    serverComponentsExternalPackages: ["graphql"],
  },
};

export default nextConfig;
