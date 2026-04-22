import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUserDetailApi, fetchUsersApi, createUserApi, updateUserApi, deleteUserApi } from '../services/userService'

export type User = {
  id: string
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const userDetailMap = ref<Record<string, User>>({})

  const loadingList = ref(false)
  const loadingDetail = ref(false)

  const error = ref<string | null>(null)

  const fetchUsers = async (force = false) => {
    if (!force && users.value.length > 0) return

    loadingList.value = true
    error.value = null

    try {
      const res = await fetchUsersApi()
      users.value = res.data
    } catch {
      error.value = 'Failed to fetch users'
    } finally {
      loadingList.value = false
    }
  }

  const fetchUserDetail = async (id: string) => {
    if (userDetailMap.value[id]) return

    loadingDetail.value = true
    error.value = null

    try {
      const res = await fetchUserDetailApi(id)
      userDetailMap.value[id] = res.data
    } catch {
      error.value = 'Failed to fetch user detail'
    } finally {
      loadingDetail.value = false
    }
  }

  const createUser = async (payload: { name: string; email: string }) => {
    try {
      const res = await createUserApi(payload)

      users.value.push(res.data)

      return res.data
    } catch {
      error.value = 'Create user failed'
    }
  }

  const updateUser = async (id: string, payload: { name: string; email: string }) => {
    try {
      const res = await updateUserApi(id, payload)

      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) users.value[index] = res.data

      userDetailMap.value[id] = res.data

      return res.data
    } catch {
      error.value = 'Update failed'
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await deleteUserApi(id)

      users.value = users.value.filter(u => u.id !== id)

      delete userDetailMap.value[id]
    } catch {
      error.value = 'Delete failed'
    }
  }

  return {
    users,
    userDetailMap,
    loadingList,
    loadingDetail,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    fetchUserDetail
  }
})
