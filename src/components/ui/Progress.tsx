type Props = {
  value: number
  className?: string
}

export function Progress({ value, className = '' }: Props) {
  return (
    <div className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-green-500 transition-all"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}
