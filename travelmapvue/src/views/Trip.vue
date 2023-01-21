<template>
  <main class="trip">
    <TripHero :tripHeroInfo="tripInfo(cityRoute)" ></TripHero>
    <TripInfo :trip="tripInfo(cityRoute)"></TripInfo>
    <div v-if="tripInfo(cityRoute)" class="trip-gallery">
      <TripGalleryImage  v-for="photo in tripInfo(cityRoute).photos" :key="photo.name" :photo="photo"></TripGAlleryImage>
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
      })
    },
    components: {
      TripHero,
      TripInfo,
      TripGalleryImage
    }
  }

</script>
<style lang="scss" scoped>

  .trip {
    display: block;
    color: $black;
    @include media-min-width(tablet) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }

  .router-link-active {
    color: $white;
    padding: 5px 15px;
    border-radius: 5px;
  }

  .trip-gallery {
    border: 4px $yellow solid;
    width: calc( 100% - 8px);
    font-size: 0;
    background: $bluegray;
  }

</style>
