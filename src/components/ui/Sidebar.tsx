'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  HomeIcon,
  UserGroupIcon,
  ListBulletIcon,
  BuildingLibraryIcon,
  ClipboardIcon,
  ArrowRightOnRectangleIcon, // ícone de logout
} from '@heroicons/react/24/outline'

interface NavLink {
  href: string
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const links: NavLink[] = [
  { href: '/dashboard',            label: 'Home',       icon: HomeIcon },
  { href: '/dashboard/alunos',     label: 'Alunos',     icon: UserGroupIcon },
  { href: '/dashboard/avaliacoes', label: 'Avaliações', icon: ListBulletIcon },
  { href: '/dashboard/empresas',   label: 'Empresas',   icon: BuildingLibraryIcon },
  { href: '/dashboard/projetos',   label: 'Projetos',   icon: ClipboardIcon },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    
    <aside
      className={`
         top-4 left-4 h-[calc(100vh-2rem)] bg-white
        rounded-2xl shadow-lg border border-gray-200
        flex flex-col transition-[width] duration-300 ease-in-out
        w-16 hover:w-64 group overflow-visible absolute z-10 
      `}
    >

      {/* HEADER */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <Image
          src="/icon.svg"
          alt="Logo NextStep"
          width={32}
          height={32}
          className="object-contain mt-1 mb-4"
        />
        
      </div>

      {/* LINKS */}
      <nav className="mt-4 flex flex-col px-2 space-y-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname?.startsWith(href + '/')
          return (
            <Link href={href} key={href} passHref>
              <div
                className={`
                  group relative flex cursor-pointer select-none items-center gap-4
                  px-3 py-2 rounded-lg transition-colors
                  ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                <Icon
                  className={`h-6 w-6 flex-shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                />
                <span
                  className={`
                    whitespace-nowrap transition-opacity duration-300
                    opacity-0 group-hover:opacity-100
                  `}
                >
                  {label}
                </span>
              </div>
            </Link>
          )
        })}
        {/* Espaço para empurrar o botão logout para o fim */}
        <div className="flex-1" />
      </nav>

      {/* BOTÃO DE LOGOUT */}
      <div className="px-2 pb-4 mt-2">
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className={`
            group flex items-center gap-3 w-full px-3 py-2 rounded-lg
            text-gray-500 hover:text-red-600 hover:bg-red-50 transition
            font-semibold
          `}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            Sair
          </span>
        </button>
      </div>
    </aside>
  )
}
