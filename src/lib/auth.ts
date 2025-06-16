// src/lib/auth.ts
import NextAuth, { AuthOptions, DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db"; // Caminho para sua instância do Prisma Client
import bcrypt from 'bcryptjs';

import { JWT } from "next-auth/jwt";

// Tipagem estendida para o módulo next-auth, para incluir o 'role' no User e no JWT
declare module "next-auth" {
  interface User {
    id: string; // Para garantir que o ID do usuário é string para NextAuth
    role?: string; // Adiciona a propriedade 'role' ao tipo User do NextAuth
  }
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Adiciona a propriedade 'id' ao token JWT
    role?: string; // Adiciona a propriedade 'role' ao token JWT
  }
}

// Defina authOptions com a tipagem AuthOptions do NextAuth
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(user.id), // Converta para string, pois o NextAuth espera IDs como string
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = String(user.id);
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    // Callback signIn para lidar com o redirecionamento OAuthAccountNotLinked
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          include: { Account: true } // <--- CORREÇÃO AQUI: 'Account' com 'A' maiúsculo
        });

        if (existingUser) {
          // A tipagem de 'acc' também precisa ser do modelo 'Account' do Prisma
          const hasGoogleAccount = existingUser.Account.some((acc: { provider: string }) => acc.provider === 'google'); // <--- CORREÇÃO AQUI: existingUser.Account
          
          if (!hasGoogleAccount) {
            return `/auth/link-account?email=${encodeURIComponent(user.email as string)}`;
          }
        }
      }
      return true;
    },
    // Redirect callback
    async redirect({ url, baseUrl }) {
      if (url.startsWith(`${baseUrl}/auth/link-account`)) {
        return url;
      }
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
  }
};

const handler = NextAuth(authOptions);

export { handler };