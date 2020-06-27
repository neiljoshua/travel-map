<template v-if="photo">
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
