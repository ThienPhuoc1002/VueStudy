import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const fetchUsersApi = () => {
  return api.get('/users')
}

export const fetchUserDetailApi = (id: string) => {
  return api.get(`/users/${id}`)
}

export const createUserApi = (data: { name: string; email: string }) => {
  return api.post('/users', data)
}

export const updateUserApi = (id: string, data: { name: string; email: string }) => {
  return api.put(`/users/${id}`, data)
}

export const deleteUserApi = (id: string) => {
  return api.delete(`/users/${id}`)
}
