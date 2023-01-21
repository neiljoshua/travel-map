<template>
  <div id="app" :class="$route.name">
    <TheNavigation />
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"/>
    </transition>
  </div>
</template>

<script>

  import TheNavigation from '@/components/layout/TheNavigation'

  export default {
    name: 'App',
    data() {
      return {
        prevHeight: 0,
      };
    },
    components: {
      TheNavigation
    }
  }

</script>
