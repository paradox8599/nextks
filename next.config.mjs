export const ksPath = "admin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: `/${ksPath}/:path*`,
      destination: `http://localhost:3000/${ksPath}/:path*`,
    },
  ],
  experimental: {
    // without this, 'Error: Expected Upload to be a GraphQL nullable type.'
    serverComponentsExternalPackages: ["graphql"],
  },
};

export default nextConfig;
