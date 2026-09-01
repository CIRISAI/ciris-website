/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Keeps the build's peak memory down on Cloudflare's build VM.
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
    // Disable webpack's persistent filesystem cache. Cloudflare restores a
    // stale, multi-GB .next/cache from its build cache that webpack then
    // thrashes on for minutes before the build VM OOM/internal-errors; a clean
    // (uncached) build is ~90s and reliable. We give up incremental-rebuild
    // speed (which CF's poisoned cache wasn't delivering anyway) for a build
    // that can't be wedged by a bad restored cache.
    webpackConfig.cache = false;
    return webpackConfig;
  },
};

export default config;
