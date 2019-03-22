<template>
  <div class="home">
    <Hero />
    <Searchbar />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Searchbar from '@/components/Searchbar.vue';

export default {
  name: 'home',
  components: {
    Hero,
    Searchbar,
  },
};
</script>


<style scoped>

</style>
