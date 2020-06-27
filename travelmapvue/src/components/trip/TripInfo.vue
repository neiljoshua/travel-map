<template >
  <div v-if="trip" class="trip-info">
    <div class="trip-info__copy">
      <h2 class="trip-info__city"> {{ trip.city}}  </h2>
      <h3 class="trip-info__country"> {{ trip.country }} <span class="trip-info__date"> - Visited on {{ trip.date}} </span> </h3>
      <p class="trip-info__description"> {{ trip.description }} </p>
    </div>
    <div class="trip-info__map">
      <img v-if="mapImage" :src="mapImage" :alt="trip.city" >
    </div>
  </div>
</template>
<script>
  export default {
    name:'TripInfo',
    props: {
      trip: Object
    },
    data() {
      return {
        staticMapImage: String
      }
    },
    computed: {
      mapImage: function() {
        return 'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'+this.trip.latitude+','+this.trip.longitude+',11,0,0/900x600?access_token='+process.env.VUE_APP_MAP
      }
    },
  }
</script>
