<template>

  <aside class="Select-Container">

    <CustomSelect
      v-if="countries"
      v-model="selected"
      id="select-country"
      :default="'Countries'"
      :options="countries"
      class="select"
      @selectedOption='loadCityOptions'
    />

    <CustomSelect
      v-if="cities.length>1"
      v-model="selected"
      id="select-city"
      :default="'Cities'"
      :options="cities"
      class="select"
      @selectedOption="goToLocation"
    />

    <CustomSelect
      v-else
      id="select-city"
      :default="'Cities'"
      :options="['Select a Country']"
      class="select"
    />

  </aside> 
</template>

<script setup>

  /* eslint-disable */
  import CustomSelect from '@/components/layout/CustomSelect.vue'
  import { ref, computed, watch } from 'vue'
  import { useStore } from 'vuex'

  const props = defineProps({
    trips: Array
  })

  const store = useStore()

  const cities = ref([])

  const selected = ref('')
  const countries = computed(() => store.getters.countriesList )

  function loadCityOptions(event) {

    const selectCity = document.getElementById('select-city')
    selectCity.querySelector(".selected").innerHTML ="Cities"

    const contryAndCities = computed( () => store.getters.citiesByCountry(event))

    const citiesList = contryAndCities.value.cities.map(city => city.city)
    cities.value = [ ...citiesList]

    selected.value = event

  }

  function goToLocation(event) {

    const trips = props.trips
    const varMap = store.state.map

    let city = trips.filter( trip => trip.city_list == event ).shift()

    if(city){

      varMap.flyTo({
        center: [parseFloat(city.latitude), parseFloat(city.longitude)],
        essential: true,
        zoom: 7,
      })

    }

  }

</script>


<style lang="scss">
  .Select-Container {
    position: fixed;
    width: 30%;
    top: 0;
    left: 0;
    bottom: 0;
    color: $white;
    z-index: 2;
  }
</style>

