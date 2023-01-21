<template>
  <div class="member-header">
    <h1>Welcome back </h1>
    <p> {{member.user_display_name}}!</p>
    <button class="member-header__button" @click="signOut"> Sign Out</button>
  </div>
</template>
<script>

  export default {
    name: 'memberHeader',
    data() {
      return {
      }
    },
    props:{
      member: Object
    },
    methods: {
      async signOut() {
        console.log('Deleting member')
        this.$store.commit('deleteMember')
        this.loggedIn = false
        this.$router.push('/login')
      }
    },
    created() {
      console.log('member in created',this.member)
      if(this.member) {
        this.loggedIn = true
      }
    }
  }

</script>

<style lang="scss" scoped>
  .member-header {
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 100px;
    h1,p {
      margin: 20px;
    }
    &__button {
      width: 120px;
      padding: 10px;
      font-size: 20px;
      border-radius: 10px;
      color: $white;
      background-color: $bluegray;
      transition: box-shadow 0.2s ease-out 0.2s;
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 15px $blackshadow;
        transition: box-shadow 0.2s ease;
      }
    }
    @include media-min-width(tablet) {
      flex-direction: row;
    }
  }
  button {
    margin: 20px;
  }
</style>
