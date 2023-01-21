import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store =  new Vuex.Store({
  state: {
    member: null,
    trips: [],
    featuredTrips: [],
    countriesData: [],
    countries: []
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
    featuredTrips: state => {
      return state.trips.filter(trip => trip.acf.feature == true )
    },
    countriesSelectList: state => {
      return state.countries.map(country => country.country )
    },
    countriesData: state => {
      return state.countries.map(country=> country)
    },
    citiesByCountry: (state) => ( key ) => {
      return state.trips.filter( trip => trip.country_list == key)
    },
    tripsByCity: (state,getters) => ( key ) => {
      return getters.trips.find( trip => trip.city == key)
    },
    member: state => {
      return state.member
    },
    tripsByMember: (state,getters) => ( key) => {
      return getters.allTrips.filter( trip => trip.post_author == key)
    }
  },
  actions: {
    login({ commit }, payload){
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.post(`https://travel-map-wordpress.local/wp-json/jwt-auth/v1/token`, payload)
          commit('setMember', data)
          const token = data.token
          localStorage.setItem('user-token', token)
          resolve(data)
        }catch(e){
          reject(e)
        }
      })
    },
    validate({ state }) {
      return axios({
        url: `${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/jwt-auth/v1/token/validate`,
        method: 'post',
        headers: {
          'Authorization': `Bearer ${state.member.token}`
        }
      })
    },
    loadTrips ({ commit }) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/trips/v1/trip`)
        .then( response => response.data)
        .then( trips => {
          commit('setTrips', trips)
        })
    },
    loadCountries ({ commit }) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/acf/v3/options/option`)
        .then ( response => response.data)
        .then ( countries => {
          commit('setCountries', countries)
        })
    }
  },
  mutations: {
    setMember(state, member) {
      state.member = member
    },
    deleteMember(state) {
      state.member = null
    },
    setTrips (state, trips) {
      state.trips = trips
    },
    setCountries (state, countries) {
      state.countries = countries
    }
  }
})
