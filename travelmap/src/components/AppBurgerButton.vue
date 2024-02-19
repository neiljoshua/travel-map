<template>
	<div class="burger-icon" :class="navClass" type="button" @click="toggleNav">
		<div></div>
	</div>
</template>
<script setup>
	import { ref,watch } from 'vue'
	import { useRoute } from 'vue-router'

	const navClass = ref('nav_close')
	const route = useRoute()

	const toggleNav = ()=> {
    navClass.value = navClass.value ==='nav_close' ? 'nav_open' : 'nav_close'
  }

  watch(route, () =>{
		navClass.value = 'nav_close'
	})

</script>
<style lang="scss" scoped>
.burger-icon {
	position: fixed;
	top: 20px;
	right: 0;
	transform: translate(-50%, -50%);
	margin: 20px;
	width: 40px;
	z-index: 200;
	&:before,
	&:after,
	div {
		background: $bluegray;
		content: "";
		display: block;
		height: 4px;
		border-radius: 4px;
		margin: 7px 0;
		transition: 0.5s;
	}
	&.nav_open {
		&:before {
			transform: translateY(12px) rotate(135deg);
		}
		&:after {
			transform: translateY(-12px) rotate(-135deg);
		}
		div {
			transform: scale(0);
		}
	}
}

// .burger-icon:before,
// .burger-icon:after,
// .burger-icon div {
// 	background: $bluegray;
// 	content: "";
// 	display: block;
// 	height: 4px;
// 	border-radius: 4px;
// 	margin: 7px 0;
// 	transition: 0.5s;
// }
// .burger-icon:hover:before {
// 	transform: translateY(12px) rotate(135deg);
// }
// .burger-icon:hover:after {
// 	transform: translateY(-12px) rotate(-135deg);
// }
// .burger-icon:hover div {
// 	transform: scale(0);
// }


</style>
