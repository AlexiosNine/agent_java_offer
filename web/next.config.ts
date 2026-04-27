import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true'
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || 'agent_java_offer'

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : 'standalone',
  ...(isStaticExport ? {
    basePath: `/${repoName}`,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
