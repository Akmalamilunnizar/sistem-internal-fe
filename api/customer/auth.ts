export function authCustomerApi() {
  return {
    async loginAuth(emailOrPhone: string, password: string) {
      const apiBase = useApiHost()
      return await $fetch<any>(`${apiBase}/api/auth/customer/login`, {
        method: 'POST',
        body: { email: emailOrPhone, password },
      })
    },
  }
}


