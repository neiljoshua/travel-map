<template>
  <div class="home">
    <!-- button to open menu aside -->
    <!-- aside component -->
    <OptionsMap :trips="trips"/>
    <HomeMap
      v-if="trips"
      :trips="trips">
    </HomeMap>
  </div>
</template>

<script setup>
  import HomeMap from '@/components/tripsMap/HomeMap.vue'
  import OptionsMap from '@/components/tripsMap/OptionsMap.vue'
  import { computed , onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const trips = computed(() => store.getters.trips)

  onMounted(()=>{
    store.dispatch('fetchTrips');
    store.dispatch('loadCountries');
  })

</script>

<style lang="scss">
  .home {
    width: calc(100% - 2px);
    height: calc(100vh - 2px);
    border: $yellow 2px solid;

    .trip-container {
      display: flex;
      justify-content: center;
    }
  }
</style>
