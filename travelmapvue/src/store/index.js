import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store =  new Vuex.Store({
  state: {
    trips: [],
    featuredTrips: []
  },
  getters: {
    allTrips: state => {
      return state.trips.map(trip => trip)
    },
    trips: state => {
     return state.trips.map(trip => trip.acf)
    },
    trip: (state, getters) => (key) => {
      return getters.trips.find( trip => trip.city == key )
    },
    featuredTrips: state =>{
      return state.trips.filter(trip => trip.acf.feature == true )
    }
  },
  actions: {
    loadTrips ({ commit }) {
      axios
        .get('https://travel-map-wordpress.local/wp-json/trips/v1/trip')
        .then( response => response.data)
        .then( trips => {
          commit('setTrips', trips)
        })
    }
  },
  mutations: {
    setTrips (state, trips) {
      state.trips = trips
    }
  }
})
