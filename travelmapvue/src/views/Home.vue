<template>
  <main>
    <div class="featured-trip__container">
      <FeaturedTrip v-for="trip in filterTrips" :key="trip.city" :city="trip.city" :image="trip.image.sizes.thumbnail"></FeaturedTrip>
    </div>
    <button @click="isVisible = !isVisible" class="filter" > {{buttonName}} </button>
    <Aside v-bind:class="{ visible: isVisible }" class="aside" :classValue="isVisible"></Aside>
      <HomeMap v-if="trips.length > 0" :trips="trips" :feautureTrips="filterTrips" ></HomeMap>
  </main>
</template>

<script>
// @ is an alias to /src
  import { mapGetters } from 'vuex'
  import Aside from '@/components/home/Aside.vue'
  import FeaturedTrip from '@/components/home/FeaturedTrip.vue'
  import HomeMap from '@/components/home/HomeMap.vue'

  export default {
    name: 'home',
    data() {
      return {
        isVisible: false,
        buttonCaption: "Filter"
      }
    },
    computed: {
      ...mapGetters({
        trips: 'trips'
      }),
      buttonName() {
        if(this.isVisible) {
          return this.buttonCaption = "Close"
         } else {
          return this.buttonCaption = "Filter"
         }
      },
      filterTrips() {
        return this.trips.filter(trip => trip.feature == true )
      }
    },
    mounted() {
      this.$store.dispatch('loadTrips')
    },
    components: {
      Aside,
      FeaturedTrip,
      HomeMap
    }
  }
</script>
