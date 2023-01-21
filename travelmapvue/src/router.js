import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from './store/index.js'
import Home from './views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trips/',
      name: 'trips',
      props: true,
      component: () => import(/* webpackChunkName: "trips" */ './views/Trips.vue')
    },
    {
      path: '/trips/:city',
      name: 'trip',
      props: true,
      component: () => import(/* webpackChunkName: "trip" */ './views/Trip.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import(/* webpackChunkName: "member" */ './views/Member.vue'),
      meta: { requiresAuth: true }
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: "active-link-class",
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if user is logged in
    // if not, redirect to login page.
    if (!store.state.member) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // we have a state.user object but
      // we need to check if the token is still valid
      try{
        // eslint-disable-next-line
        const { status } = await store.dispatch('validate')
        // user is logged in with a valid token
        next()
      }catch(e){
        // the token is invalid so we will have the user login again
        // clear the token and user info
        store.commit('deleteMember')
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  } else {
    // this is not a protected route
    next()
  }
})

export default router
