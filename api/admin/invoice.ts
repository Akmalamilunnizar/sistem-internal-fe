import { $fetch } from 'ofetch'

export const invoiceAdminApi = () => {
  const baseURL = 'http://localhost:8080/api'

  return {
    getAllInvoices() {
      return $fetch(`${baseURL}/invoices`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  }
}
