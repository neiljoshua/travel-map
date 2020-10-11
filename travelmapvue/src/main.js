import './assets/scss/index.scss'
import Vue from 'vue'
import App from './App.vue'
import mapboxgl from 'mapbox-gl'
import router from './router'
import {store} from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mapboxgl,
  render: h => h(App)
}).$mount('#app')
