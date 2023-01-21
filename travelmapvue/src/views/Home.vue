<template>
  <main>
    <div class="featured-trip__container">
      <FeaturedTrip v-for="trip in filterTrips" :key="trip.city" :city="trip.city" :image="trip.image.sizes.thumbnail"></FeaturedTrip>
    </div>
    <!-- <Aside v-bind:class="{ visible: isVisible }" class="aside" :classValue="isVisible" :countriesList="countriesList"></Aside> -->
    <HomeMap
      v-if="trips.length > 0"
      :trips="trips"
      :feautureTrips="filterTrips"
      :countriesList="countriesList">
    </HomeMap>
  </main>
</template>

<script>
// @ is an alias to /src
  import { mapGetters } from 'vuex'
  import FeaturedTrip from '@/components/home/FeaturedTrip.vue'
  import HomeMap from '@/components/home/HomeMap.vue'

  export default {
    name: 'home',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        trips: 'trips',
        countriesList: 'countriesSelectList',
        member: 'member'
      }),
      filterTrips() {
        return this.trips.filter(trip => trip.feature == true )
      }
    },
    mounted() {
      this.$store.dispatch('loadTrips')
      this.$store.dispatch('loadCountries')
    },
    components: {
      FeaturedTrip,
      HomeMap
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    width: calc(100% - 4px);
    height: calc(100vh - 4px);
    border: $yellow 2px solid;

    .trip-container {
      display: flex;
      justify-content: center;
    }
  }
</style>
