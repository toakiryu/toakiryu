import createNextIntlPlugin from "next-intl/plugin";

import nextAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/" // Currently you need to set the `baseUrl` yourself
  turbopack: {
    rules: {
      "*.glb": {
        loaders: ["three/examples/jsm/loaders/GLTFLoader"],
      },
    },
  },
  productionBrowserSourceMaps: true,
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
