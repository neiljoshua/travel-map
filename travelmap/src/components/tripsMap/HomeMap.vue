<template>
	<div id="map"/>
</template>
<script setup>
import { useStore } from 'vuex'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";

/* eslint-disable */
const store = useStore()
const props = defineProps({
	trips: Array
})

onMounted(() => {

	const trips = props.trips

	mapboxgl.accessToken = process.env.VUE_APP_MAP;
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v9",
		center: [-81.4608, 48.4758],
		zoom: 3,
		minZoom: 3
	})

  store.commit('SET_MAP', map)

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

});

</script>

<style lang="scss">

	#map {
		// position: absolute;
		// top: 1;
		// bottom: 1;
		// width: calc(100vw - 2px);
		height: calc(100vh - 2px);
	}

	.mapboxgl-popup {
		max-width: 200px;
	}

	.mapboxgl-popup-content {
		border: 2px solid $yellow;
		color: $bluegray;
		font-weight: 600;
		border-radius: 10px;
		box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
		img {
			width: 160px;
			height: 90px;
		}
		h3 {
			font-size: 16px;
			margin-bottom: 5px;
		}
		p {
			color: $darkgray;
			font-size: 12px;
			line-height: 1.2;
		}
	}

	.mapboxgl-popup-close-button {
		right: 10px;
		top: 5px;
		background: white;
		font-size: 15px;
		font-weight: 600;
	}

</style>
