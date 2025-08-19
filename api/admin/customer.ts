import { $fetch } from 'ofetch'

export const customerAdminApi = () => {
  const baseURL = 'http://localhost:8080/api'

  return {
    // Get all customers with pagination and search
    getAllCustomers(params?: { page?: number; search?: string; limit?: number }) {
      return $fetch(`${baseURL}/customers`, {
        method: 'GET',
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get customer by ID
    getCustomerById(id: number) {
      return $fetch(`${baseURL}/customers/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Create new customer
    createCustomer(customerData: any) {
      return $fetch(`${baseURL}/customers`, {
        method: 'POST',
        body: customerData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Update customer
    updateCustomer(id: number, customerData: any) {
      return $fetch(`${baseURL}/customers/${id}`, {
        method: 'PUT',
        body: customerData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Delete customer
    deleteCustomer(id: number) {
      return $fetch(`${baseURL}/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get customer trouble tickets
    getCustomerTickets(customerId: number) {
      return $fetch(`${baseURL}/customers/${customerId}/tickets`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  }
}
