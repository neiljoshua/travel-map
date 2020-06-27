<template>
	<div class="featured-trip" :id="city">
		<img class="featured-trip__image" :src="image" :alt="city"/>
		<h3 class="featured-trip__title">{{ city }}</h3>
	</div>
</template>

<script>
	export default {
		name: 'FeaturedTrip',
		props: {
      image: String,
      city: String
		}
	}
</script>
