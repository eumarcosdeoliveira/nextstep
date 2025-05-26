// src/components/ui/Select.tsx
'use client'

import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className = '', ...props }: SelectProps) {
  return (
    <select
      className={`
        w-full
        border border-gray-300
        rounded
        px-3 py-2
        bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${className}
      `}
      {...props}
    />
  )
}
