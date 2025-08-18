<script setup lang="ts">
import { reactive, ref } from 'vue'
import { authApi } from '@/api/auth'
import { authCustomerApi } from '@/api/customer/auth'

const state = reactive({
  email: '',
  password: ''
})

const activeTab = ref<'customer' | 'employee'>('customer')
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)

function validate(): string[] {
  const errors: string[] = []
  if (!state.email) errors.push('Email/Phone is required')
  if (!state.password) errors.push('Password is required')
  return errors
}

async function onSubmitEmployee(e: Event) {
  e.preventDefault()
  errorMessage.value = null
  const errors = validate()
  if (errors.length) {
    errorMessage.value = errors[0]
    return
  }
  isSubmitting.value = true
  try {
    const authStore = useAuthStore()
    const response = await authApi().loginAuth(state.email, state.password)
    authStore.login({ token: response.data.token, role_id: response.data.user?.role?.id, role_name: response.data.user?.role?.name })
    await navigateTo('/dashboard')
  } catch (err: any) {
    errorMessage.value = String(err?.message || err || 'Login failed')
  } finally {
    isSubmitting.value = false
  }
}

async function onSubmitCustomer(e: Event) {
  e.preventDefault()
  errorMessage.value = null
  const errors = validate()
  if (errors.length) {
    errorMessage.value = errors[0]
    return
  }
  isSubmitting.value = true
  try {
    const authStore = useAuthStore()
    const response = await authCustomerApi().loginAuth(state.email, state.password)
    authStore.login({ token: response.data.token, role_name: 'customer' })
    await navigateTo('/dashboard')
  } catch (err: any) {
    errorMessage.value = String(err?.message || err || 'Login failed')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="card">
      <div class="brand">Lilly <span>ISP</span></div>

      <div class="tabs">
        <button :class="['tab', { active: activeTab === 'customer' }]" @click="activeTab = 'customer'">Customer</button>
        <button :class="['tab', { active: activeTab === 'employee' }]" @click="activeTab = 'employee'">Employee</button>
      </div>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <form v-if="activeTab === 'customer'" class="form" @submit="onSubmitCustomer">
        <label class="label">No. Handphone</label>
        <input v-model="state.email" class="input" placeholder="08xxxxxxxxxx" />

        <label class="label">Password</label>
        <input v-model="state.password" class="input" type="password" placeholder="••••••••" />

        <button class="button" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <form v-else class="form" @submit="onSubmitEmployee">
        <label class="label">Email</label>
        <input v-model="state.email" class="input" placeholder="you@example.com" />

        <label class="label">Password</label>
        <input v-model="state.password" class="input" type="password" placeholder="••••••••" />

        <button class="button" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #111827, #065f46, #000000);
  padding: 24px;
}
.card {
  width: 100%;
  max-width: 420px;
  padding: 24px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
}
.brand {
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}
.brand span { color: #34d399; }
.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  flex: 1;
  padding: 10px 12px;
  background: rgba(255,255,255,0.08);
  color: #e5e7eb;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  cursor: pointer;
}
.tab.active { background: #10b981; color: #082f2a; border-color: #10b981; }
.error { color: #ef4444; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); padding: 8px 12px; border-radius: 8px; margin-bottom: 12px; }
.form { display: flex; flex-direction: column; gap: 10px; }
.label { color: #e5e7eb; font-size: 14px; }
.input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.25);
  color: #fff;
}
.button {
  margin-top: 8px;
  padding: 10px 14px;
  background: #10b981;
  color: #052e2b;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.button[disabled] { opacity: 0.65; cursor: not-allowed; }
</style>


