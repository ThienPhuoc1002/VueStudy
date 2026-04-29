<script setup lang="ts">
import { ref, watch } from 'vue'

type UserPayload = {
  name: string
  email: string
}

const props = defineProps<{
  initialData?: UserPayload
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: UserPayload): void
}>()

const name = ref('')
const email = ref('')

watch(
  () => props.initialData,
  (val) => {
    if (val) {
      name.value = val.name
      email.value = val.email
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', {
    name: name.value,
    email: email.value
  })
}
</script>

<template>
  <div>
    <input
      v-model="name"
      placeholder="Name"
    >
    <input
      v-model="email"
      placeholder="Email"
    >

    <button
      :disabled="loading"
      @click="handleSubmit"
    >
      {{ loading ? 'Saving...' : 'Submit' }}
    </button>
  </div>
</template>
