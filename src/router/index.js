import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCookie } from '../utils/cookie'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      // reject the navigation
      if (to.name === "Home") {
        if (getCookie("status")) {
          next();
        } else {
          next({ path: "/login" })
        }
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
