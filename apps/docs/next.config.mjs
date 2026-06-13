import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const isStatic = process.env.IS_PROD_STATIC === 'true';
const isStandalone =
  process.env.NEXT_OUTPUT === 'standalone' ||
  (!isStatic && process.env.NODE_ENV === 'production' && process.platform !== 'win32');
const githubPagesRepoName = process.env.GITHUB_PAGES_REPO_NAME || 'af-docs';

if (isStatic) {
  console.log('Building Docs as Static Export for GitHub Pages\n');
} else if (isStandalone) {
  console.log('Building Docs as Standalone Next.js App\n');
} else {
  console.log('Building Docs as standard Next.js output\n');
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(isStatic && {
    output: 'export',
    distDir: 'out',
    images: { unoptimized: true },
    basePath: '/' + githubPagesRepoName,
  }),
  ...(isStandalone && {
    output: 'standalone',
  }),
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checks enabled
    ignoreBuildErrors: false,
  },
};

export default withMDX(config);
