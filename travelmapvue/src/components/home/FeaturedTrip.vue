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
<style lang="scss">
  .featured-trip__container {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translatex(-50%);
    z-index: 2;
    @include media-min-width(tablet) {
      top: 10px;
    }
  }

  .featured-trip {
    display: inline-block;
    position: relative;
    text-align: center;
    color: $darkgray;
    margin: 20px;
    &__image {
      border-radius: 50%;
      transition: box-shadow .3s;
      border: 4px $yellow solid;
      height: 35px;
      width: 35px;
      @include media-min-width(mobile) {
        height: 45px;
        width: 45px;
      }
      @include media-min-width(tablet) {
        height: 60px;
        width: 60px;
      }
      &:hover {
        box-shadow: 0 0 11px $blackshadow;
      }
    }
    &__title {
      text-decoration: none;
      font-size: 15px;
      @include media-min-width(mobile) {
        font-size: 17px;
      }
      @include media-min-width(tablet) {
        font-size: 20px;
      }
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: #000;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out;
      }
    }
    &:hover {
      .trip__title {
        &::before {
          visibility: visible;
          transform: scaleX(1);
        }
      }
    }
  }

</style>
