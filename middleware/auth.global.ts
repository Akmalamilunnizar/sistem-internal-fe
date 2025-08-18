export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  // Try hydrate from localStorage on first run
  if (!auth.token.value) {
    try {
      const t = localStorage.getItem('auth_token')
      const r = localStorage.getItem('auth_role_id')
      const rn = localStorage.getItem('auth_role_name')
      if (t) auth.login({ token: t, role_id: r || undefined, role_name: rn || undefined })
    } catch {}
  }

  const requiresAuth = to.meta?.requiresAuth as boolean | undefined
  const allowedRoles = (to.meta?.roles as string[] | undefined) || []

  if (requiresAuth && !auth.isAuthenticated.value) {
    return navigateTo('/login')
  }

  if (allowedRoles.length > 0) {
    const roleName = auth.roleName.value
    if (!roleName || !allowedRoles.includes(roleName)) {
      return navigateTo('/login')
    }
  }
})


