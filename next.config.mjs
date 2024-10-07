/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // to use SWR even when babel is added (by jest)
    forceSwcTransforms: true,
    // without this, 'Error: Expected Upload to be a GraphQL nullable type.'
    serverComponentsExternalPackages: ["graphql"],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
