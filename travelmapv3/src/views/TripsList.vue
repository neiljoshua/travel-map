<template>
  <div class="trips">
    <h1>Trips around the world</h1>
    <main class="trips-info">
      <div class="trips-info__list">
        <TripsItem :trips="trips"/>
      </div>
      <TripsMap :trips="trips"/>
    </main>

  </div>
</template>

<script setup>
  /* eslint-disable */
  import TripsItem from '@/components/tripsList/TripsItem.vue'
  import TripsMap from '@/components/tripsList/TripsMap.vue'
  import { computed , onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const trips = computed(() => store.getters.trips )
  // const trips = computed(() => store.getters.tripsTest )

  onMounted(()=>{
    store.dispatch('fetchTrips');
  })
</script>

<style lang="scss" scoped>

  .trips {
  width: 100vw;
  h1 {
    font-size: 22px;
    padding: 80px 0 40px;
  }

  .trips-info {
    display:flex;
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
