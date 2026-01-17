import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/pokemons',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
