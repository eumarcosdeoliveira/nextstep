// src/services/api.ts
function getBaseUrl(): string {
  // Em ambiente de navegador, a URL base é a própria origem.
  // Em ambiente de servidor (Node.js), a URL base é obtida das variáveis de ambiente.
  if (typeof window !== 'undefined') return ''

  // NEXT_PUBLIC_API_BASE_URL é uma variável de ambiente que deve ser definida
  // para o URL base da sua API em produção ou staging.
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (envUrl) return envUrl.replace(/\/$/, '') // Remove barra final se houver

  // Fallback para ambiente de desenvolvimento
  return `http://localhost:${process.env.PORT ?? 3000}`
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${getBaseUrl()}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  // Se a resposta não for bem-sucedida (status 2xx), lança um erro
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    // Lança um erro com a mensagem do corpo da resposta ou o statusText
    throw new Error((errBody.error as string) || res.statusText)
  }

  // Retorna o corpo da resposta como JSON
  return res.json()
}

/**
 * Realiza uma requisição GET.
 * @param path O caminho da API.
 * @returns Uma Promise que resolve para o tipo de dado esperado.
 */
export function get<T>(path: string): Promise<T> {
  return request<T>(path)
}

/**
 * Realiza uma requisição POST.
 * @param path O caminho da API.
 * @param body Os dados a serem enviados no corpo da requisição.
 * @returns Uma Promise que resolve para o tipo de dado esperado.
 */
export function post<T>(path: string, body: unknown): Promise<T> { // Corrigido 'any' para 'unknown'
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) })
}

/**
 * Realiza uma requisição PUT.
 * @param path O caminho da API.
 * @param body Os dados a serem enviados no corpo da requisição.
 * @returns Uma Promise que resolve para o tipo de dado esperado.
 */
export function put<T>(path: string, body: unknown): Promise<T> { // Corrigido 'any' para 'unknown'
  return request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
}

/**
 * Realiza uma requisição DELETE.
 * @param path O caminho da API.
 * @returns Uma Promise que resolve para o tipo de dado esperado.
 */
export function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' })
}