<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import UserForm from '../components/UserForm.vue'

const router = useRouter()
const store = useUserStore()

const handleCreate = async (payload: {name: string, email: string}) => {
  await store.createUser(payload)
  await store.fetchUsers(true)

  router.push({ name: 'users' })
}
</script>

<template>
  <div>
    <button @click="$router.back()">
      Back
    </button>

    <h1>Create User</h1>

    <UserForm
      :loading="store.loadingList"
      @submit="handleCreate"
    />
  </div>
</template>
