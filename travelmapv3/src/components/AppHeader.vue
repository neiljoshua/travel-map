<template>
	<div class="app-header">
		<app-burger-button :is-active="isActive" @click="toggleNavClass"/>
		<app-nav :is-active="isActive" :class="[isActive ? 'nav_open' : 'nav_close']" ></app-nav>
	</div>
</template>
<script setup>
import { ref, watch} from 'vue'
import { useRoute } from 'vue-router'

const isActive = ref(false)
const route = useRoute()

const toggleNavClass = ()=> {
	isActive.value = !isActive.value
}
watch(route, () =>{
	isActive.value = false
})

</script>

<style lang="scss" scoped>
	.app-header {
		position: fixed;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		padding: 20px;
		align-items: center;
		z-index: 99;
	}

</style>
