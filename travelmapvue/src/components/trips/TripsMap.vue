<template>
  <div id='trips-map' class='trips-map'> </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl'

  export default {
    name: 'TripsMap',
    mounted() {

      mapboxgl.accessToken = process.env.VUE_APP_MAP
      console.log(mapboxgl.accessToken);
      var map = new mapboxgl.Map({
          container: 'trips-map',
          style: 'mapbox://styles/mapbox/light-v9',
          center: [-81.4608, 48.4758],
          zoom: 3,
          minZoom: 2
      });


      map.on('load', (() => {

          this.trips.forEach(function(trip) {
              var el = document.createElement('div');
              el.className = 'marker';
              new window.mapboxgl.Marker(el)
                  .setLngLat([parseFloat(trip.latitude), parseFloat(trip.longitude)])
                  .addTo(map);
          });

          this.trips.forEach((trip) => {
              document.getElementById(trip.city)
                  .addEventListener('click', () => {
                      map.flyTo({
                          center: [parseFloat(trip.latitude), parseFloat(trip.longitude)],
                          zoom: 5,
                      })
                  ;}
              )
          });

      }).bind(this));

    },
    props: {
     trips: Array
    }
  }

</script>
