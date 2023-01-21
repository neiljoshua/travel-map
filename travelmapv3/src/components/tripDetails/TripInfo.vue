<template >
	<div v-if="trip" class="trip-info">
		<div class="trip-info__copy">
			<h1 class="trip-info__city"> {{ trip.city}}  </h1>
			<h2 class="trip-info__country"> {{ trip.country }} <span class="trip-info__date"> - Visited on {{ trip.date}} </span> </h2>
			<p class="trip-info__description"> {{ trip.description }} </p>
		</div>
		<div class="trip-info__map">
			<img v-if="mapImage" :src="mapImage" :alt="trip.city" >
		</div>
	</div>
</template>
<script setup>
	/* eslint-disable */
  import { computed } from 'vue'

  const props = defineProps({
    trip: Object
  })

  const mapImage = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'+props.trip.latitude+','+props.trip.longitude+',11,0,0/900x600?access_token='+process.env.VUE_APP_MAP

</script>
<style lang="scss" scoped>

	.trip-info {
		padding: 20px;
		width: calc( 100% - 40px);
		text-align: left;
		font-size: 0;
		@include media-min-width(mobile) {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 30px;
			width: calc( 100% - 60px);
		}
		@include media-min-width(tablet) {
			padding: 60px 40px;
			width: calc( 100% - 80px);
		}
		&__city {
			font-size: 30px;
			width: 100%;
			color: $bluegray;
			@include media-min-width(mobile) {
				font-size: 38px;
			}
			@include media-min-width(tablet) {
				font-size: 40px;
			}
			@include media-min-width(desktop) {
				font-size: 55px;
			}
		}
		&__country {
			width: 100%;
			font-size: 13px;
			color: $darkgray;
			@include media-min-width(mobile) {
				font-size: 14px;
			}
			@include media-min-width(tablet) {
				font-size: 15px;
			}
			@include media-min-width(desktop) {
				font-size: 16px;
			}
		}
		&__description {
			padding: 20px 0;
			letter-spacing: 2;
			line-height: 1.5;
			font-size: 14px;
			@include media-min-width(mobile) {
				font-size: 16px;
			}
			@include media-min-width(tablet) {
				font-size: 17px;
			}
			@include media-min-width(desktop) {
				font-size: 19px;
			}
		}
		&__date {
			font-size: 10px;
			@include media-min-width(mobile) {
				font-size: 11px;
			}
			@include media-min-width(tablet) {
				font-size: 12px;
			}
			@include media-min-width(desktop) {
				font-size: 13px;
			}
		}
		&__map {
			width: 100%;
			@include media-min-width(mobile) {
				display: inline-block;
				width: 45%;
				margin: auto;
			}
			img {
				width: 100%;
				border: 1px solid $bluegray;
			}
		}
		&__copy {
			width: 100%;
			margin-bottom: 20px;
			@include media-min-width(mobile) {
				display: inline-block;
				width: 45%;
				margin: auto;
			}
		}
	}

</style>
