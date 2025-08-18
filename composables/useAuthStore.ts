import { computed } from 'vue'

type LoginPayload = {
  token: string
  role_id?: number | string
  role_name?: string
}

export function useAuthStore() {
  const authToken = useState<string | null>('auth_token', () => null)
  const userRoleId = useState<number | string | null>('auth_role_id', () => null)

  function mapRoleIdToName(roleId: number | string | null): string | null {
    if (roleId === null || roleId === undefined) return null
    const n = Number(roleId)
    switch (n) {
      case 1: return 'owner'
      case 2: return 'customer_service'
      case 3: return 'noc'
      case 4: return 'technician'
      default: return null
    }
  }

  const userRoleName = useState<string | null>('auth_role_name', () => null)
  const isAuthenticated = computed(() => Boolean(authToken.value))

  function login(payload: LoginPayload) {
    authToken.value = payload.token
    if (payload.role_id !== undefined) {
      userRoleId.value = payload.role_id
    }
    const derivedRoleName = payload.role_name || mapRoleIdToName(payload.role_id ?? null)
    if (derivedRoleName) userRoleName.value = derivedRoleName
    try {
      localStorage.setItem('auth_token', payload.token)
      if (payload.role_id !== undefined) {
        localStorage.setItem('auth_role_id', String(payload.role_id))
      }
      if (derivedRoleName) localStorage.setItem('auth_role_name', derivedRoleName)
    } catch {
      // ignore storage errors
    }
  }

  function logout() {
    authToken.value = null
    userRoleId.value = null
    userRoleName.value = null
    try {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_role_id')
      localStorage.removeItem('auth_role_name')
    } catch {
      // ignore storage errors
    }
  }

  return {
    token: authToken,
    roleId: userRoleId,
    roleName: userRoleName,
    isAuthenticated,
    login,
    logout,
  }
}


