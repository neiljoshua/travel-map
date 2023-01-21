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
<style lang="scss" scoped>

  .trips {
  width: 100vw;
  h1 {
    font-size: 22px;
    padding: 80px 0 40px;
  }

  .trips-info {
    display: flex;
    border-top: 3px solid $gray;
    width: 100%;
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
    }
    @include media-min-width(desktop) {
      position: relative;
      width: calc( 100% - 80px);
      height: calc( 100vh - 202px);
      padding: 20px 40px;
      overflow-y: hidden;
    }
    &__list {
      display: inline-block;
      width: 100%;
      // margin: 20px 30px;
      @include media-min-width(desktop) {
        width: 50%;
        overflow-y: scroll;
        // margin: 20px 10px 0 0;
        box-sizing: content-box;
        // height: calc( 100vh - 170px);
      }
    }
    &__map {
      display: none;
      @include media-min-width(desktop) {
        position: relative;
        display: block;
        width: 50%;
        height: calc( 100vh - 235px);
        padding: 20px;
      }
    }
  }

}

</style>
