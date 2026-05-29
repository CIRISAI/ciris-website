import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
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
