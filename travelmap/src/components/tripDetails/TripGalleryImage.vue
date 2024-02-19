<template v-if="photo" >
	<div class="trip-gallery__photo">
		<img class="trip-gallery__image" :src="photo.sizes.large" :alt="photo.title">
	</div>
</template>
<script>
	export default {
		name:'TripGalleryImage',
		props: {
			photo: Object
		},
	}
</script>
<style lang="scss" scoped>

	.trip-gallery__photo {
		position: relative;
		&:before {
			content: "";
			display: block;
			padding-top: 56.25%;
		}
		@include media-min-width(mobile) {
			display: inline-block;
			width: 50%;
		}
		@include media-min-width(desktop) {
			width: calc( 100% / 3);
		}
	}

	.trip-gallery__image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

</style>
