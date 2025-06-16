// src/app/api/auth/[...nextauth]/route.ts
// Este arquivo é o ponto de entrada da API NextAuth.js.
// Ele simplesmente re-exporta o handler de configuração completa definido em '@/lib/auth'.

import { handler } from "@/lib/auth"; // Importa o handler AGORA como named export

export { handler as GET, handler as POST }; // Re-exporta o handler para as requisições GET e POST