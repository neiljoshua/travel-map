<template>
  <main class="trip">
    <TripHero :tripHeroInfo="tripInfo(cityName)" ></TripHero>
    <TripInfo :trip="tripInfo(cityName)"></TripInfo>
    <div v-if="tripInfo(cityName)" class="trip-gallery" >
      <TripGalleryImage  v-for="photo in tripInfo(cityName).photos" :key="photo.name" :photo="photo"></TripGAlleryImage>
    </div>
  </main>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters } from 'vuex'
  import TripHero from '@/components/trip/TripHero.vue'
  import TripInfo from '@/components/trip/TripInfo.vue'
  import TripGalleryImage from '@/components/trip/TripGalleryImage.vue'

  export default {
    name: 'Trip',
    data() {
      return {
        cityRoute: this.$route.params.city
      }
    },
    computed: {
      ...mapGetters({
        tripInfo: 'trip'
      }),
      cityName: function() {
        return this.cityRoute.replace('-',' ');
      }
    },
    components: {
      TripHero,
      TripInfo,
      TripGalleryImage
    }
  }

</script>
