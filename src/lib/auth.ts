// src/lib/auth.ts
import NextAuth, { AuthOptions, DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from 'bcryptjs';

import { JWT } from "next-auth/jwt";

// Tipagem estendida para o módulo next-auth
declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
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
    id?: string;
    role?: string;
  }
}

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

        // Retorna o usuário autenticado. NextAuth vai serializar isso para o JWT.
        return {
          id: String(user.id),
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
    // Callback signIn para lidar com o redirecionamento OAuthAccountNotLinked E a vinculação manual
    async signIn({ user, account, profile, email, credentials }) {
      console.log('--- signIn callback ---');
      console.log('  user (from login attempt):', user);
      console.log('  account (if OAuth):', account);
      console.log('  credentials (if Credentials):', credentials ? { email: credentials.email } : null);

      if (account) { // Se for um login via provedor (OAuth)
        console.log('  Login attempt is via OAuth provider:', account.provider);

        // Tentar encontrar um usuário existente pelo email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          include: { Account: true } // Corrigido para 'Account' com 'A' maiúsculo
        });

        console.log('  existingUser found by email (OAuth flow):', existingUser ? { id: existingUser.id, email: existingUser.email, accountsCount: existingUser.Account.length } : 'None');

        if (existingUser) {
          const hasLinkedAccount = existingUser.Account.some(
            (acc: { provider: string; providerAccountId: string; userId: number }) => // Tipagem mais explícita
              acc.provider === account.provider && acc.providerAccountId === account.providerAccountId
          );

          if (!hasLinkedAccount) {
            // Usuário existe com este e-mail, mas esta conta OAuth NÃO está vinculada
            // IMPORTANTE: TENTAR VINCULAR AQUI SE O PRISMAADAPTER NÃO FEZ AUTOMATICAMENTE
            console.log('  User exists, but this OAuth account NOT linked. Attempting to link manually.');
            try {
              await prisma.account.create({
                data: {
                  userId: existingUser.id, // ID do usuário existente
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                },
              });
              console.log('  Manual account linking successful!');
              return true; // Permite o login após a vinculação manual
            } catch (error) {
              console.error('Error during manual account linking:', error);
              // Se a vinculação manual falhar (ex: duplicate entry), redirecione para link-account
              // Ou para a página de erro com uma mensagem mais específica
              return `/auth/link-account?email=${encodeURIComponent(user.email as string)}&error=linking_failed`;
            }
          } else {
            // Usuário existe E a conta OAuth JÁ está vinculada. Permite login.
            console.log('  User exists AND OAuth account IS linked. Allowing login.');
            return true;
          }
        } else {
          // Usuário com este e-mail NÃO existe no DB (primeiro login OAuth para este email)
          // NextAuth.js vai criar um novo usuário e uma nova conta automaticamente via adaptador.
          console.log('  User with this email does NOT exist. Allowing new OAuth account creation.');
          return true;
        }
      } else if (credentials) { // Se for login via credenciais
        console.log('  Login attempt is via Credentials.');
        // Aqui, o 'user' já vem do authorize(). Se chegou aqui, as credenciais estão ok.
        // O NextAuth.js fará o login padrão. Se houver uma sessão OAuth pendente,
        // o adaptador deve lidar com a vinculação automática.
        console.log('  Credentials login. Allowing login.');
        return true;
      }

      console.log('  Unhandled signIn scenario. Denying login.');
      return false; // Por segurança, nega cenários não tratados
    },

    // Redirect callback
    async redirect({ url, baseUrl }) {
      console.log('--- redirect callback ---');
      console.log('  url:', url);
      console.log('  baseUrl:', baseUrl);
      if (url.startsWith(`${baseUrl}/auth/link-account`)) {
        console.log('  Redirecting to link-account page.');
        return url;
      }
      console.log('  Redirecting to default or specified URL.');
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