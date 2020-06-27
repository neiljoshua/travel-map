<template>
  <div>
    <ul v-bind:class="{ visible: classValue }" class="aside__list">
      <li class="aside__item">
        Continent
      </li>
      <li class="aside__item">
        Country
      </li>
      <li class="aside__item">
        City
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Aside',
    props:{
      classValue: Boolean
    }
  }
</script>
