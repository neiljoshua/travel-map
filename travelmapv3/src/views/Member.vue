<template>
	<div class="Member">
		<h1>This is the Member's page</h1>
	</div>
</template>
<script setup>
  /* eslint-disable */
  import { computed , onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const member = computed(() => store.state.member )
  const isLoggedIn = computed(() => store.state.isLoggedIn )
  const userToken= computed(() => store.state.userToken )
  const userEmail = computed(() => store.state.userEmail )
  const userDisplayName = computed(() => store.state.userDisplayName )

  if(isLoggedIn){
    member: localStorage.getItem('member')
  }
  // const trips = computed(() => store.state.trips )

  // onMounted(()=>{
  //   store.dispatch('member');
  // })
</script>
