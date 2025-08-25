import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: "out",

  webpack(config) {
    // Remove existing file-loader for SVGs if present
    const assetRule = config.module.rules.find((rule:any) =>
      rule.test?.toString()?.includes("svg")
    );
    if (assetRule) {
      assetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
