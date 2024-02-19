import  { createStore } from 'vuex'
import  TripService from '@/services/TripService.js'
import  PageService from '@/services/PageService.js'
import  axios from 'axios'

export default createStore({
 state:{
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  userToken: localStorage.getItem('token') || '',
  userEmail: localStorage.getItem('email') || '',
  userDisplayName: localStorage.getItem('displayName') || '',
  member: JSON.parse(localStorage.getItem('member')) || null,
  isLoading: false,
  trips: [],
  trip:{},
  pages: [],
  countries: [],
  map: null
 },
 getters:{
  // trips: state => {
  //  return state.trips.map(trip => trip.acf)
  // },
  trip: (state, getters) => (key) => {
   return getters.trips.find( trip => trip.city == key )
  },
  trips: state => {
    return state.trips.map( trip => {
      const tripID = trip.ID
      return { ...trip.acf, tripID }
    })
  },
  pages: state => {
    return state.pages.map( page => page.acf )
  },
  page: (state,getters)  => (key)=>{
    return getters.pages.find( page => page.slug == key )
  },
  countriesList: state => {
    return state.countries.map( country => country.country )
  },
  countriesAndCities: state => {
    return state.countries.map( country=> country)
  },
  citiesByCountry: (state) => (key) => {
    return state.countries.find( country => country.country == key )
  }
 },
 mutations: {
  SET_LOADING_STATUS(state){
   state.isLoading = !state.isLoading
  },
  SET_TRIP( state, trip) {
   state.trip = trip
  },
  SET_TRIPS( state, trips) {
   state.trips = trips
  },
  SET_PAGES( state, pages) {
   state.pages = pages
  },
  SET_COUNTRIES(state, countries) {
    state.countries = countries
  },
  SET_MAP(state, map){
    state.map = map
  },
  cacheUser(state,{ token, email, displayName, member }) {
   state.isLoggedIn = true;
   state.userToken = token;
   state.userEmail = email;
   state.userDisplayName = displayName;
   state.member = member;
  },
  deleteUserCache(state) {
   state.isLoggedIn = false;
   state.userToken = '';
   state.userEmail = '';
   state.userDisplayName = '';
   state.member = null;
  },
 },
 actions: {

  async login(payload) {

   const response = await axios.post(`${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/jwt-auth/v1/token`, payload);

   const data = response.data;
   // const token = data.token;

   // localStorage.setItem('user-token', token)
   localStorage.setItem('isLoggedIn', true);
   localStorage.setItem('token', data.token);
   localStorage.setItem('displayName', data.user_display_name);
   localStorage.setItem('email', data.user_email);
   localStorage.setItem('member', JSON.stringify(data));

  },

  async logout({ commit }) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');
    localStorage.removeItem('member');

    commit('deleteUserCache');
  },
  /**
   * Check if user if logged in
   */
  async checkLoginState({ commit }) {
    const token = localStorage.getItem('token');

    // if no token, empty the loggedIn cache
    if (!token) {
      await commit('deleteUserCache');
      return false;
    }

    // if has token, check if it's still valid
    try {
      await axios.post(
        `${process.env.VUE_APP_BACKEND_DOMAIN}/jwt-auth/v1/token/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // if still valid, cache it again
      await commit('cacheUser', {
        token,
        email: localStorage.getItem('email'),
        displayName: localStorage.getItem('displayName'),
        member: localStorage.getItem('member'),
      });

      return true;
    } catch (error) {
      localStorage.setItem('token', '');
      return false;
    }
  },
  fetchTrips({ commit }){
   TripService.getTrips()
   .then(response => {
    commit('SET_TRIPS', response.data)
   })
   .catch(error => {
    console.log(error)
   })
  },
  fetchPages({ commit }){
   PageService.getPages()
   .then(response => {
    commit('SET_PAGES', response.data)
   })
   .catch(error => {
    console.log(error)
   })
  },
  loadCountries ({ commit }) {
    axios
      .get(`${process.env.VUE_APP_BACKEND_DOMAIN}/wp-json/acf/v3/options/option`)
      .then ( response => response.data)
      .then ( countries => {
        commit('SET_COUNTRIES', countries)
      })
  },
  loadMap(context){
    context.commit('SET_MAP')
  }
 },
 modules: {
 }

});
