// components/ui/Toast.tsx
import { useEffect } from 'react'

type ToastProps = {
  type: 'success' | 'error'
  message: string
  onClose: () => void
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export function Toast({ type, message, onClose, position = 'bottom-right' }: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onClose, 5000)
    return () => clearTimeout(id)
  }, [onClose])

  const colors = {
    success: {
      bg: 'bg-green-100 dark:bg-green-800',
      icon: 'text-green-500 dark:text-green-200',
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-800',
      icon: 'text-red-500 dark:text-red-200',
    },
  }[type]

  const positions = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  }[position]

  return (
    <div
      className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm fixed ${positions} z-50`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${colors.icon} ${colors.bg} rounded-lg`}
      >
        {type === 'success' ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
          </svg>
        )}
      </div>
      <div className="ms-3 text-sm font-normal flex-1">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  )
}
