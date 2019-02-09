<template>
  <section class="hero is-medium is-primary">
    <div class="container">
      <div class="hero-head">
        <Navbar />
      </div>
      <div class="hero-body"></div>
      <div class="hero-foot">
        <HeroBrand />
      </div>
    </div>
  </section>
</template>

<script>
import HeroBrand from '@/components/gallery/HeroBrand.vue';
import Navbar from '@/components/header/Navbar.vue';

export default {
  name: 'hero',
  components: {
    HeroBrand,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.hero .navbar {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
