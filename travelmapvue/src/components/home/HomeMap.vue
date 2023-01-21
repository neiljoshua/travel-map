<template>
  <transition name="fade">
    <div id='map' class='map'>
      <button @click="pressedButton" class="filter" > {{ buttonCaption }} </button>
      <div  v-bind:class="[isActive ? 'map-selects' : 'map-selects active']">

        <select
          id="city-select"
          class="map-select"
          v-model="selected"
          @change="locateCountry">
          <option disabled value="">Countries</option>
          <option v-for="country in countries" :key="country.id" v-bind:value="country" >
            {{ country }}
          </option>
        </select>

        <select v-if="selected.length<1" class="map-select" v-model="selectedCity">
          <option disabled value="">Cities</option>
        </select>

        <select v-else id="city-select" class="map-select" v-model="selectedCity" @change="locateCity" >
          <option disabled value="">Cities</option>
          <option v-for="city in citiesOptions" :key="city.city" v-bind:value="city.city_list" >
            {{ city.city_list}}
          </option>
        </select>

      </div>
    </div>
  </transition>
</template>

<script>

  import mapboxgl from 'mapbox-gl'
  import { mapGetters } from 'vuex'


  export default {
    name: 'HomeMap',
    data() {
      return {
        accessToken: process.env.VUE_APP_MAP,
        selected:'',
        selectedCity:'',
        map: {},
        citiesOptions: [],
        isActive: true,
        buttonCaption: 'Filters'
      };
    },
    computed: {
      ...mapGetters({
        cities: 'citiesByCountry',
        city: 'tripsByCity',
        allTrips: 'allTrips'
      }),
      countries() {
        return this.$store.state.countries
      }
    },
    methods: {
      locateCountry() {
        var location = this.trips.find( trip => trip.country_list == this.selected )

        this.selectedCity = '';
        this.citiesOptions = this.trips.filter( trip => trip.country_list == this.selected)

        if(location) {
          this.map.flyTo({
              center: [parseFloat(location.latitude), parseFloat(location.longitude)],
              zoom: 4,
          });
        }
      },

      locateCity() {
        var city = this.trips.find( trip => trip.city_list == this.selectedCity)

        if(city != null) {
          this.map.flyTo({
              center: [parseFloat(city.latitude), parseFloat(city.longitude)],
              zoom: 9,
          });
        }

      },

      pressedButton() {
        if( this.isActive ){
          this.isActive = false
          this.buttonCaption = 'Close'
        } else {
          this.isActive = true
          this.buttonCaption = 'Filters'
        }
      },
    },
    mounted() {
      mapboxgl.accessToken = this.accessToken;

      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [-81.4608, 48.4758],
          zoom: 3,
          minZoom: 2
      });

      this.map = map;

      map.on('load', (() => {
          this.trips.forEach((trip) => {

              var el = document.createElement('div'),
                  popup = new mapboxgl.Popup({ offset: 25, className: 'map_popup'}).setHTML("<img src="+trip.image.sizes.thumbnail+" alt="+trip.city+"><h3>"+trip.city+" </h3> <p>"+trip.info+"</p>");
              el.className = 'marker';
              el.setAttribute('marker-name', trip.city);
              el.setAttribute('data-lon', trip.longitude);
              el.setAttribute('data-lat', trip.latitude);

              new window.mapboxgl.Marker(el)
                  .setLngLat([parseFloat(trip.latitude), parseFloat(trip.longitude)])
                  .setPopup(popup)
                  .addTo(map);
          });

          this.feautureTrips.forEach((feautureTrip) =>{
            document.getElementById(feautureTrip.city)
              .addEventListener('click', () => {
                map.flyTo({
                    center: [parseFloat(feautureTrip.latitude), parseFloat(feautureTrip.longitude)],
                    zoom: 5,
                });
            })
          });

      }).bind(this));

    },
    props: {
      trips: Array,
      feautureTrips: Array,
      countriesList: Array
    }
  }
</script>
<style lang="scss">
  .marker {
    background-image: url('~@/assets/images/marker.svg');
    background-size: cover;
    background-color: $bluegray;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
  }

  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(100vw - 4px);
    height: calc(100vh - 4px);
    border-radius: 7px;
  }

  .filter {
    position: absolute;
    top: 40px;
    right: 50px;
    font-weight: bold;
    font-size: 18px;
    color: $bluegray;
    background: $yellow;
    padding: 8px 15px;
    border-radius: 7px;
    z-index: 3;
    transition: box-shadow .3s;
    &:hover {
      box-shadow: 0 0 11px $blackshadow;
    }
  }

  .map-selects {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    right: -190px;
    z-index: 2;
    height: 100vh;
    background: $white;
    transition: right .6s ease-in-out;
    &.active {
      right: 0;
      transition: right .6s ease-in-out;
    }
  }

  .map-select{
    width: 150px;
    margin: 20px;
  }

  .mapboxgl-canvas-container {
    position: absolute;
  }

  .mapboxgl-popup {
    max-width: 200px;
  }

  .mapboxgl-popup-content {
    border: 2px solid $yellow;
    color: $bluegray;
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
    img {
      width: 100%;
      height: 120px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    p {
      color: $darkgray;
      font-size: 12px;
      line-height: 1.2;
    }
  }

  .mapboxgl-popup-close-button {
    right: 10px;
    top: 5px;
    background: white;
    font-size: 15px;
    font-weight: 600;
  }

</style>
