<template v-if="tripHeroInfo">
  <div class="trip-hero">
    <img class="trip-hero__image" :src="tripHeroInfo.image.sizes.extralarge" :alt="tripHeroInfo.name">
  </div>
</template>
<script>
   export default {
    name:'TripHero',
    props: {
      tripHeroInfo: Object
    },
  }
</script>
