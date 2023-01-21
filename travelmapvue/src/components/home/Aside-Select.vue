<template>
  <div v-bind:class="{ visible: classValue }" class="aside">

    <CustomSelect
      v-if="countriesList"
      v-model="selected"
      id="select-country"
      :options="countriesList"
      :default="'Countries'"
      class="select"
      @change='loadCityOptions'
    />

    <CustomSelect
      v-if="loadCityOptions.length>1"
      id="select-city"
      :options="loadCityOptions"
      :default="'Cities'"
      class="select"
      v-model="selectedCity"
    />

    <CustomSelect
      v-else
      id="select-city"
      :options="['Select a Country']"
      :default="'Cities'"
      class="select"
    />

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CustomSelect from '@/components/layout/CustomSelect';


  export default {
    name: 'Aside',
    data() {
      return {
        selected: '',
        selectedCity: ''
      }
    },
    props: {
      countriesList: {
        type: Array,
        required: true,
      },
      classValue: Boolean
    },
    computed: {
      ...mapGetters({
        cities: 'citiesSelectList'
      }),
      loadCityOptions() {
        var cityOptions = [];
        if(this.cities(this.selected)) {
          cityOptions = this.cities(this.selected);
          return  cityOptions.cities.map(city => city.city);
        } else {
          return  cityOptions = [];
        }
      }
    },
    mounted() {
      this.$store.dispatch('loadCountries')
    },
    components: {
      CustomSelect,
    }
  }
</script>
