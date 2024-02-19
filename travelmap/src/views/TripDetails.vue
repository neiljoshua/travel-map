<template>

	<main v-if="tripData" class="trip">
		<TripHero :tripHeroInfo="tripData(id).image" ></TripHero>
		<TripInfo :trip="tripData(id)"></TripInfo>
		<div v-if="tripData(id)" class="trip-gallery">
			<TripGalleryImage  v-for="photo in tripData(id).photos" :key="photo.name" :photo="photo"></TripGAlleryImage>
		</div>
	</main>
</template>

<script setup>
	/* eslint-disable */
	// @ is an alias to /src
	import TripHero from '@/components/tripDetails/TripHero.vue'
	import TripInfo from '@/components/tripDetails/TripInfo.vue'
	import TripGalleryImage from '@/components/tripDetails/TripGalleryImage.vue'
	import { useRouter, useRoute } from 'vue-router'
	import { computed } from 'vue'
	import { useStore } from 'vuex'

	const props = defineProps({
		id: {type:String, required: true}
	})

	const route = useRoute()
	const store = useStore()

	const tripData = computed(() => store.getters.trip)

</script>
<style lang="scss" scoped>

	.trip {
		display: block;
		color: $black;
		@include media-min-width(tablet) {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
		}
	}

	.router-link-active {
		color: $white;
		padding: 5px 15px;
		border-radius: 5px;
	}

	.trip-gallery {
		border: 4px $yellow solid;
		width: calc( 100% - 8px);
		font-size: 0;
		background: $bluegray;
	}

</style>
