import { $fetch } from 'ofetch'

export const transactionAdminApi = () => {
  const baseURL = 'http://localhost:8080/api'

  return {
    getAllTransactions(page: number | null = null) {
      const params = page ? `?page=${page}` : ''
      return $fetch(`${baseURL}/transactions${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  }
}
