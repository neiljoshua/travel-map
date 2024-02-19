<template>
	<div id='map' class='trips-map'> </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";

/* eslint-disable */
const props = defineProps({
	trips: Object
})

onMounted(() => {

	mapboxgl.accessToken = process.env.VUE_APP_MAP;
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v9",
		center: [-81.4608, 48.4758],
		zoom: 3,
		minZoom: 1
	})

	const trips = props.trips;

	trips.forEach((trip) => {

		const el = document.createElement('div'),
				popup = new mapboxgl.Popup({ offset: 25, className: 'map_popup'}).setHTML("<img src="+trip.image.sizes.thumbnail+" alt="+trip.city+"><h3>"+trip.city+" </h3> <p>"+trip.info+"</p>");

		el.className = 'marker';
		el.setAttribute('marker-name', trip.city);
		el.setAttribute('data-lon', trip.longitude);
		el.setAttribute('data-lat', trip.latitude);

		new mapboxgl.Marker({ color: 'black', rotation: 45 }).setLngLat([parseFloat(trip.latitude), parseFloat(trip.longitude)])
				.setPopup(popup)
				.addTo(map);

	});

	trips.forEach( (trip) => {
		const tripLink = document.getElementById(trip.city)

		tripLink.addEventListener('click', () => {
			map.flyTo({
				center: [parseFloat(trip.latitude), parseFloat(trip.longitude)],
				zoom: 9,
			})
		})

	})

});

</script>

<style lang="scss" scoped>

	.trips-map {
		width: calc(100% - 6px);
		// height: calc( 100vh - 235px );
		border: 3px solid $gray;
		border-radius: 8px;
	}
	.mapboxgl-canvas {
		width: 100%;
	}

</style>
