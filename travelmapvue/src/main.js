import './assets/scss/index.scss'
import Vue from 'vue'
import App from './App.vue'
import Mapbox from 'mapbox-gl-vue';
import router from './router'
import {store} from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Mapbox,
  render: h => h(App)
}).$mount('#app')
