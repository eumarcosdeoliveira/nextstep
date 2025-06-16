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
    async jwt({ token, user, account: _account, profile: _profile }) { // 'profile' foi renomeado
      if (user) {
        token.id = String(user.id);
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) { // 'Session' e 'JWT' são usados aqui
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ user, account, profile: _profile, email: _email, credentials }) { // 'profile' e 'email' foram renomeados
      console.log('--- signIn callback ---');
      console.log('  user (from login attempt):', user);
      console.log('  account (if OAuth):', account);
      console.log('  credentials (if Credentials):', credentials ? { email: credentials.email } : null);

      if (account) {
        console.log('  Login attempt is via OAuth provider:', account.provider);

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          include: { Account: true }
        });

        console.log('  existingUser found by email (OAuth flow):', existingUser ? { id: existingUser.id, email: existingUser.email, accountsCount: existingUser.Account.length } : 'None');

        if (existingUser) {
          const hasLinkedAccount = existingUser.Account.some(
            (acc: { provider: string; providerAccountId: string; userId: number }) =>
              acc.provider === account.provider && acc.providerAccountId === account.providerAccountId
          );

          if (!hasLinkedAccount) {
            console.log('  User exists, but this OAuth account NOT linked. Attempting to link manually.');
            try {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
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
              return true;
            } catch (error) {
              console.error('Error during manual account linking:', error);
              return `/auth/link-account?email=${encodeURIComponent(user.email as string)}&error=linking_failed`;
            }
          } else {
            console.log('  User exists AND OAuth account IS linked. Allowing login.');
            return true;
          }
        } else {
          console.log('  User with this email does NOT exist. Allowing new OAuth account creation.');
          return true;
        }
      } else if (credentials) {
        console.log('  Login attempt is via Credentials.');
        console.log('  Credentials login. Allowing login.');
        return true;
      }

      console.log('  Unhandled signIn scenario. Denying login.');
      return false;
    },

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