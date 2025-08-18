export function useApiHost() {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || 'http://localhost:8080'
  return apiBase
}


