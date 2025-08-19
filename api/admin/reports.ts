import { $fetch } from 'ofetch'

export const reportsAdminApi = () => {
  const baseURL = 'http://localhost:8080/api'

  return {
    // Get all trouble tickets
    getAllTickets(params?: { page?: number; search?: string; limit?: number }) {
      return $fetch(`${baseURL}/tickets`, {
        method: 'GET',
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get trouble type statistics
    getTroubleTypeStats() {
      return $fetch(`${baseURL}/reports/trouble-types`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get geographic trouble data
    getGeographicTroubleData() {
      return $fetch(`${baseURL}/reports/geographic`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get trouble summary statistics
    getTroubleSummary() {
      return $fetch(`${baseURL}/reports/summary`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  }
}
