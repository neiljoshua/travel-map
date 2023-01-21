<template>
  <aside v-bind:class="{ visible: classValue }" class="aside">

    <select
      id="city-select"
      v-model="selected"
      @change="selectedCity = '' ">
      <option disabled value="">Countries</option>
      <option v-for="country in countriesList" :key="country" v-bind:value="country">
        {{ country }}
      </option>
    </select>

    <select v-if="selected.length<1" v-model="selectedCity">
      <option disabled value="">Cities</option>
    </select>

    <select id="city-select" v-else v-model="selectedCity">
      <option disabled value="">Cities</option>
      <option v-for="city in cities(selected).cities" :key="city.city" v-bind:value="city.city">
        {{ city.city}}
      </option>
    </select>

  </aside>
</template>

<script>
  import { mapGetters } from 'vuex'

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
    }
  }
</script>
<style lang="scss" scoped>

  .aside {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0;
    color: $bluegray;
    background-color: $lightgray;
    border-left: 2px solid $yellow;
    transition: width .6s ease-in-out .1s;
    z-index: 1;
    justify-content: center;
    &.visible {
      transition: width .4s ease-in;
      width: 300px;
    }
  }

</style>
