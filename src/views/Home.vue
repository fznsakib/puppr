<template>
  <div class="home">
    <Hero />

    <div style="height: 200vh" class="has-text-centered is-size-1 is-light">
      DEBUG DIV
    </div>
  </div>
</template>

<script>
import Hero from '@/components/gallery/Hero.vue';

export default {
  name: 'home',
  components: {
    Hero,
  },
};
</script>

<style scoped></style>
