// src/components/ui/Button.tsx
'use client'

import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 'primary' = gradiente azul→verde; 'outline' = contorno */
  variant?: 'primary' | 'outline'
  /** largura full? */
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'font-semibold rounded-xl py-3 px-6 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white hover:opacity-95 flex items-center justify-center'
      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
  const widthClass = fullWidth ? 'w-full' : ''
  return (
    <button
      className={`${base} ${variantClasses} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
