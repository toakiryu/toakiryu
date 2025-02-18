/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/" // Currently you need to set the `baseUrl` yourself

  async redirects() {
    return [
      {
        source: "/contact",
        destination: "https://forms.gle/obnr2m2TThG233DM8",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
