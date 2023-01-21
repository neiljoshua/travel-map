<template>
  <div>
    <div class="member-trips" v-for="trip in memberTrips" :key="trip.city">
        <div class="member-trips__image">
          <img :src="trip.acf.image.sizes.large" :alt="trip.name"/>
        </div>
        <div class="member-trips__caption">
          <h3 class="member-trips__title">{{ trip.acf.name }} </h3>
          <p class="member-trips__copy"> {{trip.acf.city}} {{trip.acf.country}} </p>
          <p> Slug here! {{trip.ID}} </p>
         <!--  <button @click="tripPageLink()" class="member-trips__btn" :trip="trip" > Explore</button> -->
          <!-- <p> {{ trip}}</p> -->
        </div>
    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name:'memberTrips',
    data() {
      return{
        greeting: 'hello'
      }
    },
    props:{
      memberTrips: Array
    },
    computed: {
      ...mapGetters({
        trips: 'trips',
      }),
    },
  }

</script>
<style lang="scss" scoped>
.member-trips {
  width: calc( 100% - 42px);
  padding: 20px;
  margin: 20px;
  border-radius: 15px;
  border: 2px solid $gray;
  @include media-min-width(mobile) {
    width: calc( 50% - 84px);
  }

  &__image {
    position: relative;
    width: 100%;
    min-width: 30%;
    &:before {
      content: '';
      display: block;
      padding-bottom: 56.25%
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      border-radius: 10px;
    }
  }
  &__caption {
    width: calc(100% - 40px);
    padding: 20px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 15px $blackshadow;
    transition: box-shadow 0.2s ease;
  }
}

</style>
