<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { useRoute } from 'vue-router'

const store = useUserStore()
const route = useRoute()

const id = route.params.id as string

onMounted(() => {
  store.fetchUserDetail(id)
})

const user = computed(() => store.userDetailMap[id])
</script>

<template>
  <div>
    <button @click="$router.back()">
      Back
    </button>

    <h1>User Detail</h1>

    <div v-if="store.loadingDetail">
      Loading...
    </div>
    <div v-else-if="store.error">
      {{ store.error }}
    </div>

    <div v-else-if="user">
      <p>ID: {{ user.id }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>

    <div v-else>
      User not found
    </div>
  </div>
</template>
