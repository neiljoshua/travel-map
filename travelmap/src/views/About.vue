<template>
  <div v-if="aboutPage" class="about">
    <div>
      <img :src="aboutPage.hero_image.sizes.extralarge" :alt="aboutPage.hero_image">
    </div>
    <aside>
      <h1> {{ aboutPage.title_page }} </h1>
      <p > {{ aboutPage.content }} </p>
    </aside>
  </div>
</template>
<script setup>
  /* eslint-disable */
  import { computed , onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'

  const store = useStore()
  const route = useRoute()
  const Pages = computed(() => store.getters.pages )
  const aboutPage = computed( () => store.getters.page(route.path+'/'))

  onMounted(()=>{
    store.dispatch('fetchPages');
  })
</script>
<style lang="scss" scoped>
  aside {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc( 1 / 3 * 100% );
    left: 0;
    top: 0;
    bottom: 0;
    padding: 40px;
    z-index: 10;
    opacity: .8;
    background-color: $darkgray;
    h1, p {
      color: $white;
      line-height: 2.5;
      z-index: 20;
    }
    h1{
      font-size: 35px;
    }
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
