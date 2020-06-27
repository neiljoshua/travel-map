import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: "active-link-class",
  routes: [
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
  ]
})
