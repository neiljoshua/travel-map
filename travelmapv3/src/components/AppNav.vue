<template>
	<div id="nav" >
		<router-link :to="{ name: 'TripsMap'}">Home</router-link>
		<router-link :to="{ name: 'TripsList'}">Trips</router-link>
		<router-link :to="{ name: 'About'}">About</router-link>
		<router-link v-if="!member" :to="{ name: 'Login'}">Sign In</router-link>
    <router-link v-if="member" :to="{ name:'member'}"> {{member.user_display_name}}</router-link>
	</div>
</template>
<script setup>
  /* eslint-disable */
  // @ is an alias to /src

  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const member= computed(() => store.state.member)

</script>
<style lang="scss" scoped>
#nav {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 10;
	background: $yellow;
	width: 0;
	transition: width 1s, opacity .5s;
	opacity: 0;
	&.nav_open{
		opacity: 1;
		width: 200px;
		transition: width 1s, opacity .6s;
	}
	a {
		font-weight: bold;
		color: $blackshadow;
		padding: 10px;

		&.router-link-exact-active {
			color: $bluegray;
		}
	}
}
.nav-button {
	position: absolute;
	top: 20px;
	right: 20px;
}
</style>
