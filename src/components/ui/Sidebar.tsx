// src/components/ui/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HomeIcon,
  UserGroupIcon,
  ListBulletIcon,      // ← substitui ClipboardListIcon
  BuildingLibraryIcon,
  ClipboardIcon,
  Bars3Icon,          // ← substitui MenuIcon
  XMarkIcon,          // ← substitui XIcon
} from '@heroicons/react/24/outline'

interface NavLink {
  href: string
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const links: NavLink[] = [
  { href: '/dashboard',     label: 'Home',       icon: HomeIcon },
  { href: '/alunos',        label: 'Alunos',     icon: UserGroupIcon },
  { href: '/avaliacoes',    label: 'Avaliações', icon: ListBulletIcon }, // <--
  { href: '/empresas',      label: 'Empresas',   icon: BuildingLibraryIcon },
  { href: '/projetos',      label: 'Projetos',   icon: ClipboardIcon },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-white shadow-md 
        transition-[width] duration-300 ease-in-out
        ${open ? 'w-64' : 'w-16'}
      `}
    >
      {/* header do sidebar: logo + toggle */}
      <div className="flex items-center justify-between p-4">
        <img
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className={`transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded hover:bg-gray-200 focus:outline-none"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* links de navegação */}
      <nav className="mt-6 flex flex-col space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            href={href}
            key={href}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-md 
              hover:bg-gray-100 transition-colors
            `}
          >
            <Icon className="h-6 w-6" />
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
