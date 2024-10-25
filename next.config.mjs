/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/admin/:path*",
      destination: "http://localhost:3000/admin/:path*",
    },
  ],
  // without this, 'Error: Expected Upload to be a GraphQL nullable type.'
  serverExternalPackages: ["graphql"],
};

export default nextConfig;
