import { $fetch } from 'ofetch'

export const dashboardAdminApi = () => {
  const baseURL = 'http://localhost:8080/api'

  return {
    cardCustomerDashboard() {
      return $fetch(`${baseURL}/dashboard/customer`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    cardPacketPopularDashboard() {
      return $fetch(`${baseURL}/dashboard/packet-popular`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    cardAreaPopularDashboard() {
      return $fetch(`${baseURL}/dashboard/area-popular`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    cardReportCashDashboard() {
      return $fetch(`${baseURL}/dashboard/report-cash`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    totalIncomeDashboard() {
      return $fetch(`${baseURL}/dashboard/total-income`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    totalExpensesDashboard() {
      return $fetch(`${baseURL}/dashboard/total-expenses`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    totalNetWorthDashboard() {
      return $fetch(`${baseURL}/dashboard/total-net-worth`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    totalSalesDashboard() {
      return $fetch(`${baseURL}/dashboard/total-sales`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  }
}
