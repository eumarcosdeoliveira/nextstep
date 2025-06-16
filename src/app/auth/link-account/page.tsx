// src/app/auth/link-account/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function LinkAccountPage() {
  const router = useRouter();
  // Altere o valor padrão de '/' para '/dashboard'
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'; // <--- MUDANÇA AQUI: '/dashboard' como padrão

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, type: 'error' as 'error' | 'success', message: '' });

  useEffect(() => {
    if (!email) {
      setToast({ visible: true, type: 'error', message: 'E-mail para vincular não encontrado. Tente novamente.' });
      router.push('/auth/login');
    }
  }, [email, router]);

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast({ visible: false, type: 'error' as 'error' | 'success', message: '' });

    if (!email) {
      setToast({ visible: true, type: 'error', message: 'E-mail não fornecido para vincular.' });
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: callbackUrl, // NextAuth.js usará este callbackUrl
    });

    setLoading(false);

    if (result?.error) {
      const errorMessage = result.error.includes('CredentialsSignin') ? 'Senha incorreta. Por favor, tente novamente.' : result.error;
      setToast({ visible: true, type: 'error', message: errorMessage });
    } else if (result?.ok) {
      const session = await getSession();
      if (session) {
         setToast({ visible: true, type: 'success', message: 'Conta vinculada com sucesso!' });
         router.push(callbackUrl); // Redireciona para o dashboard
      } else {
         setToast({ visible: true, type: 'error', message: 'Erro ao vincular conta. Tente novamente.' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {toast.visible && (
        <Toast type={toast.type} message={toast.message} position="top-right" onClose={() => setToast((t) => ({ ...t, visible: false }))} />
      )}
      <div className="w-full max-w-md  p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Vincular Conta</h1>
        <p className="text-gray-600 mb-6">Já existe uma conta registrada com o e-mail <span className="font-semibold text-blue-600">{email}</span>.</p>
        <p className="text-gray-600 mb-6">Para vincular sua conta Google, por favor, faça login com a senha existente para este e-mail:</p>

        <form onSubmit={handleLinkAccount} className="space-y-4">
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full bg-indigo-50 text-gray-900 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-green-400 text-white text-lg font-medium shadow-xl hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Vinculando...' : 'Vincular Conta'}
          </button>
        </form>
        <div className="mt-6 text-gray-500">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Cancelar e voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}