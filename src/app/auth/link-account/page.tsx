// src/app/auth/link-account/page.tsx
import LinkAccountClient from './LinkAccountClient'

export default function LinkAccountPage() {
  // <LinkAccountClient /> é um Client Component,
  // mas esta página em si roda no servidor.
  return <LinkAccountClient />
}
