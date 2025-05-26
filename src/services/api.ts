function getBaseUrl(): string {
  if (typeof window !== 'undefined') return ''
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  if (envUrl) return envUrl.replace(/\/$/, '')
  return `http://localhost:${process.env.PORT ?? 3000}`
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${getBaseUrl()}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error((errBody.error as string) || res.statusText)
  }
  return res.json()
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path)
}
export function post<T>(path: string, body: any): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) })
}
export function put<T>(path: string, body: any): Promise<T> {
  return request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
}
export function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' })
}
