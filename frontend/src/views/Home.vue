<template>
  <div class="home">
    <Navbar />
    <Hero />
    <Searchbar />
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue';
import Hero from '@/components/Hero.vue';
import Searchbar from '@/components/Searchbar.vue';


export default {
  name: 'home',
  components: {
    Navbar,
    Hero,
    Searchbar,
  },
};
</script>


<style scoped>

</style>
