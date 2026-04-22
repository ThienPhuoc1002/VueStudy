<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import UserForm from '../components/UserForm.vue'

const store = useUserStore()
const route = useRoute()
const router = useRouter()

const id = route.params.id as string

onMounted(async () => {
  store.fetchUserDetail(id)
})

const user = computed(() => store.userDetailMap[id])

const handleUpdate = async (payload: {name: string, email: string}) => {
  await store.updateUser(id, payload)

  await store.fetchUsers(true)

  router.push({ name: 'users' })
}
</script>

<template>
  <div>
    <button @click="$router.back()">
      Back
    </button>

    <h1>Edit User</h1>

    <UserForm
      v-if="user"
      :initial-data="user"
      :loading="store.loadingDetail"
      @submit="handleUpdate"
    />
  </div>
</template>
