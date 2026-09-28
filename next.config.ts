import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      {
        // Old résumé URL; the file now lives at one path only.
        source: '/assets/resume.pdf',
        destination: '/assets/Mitul_Bhatia_Resume.pdf',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
