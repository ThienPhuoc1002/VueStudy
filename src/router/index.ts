import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import UserList from '../views/UserList.vue'
import UserDetail from '../views/UserDetail.vue'
import UserCreate from '../views/UserCreate.vue'
import UserEdit from '../views/UserEdit.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/users', name: 'users', component: UserList },
  { path: '/users/:id', component: UserDetail, props: true },
  { path: '/users/create', component: UserCreate },
  { path: '/users/:id/edit', component: UserEdit },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
