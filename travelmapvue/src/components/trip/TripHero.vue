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
<style lang="scss">

  .trip-hero {
    position: relative;
    border: 4px $yellow solid;
    width: calc( 100% - 8px);
    &:before {
      content: "";
      display: block;
      padding-top: 56.25%;
    }
    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: brightness(0.5);
    }
  }

</style>
