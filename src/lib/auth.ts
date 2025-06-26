import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    id: string
    role?: string
    empresa_id?: number
    instituicao_id?: number
  }

  interface Session {
    user: {
      id?: string
      role?: string
      empresa_id?: number
      instituicao_id?: number
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string
    empresa_id?: number
    instituicao_id?: number
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id:             String(user.id),
          name:           user.name,
          email:          user.email,
          image:          user.image,
          role:           String(user.role_id),
          empresa_id:     user.empresa_id ?? undefined,
          instituicao_id: user.instituicao_id ?? undefined
        }
      }
    })
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id             = user.id
        token.role           = user.role
        token.empresa_id     = user.empresa_id
        token.instituicao_id = user.instituicao_id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id             = token.id
        session.user.role           = token.role
        session.user.empresa_id     = token.empresa_id
        session.user.instituicao_id = token.instituicao_id
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },

  pages: {
    signIn: '/auth/login',
    error:  '/auth/login'
  }
}

export const handler = NextAuth(authOptions)
