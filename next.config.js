/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    // Atenção: Isto desabilita as verificações de ESLint durante o build.
    // É recomendado apenas para depuração ou para iniciar um projeto.
    // Em produção, é ideal que o ESLint esteja habilitado para garantir a qualidade do código.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/register',
        destination: '/auth/register',
      },
    ]
  },
}

module.exports = nextConfig
