<template>
	<div class="button" v-on="$attrs">
		<slot></slot>
	</div>
</template>
<script setup>

</script>
<style lang="scss">

	.button {
		display: block;
		margin: 20px auto;
		width: 250px;
		height: 75px;
		font-size: 22px;
		background-color: $yellow;
		color: $bluegray;
		border-radius: 10px;
	}

</style>
