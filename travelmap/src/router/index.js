import { createRouter, createWebHistory } from 'vue-router'
import TripsMap from '../views/TripsMap.vue'
import NotFound from '@/views/NotFound.vue'
// import Trips from '@/components/TripsList.vue'

const routes = [
  {
    path: '/',
    name: 'TripsMap',
    component: TripsMap,
    props: true
  },
  {
    path: '/tripslist',
    name: 'TripsList',
    component: () => import(/* webpackChunkName: "trips" */ '../views/TripsList.vue')
  },
  {
    path: '/trip/:id',
    name: 'TripDetails',
    component: () => import(/* webpackChunkName: "trip" */ '../views/TripDetails.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/member',
    name: 'member',
    component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // <----
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

// Set SEO metatag
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | My App`;
  next();
});

// Logged-in state check
// router.beforeEach((to, from, next) => {
//   // redirect to Login page if auth required but not logged in
//   if (!to.meta.noAuthRequired && !store.state.isLoggedIn) {
//     next({
//       name: 'UserLogin',
//       query: {
//         redirectTo: to.name,
//         message: 'Please login to visit that page',
//       },
//     });
//   }

//   next();
// });

export default router
