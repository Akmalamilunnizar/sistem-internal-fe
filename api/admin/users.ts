import { $fetch } from 'ofetch'

export const userManagementApi = () => {
  const baseURL = 'http://localhost:8080/api'

  return {
    // Get all staff users
    getAllStaff(params?: { page?: number; search?: string; limit?: number }) {
      return $fetch(`${baseURL}/staff`, {
        method: 'GET',
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get staff by ID
    getStaffById(id: number) {
      return $fetch(`${baseURL}/staff/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Create new staff member
    createStaff(staffData: any) {
      return $fetch(`${baseURL}/staff`, {
        method: 'POST',
        body: staffData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Update staff member
    updateStaff(id: number, staffData: any) {
      return $fetch(`${baseURL}/staff/${id}`, {
        method: 'PUT',
        body: staffData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Delete staff member
    deleteStaff(id: number) {
      return $fetch(`${baseURL}/staff/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    },

    // Get available roles
    getRoles() {
      return $fetch(`${baseURL}/roles`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  }
}
