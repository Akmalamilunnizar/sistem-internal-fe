export function authApi() {
  return {
    async loginAuth(email: string, password: string) {
      const apiBase = useApiHost()
      return await $fetch<any>(`${apiBase}/api/auth/employee/login`, {
        method: 'POST',
        body: { email, password },
      })
    },
  }
}


