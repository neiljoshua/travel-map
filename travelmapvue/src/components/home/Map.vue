<template>
  <transition name="fade">
    <div id='map' class='map'> </div>
  </transition>
</template>

<script>

export default {
  name: 'Map',
  mounted() {

    mapboxgl.accessToken = process.env.VUE_APP_MAP
    var map = new window.mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
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
                // $coordinates = [parseFloat(x.latitude), parseFloat(x.longitude)];
                //  $city = x.city;
                //  $center = $cooridantes ? $coordinates : $city + x.country;
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
