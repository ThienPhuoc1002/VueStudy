<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const deletingId = ref<string | null>(null)

const askDelete = (id: string) => {
  deletingId.value = id
}

const cancelDelete = () => {
  deletingId.value = null
}

const confirmDelete = async (id: string) => {
  await store.deleteUser(id)
  deletingId.value = null
}

onMounted(() => {
  store.fetchUsers()
})
</script>

<template>
  <div>
    <button @click="$router.back()">
      Back
    </button>

    <h1>User List</h1>

    <div v-if="store.loadingList">
      Loading...
    </div>
    <div v-else-if="store.error">
      {{ store.error }}
    </div>

    <ul v-else>
      <li
        v-for="user in store.users"
        :key="user.id"
      >
        <router-link :to="`/users/${user.id}`">
          {{ user.name }} - {{ user.email }}
        </router-link>

        <button>
          <router-link :to="`/users/${user.id}/edit`">
            Edit
          </router-link>
        </button>

        <button @click="askDelete(user.id)">
          Delete
        </button>

        <span v-if="deletingId === user.id">
          Are you sure?
          <button @click="confirmDelete(user.id)">Yes</button>
          <button @click="cancelDelete">No</button>
        </span>
      </li>
    </ul>

    <router-link to="/users/create">
      Create User
    </router-link>
  </div>
</template>
