<template>
  <main class="trips">
    <h1>Travel Map</h1>
    <div class="trips-info">
      <div class="trips-info__list">
        <TripsList v-for="trip in trips" :key="trip.ID" :data-city="trip.city" :trip="trip" />
      </div>
      <div class="trips-info__map">
        <TripsMap v-if="trips.length > 0" :trips="trips" />
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import TripsList from '@/components/trips/TripsList.vue'
import TripsMap from '@/components/trips/TripsMap.vue'

 export default {
    name: 'Trips',
    computed: {
      ...mapGetters({
        trips: 'trips'
      })
    },
    mounted() {
      this.$store.dispatch('loadTrips')
    },
    components: {
      TripsList,
      TripsMap
    }
 }

</script>
