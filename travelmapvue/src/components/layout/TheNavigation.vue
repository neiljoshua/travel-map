<template>
  <nav id="nav">
    <router-link to="/">Map</router-link> |
    <router-link to="/trips"> Trips</router-link> |
    <router-link v-if="!member" to="/login"> Login </router-link>
    <router-link v-if="member" to="/member"> Member</router-link>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'TheNavegation',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        member: 'member'
      }),
    }
  }

</script>

<style lang="scss" scoped>
  nav {
    position: absolute;
    top: 40px;
    left: 40px;
    padding: 10px 15px;
    z-index: 1;
    a {
      font-weight: bold;
      color: $bluegray;
      &.active-link-class {
        background-color: $yellow;
        padding: 10px 15px;
        border-radius: 5px;
      }
    }
  }

</style>
