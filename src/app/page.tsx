// src/app/page.tsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Para verificar a sessão do usuário

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Hook para verificar a sessão

  useEffect(() => {
    // Se o status da sessão é 'loading', aguardamos.
    // O retorno do useEffect impede redirecionamentos antes da sessão ser carregada.
    if (status === 'loading') return;

    // Se o usuário está logado, redireciona para o dashboard
    if (session) {
      router.push('/dashboard');
    } else {
      // Se não está logado, redireciona para a página de login
      router.push('/auth/login');
    }
  }, [session, status, router]);

  // Exibe o spinner de carregamento enquanto a sessão está sendo carregada
  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-400 animate-spin"></div>
      </div>
    );
  }

  // Se a sessão já carregou e não redirecionou (o que não deveria acontecer idealmente),
  // pode-se renderizar algo padrão ou null.
  return null; // Ou um div vazio, ou um fallback se o redirecionamento falhar por algum motivo.
}