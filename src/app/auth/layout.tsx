// src/app/auth/layout.tsx

'use client'; // Se for um Client Component


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Seu layout de autenticação
    <div>
      {children}
    </div>
  );
}