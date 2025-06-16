// src/components/ui/Select.tsx
'use client'

import React from 'react'

const baseClasses =
  'w-full bg-indigo-50 rounded-xl py-4 px-6 text-gray-900 placeholder-gray-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-400'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Se passado, renderiza essas opções; senão, renderiza children */
  options?: { value: string | number; label: string }[]
  className?: string
  children?: React.ReactNode
}

export function Select({
  options,
  children,
  className = '',
  ...props
}: SelectProps) {
  return (
    <select className={`${baseClasses} ${className}`} {...props}>
      {options
        ? options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        : children}
    </select>
  )
}
