<template>
  <div class="trips-item" :id="trip.city">
    <div class="trips-item__image">
      <img :src="trip.image.sizes.large" :alt="trip.name"/>
    </div>
    <div class="trips-item__caption">
      <h3 class="trips-item__title">{{ trip.name }} </h3>
      <p class="trips-item__copy"> {{trip.city}} {{trip.country}} </p>
      <p> Slug here! {{trip.ID}} </p>
      <button @click="tripPageLink()" class="trips-item__btn" :trip="trip" > Explore</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'TripsList',
    props: {
      trip: Object
    },
    methods: {
      tripPageLink() {
        this.trip.city = this.trip.city.replace(" ","-");
        this.$router.push({ path: '/trips/'+this.trip.city, params: { trip: this.trip } });

      }
    }
  }

</script>
