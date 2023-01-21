// import './assets/scss/index.scss'
import App from './App.vue'
import mapboxgl from 'mapbox-gl'
import router from './router'
import {store} from './store'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  mapboxgl,
  render: h => h(App)
}).$mount('#app')

