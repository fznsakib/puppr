<template>
  <div class="home">
    <Navbar />
    <Hero />
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue';
import Hero from '@/components/Hero.vue';


export default {
  name: 'home',
  components: {
    Navbar,
    Hero,
  },
};
</script>


<style scoped>

</style>
