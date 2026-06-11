import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // The localized Accord reader adds ~800 MDX pages; these reduce the build's
  // peak memory so Cloudflare's build VM doesn't OOM during webpack compilation.
  experimental: {
    webpackMemoryOptimizations: true,
  },
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  webpack: (webpackConfig) => {
    // coherence-kernel ships as a wasm-bindgen bundler-target package.
    // Newer wasm-pack outputs import the .wasm directly, which webpack 5
    // only honors with the async-wasm experiment enabled.
    webpackConfig.experiments = {
      ...(webpackConfig.experiments ?? {}),
      asyncWebAssembly: true,
    };
    return webpackConfig;
  },
};

export default withMDX(config);
