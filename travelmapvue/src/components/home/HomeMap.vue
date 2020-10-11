<template>
  <transition name="fade">
    <div id='map' class='map'> </div>
  </transition>
</template>

<script>

  import mapboxgl from 'mapbox-gl';

  export default {
    name: 'HomeMap',
    data() {
      return {
        accessToken: process.env.VUE_APP_MAP,
      };
    },
    mounted() {
      mapboxgl.accessToken = this.accessToken;

      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [-81.4608, 48.4758],
          zoom: 3,
          minZoom: 2
      });

      map.on('load', (() => {
          this.trips.forEach((trip) => {

              var el = document.createElement('div'),
                  popup = new mapboxgl.Popup({ offset: 25, className: 'map_popup'}).setHTML("<img src="+trip.image.sizes.thumbnail+" alt="+trip.city+"><h3>"+trip.city+" </h3> <p>"+trip.info+"</p>");
              el.className = 'marker';

              new window.mapboxgl.Marker(el)
                  .setLngLat([parseFloat(trip.latitude), parseFloat(trip.longitude)])
                  .setPopup(popup)
                  .addTo(map);
          });

          this.feautureTrips.forEach((feautureTrip) =>{
            document.getElementById(feautureTrip.city)
              .addEventListener('click', () => {
                map.flyTo({
                    center: [parseFloat(feautureTrip.latitude), parseFloat(feautureTrip.longitude)],
                    zoom: 5,
                });
            })
          });

      }).bind(this));

    },
    props: {
     trips: Array,
     feautureTrips: Array
    }
  }
</script>
