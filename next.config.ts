import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Atenção: Isto desabilita as verificações de ESLint durante o build.
    // É recomendado apenas para depuração ou para iniciar um projeto.
    // Em produção, é ideal que o ESLint esteja habilitado para garantir a qualidade do código.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
