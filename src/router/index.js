import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: Home
  },
  // {
  //   path: "/itemMusic",
  //   component: () => import('../view/ItemMusic.vue')
  // }
]


const router = new VueRouter({
  routes
})

export default router
