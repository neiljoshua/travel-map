<template>
	<div
		v-for="trip in trips"
		:key="trip.city"
		:id="trip.city"
		class="trips-item"
	>
		<div class="trips-item__image">
			<img :src="trip.image.sizes.large" :alt="trip.name"/>
		</div>
		<div class="trips-item__caption">
			<h3 class="trips-item__title">{{ trip.name }} </h3>
			<router-link class="trips-item__btn" :to="{ name:'TripDetails', params:{ id: trip.city}}">Explore</router-link>
		</div>
	</div>
</template>

<script setup>
	/* eslint-disable */
	const props = defineProps({
		trips: Array
	})

</script>
<style lang="scss" scoped>

	.trips-item {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 20px;
		padding: 15px;
		border: 2px solid $gray;
		border-radius: 15px;
		color: $bluegray;
		transition: box-shadow 0.2s ease;
		&__title {
			margin-bottom: 20px;
			font-size: 17px;
			font-weight: 600;
			color: $bluegray;
			@include media-min-width(tablet) {
				font-size: 20px;
			}
		}
		&__caption {
			width: 100%;
			margin: auto;
			padding: 15px;
			font-size: 15px;
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
		&__copy {
			font-size: 16px;
			margin-bottom: 20px;
			// @include media-min-width(mobile) {
			//   font-size: 17px;
			// }
			// @include media-min-width(tablet) {
			//   font-size: 18px;
			// }
		}
		&__btn {
			font-size: 14px;
			margin-top: 20px;
			font-weight: 600;
			border-bottom: 1px solid $bluegray;
		}
		&:hover {
			cursor: pointer;
			box-shadow: 0 0 15px $blackshadow;
			transition: box-shadow 0.2s ease;
		}
	}

</style>
