import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Shared hosting (e.g. Hostinger) doesn't let Turbopack's PostCSS helper
    // processes connect back, so the build uses webpack (see package.json) and
    // compiles in the main process; dev keeps Turbopack but in worker threads.
    webpackBuildWorker: false,
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
};

export default nextConfig;
