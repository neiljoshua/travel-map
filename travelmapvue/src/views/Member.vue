<template>
  <div class="member">
    <MemberHeader :member="member"></MemberHeader>
    <MemberTrips  class="member-gallery" :memberTrips="memberTrips(user)"></MemberTrips>
  </div>
</template>
<script >
  import { mapGetters } from 'vuex'
  import MemberHeader from '@/components/member/MemberHeader.vue'
  import MemberTrips from '@/components/member/MemberTrips.vue'
  export default {
    name: 'Member',
    data() {
      return {
        loggedIn: false,
        user: ''
      }
    },
    computed: {
      ...mapGetters({
        member: 'member',
        trips: 'allTrips',
        memberTrips: 'tripsByMember'
      }),
    },
    methods: {
      signOut() {
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
        this. user = this.member.user_id
      }
    },
    mounted() {
      console.log('member in mounted',this.member)
      if(this.member) {
        this.loggedIn = true
      }
    },
    components: {
      MemberHeader,
      MemberTrips
    }
  }

</script>
<style lang="scss" scoped>
 .member {
   padding: 20px;
   @include media-min-width(tablet) {
     padding: 40px;
   }
 }
 .member-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
 }

</style>
