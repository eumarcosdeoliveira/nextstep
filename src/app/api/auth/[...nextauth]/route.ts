// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'          // seu PrismaClient
import { verifyUser } from '@/lib/auth'    // sua lógica real de verificação

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credenciais',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        // Chama sua função real. Deve retornar um objeto com { id, name, email, … } ou null
        return await verifyUser(credentials.email, credentials.password)
      },
    }),
  ],

  // ← Aqui foi a única mudança: 'jwt' em vez de 'database'
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
    updateAge: 5 * 60,
  },

  pages: {
    signIn: '/auth/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
