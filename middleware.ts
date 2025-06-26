import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
console.log('🛡️ Middleware executado:', req.nextUrl.pathname)

  // Rotas públicas
  const isPublic =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')

  if (isPublic) return NextResponse.next()

  // Validação do JWT
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    secureCookie: process.env.NODE_ENV === 'production',
  })

  console.log('🔐 Token recebido:', token)

  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  const role = token.role?.toString()

  // Proteção por role para /dashboard/*
  if (pathname.startsWith('/dashboard')) {
    if (role === '1') {
      // Empresa
      if (
        !pathname.startsWith('/dashboard/empresa') &&
        !pathname.startsWith('/dashboard/projetos')
      ) {
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.redirect(url)
      }
    } else if (role === '2') {
      // Instituição
      if (
        !pathname.startsWith('/dashboard/instituicao') &&
        !pathname.startsWith('/dashboard/alunos') &&
        !pathname.startsWith('/dashboard/avaliacoes')
      ) {
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.redirect(url)
      }
    } else {
      // Qualquer outro role
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
