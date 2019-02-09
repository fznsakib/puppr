<template>
  <div
    class="hero-brand has-text-black"
    :class="{ 'is-invisible': hidden }"
    :style="{ fontSize: fontSize }"
    ref="heroBrand"
  >
    puppr.
  </div>
</template>

<script>
import EventBus from '@/services/EventBusService';

export default {
  name: 'hero-brand',
  data() {
    return {
      fontSize: '',
    };
  },
  computed: {
    offsetFromTop() {
      return this.$refs.heroBrand.offsetTop;
    },
    hidden() {
      return this.fontSize === '2rem';
    },
  },
  methods: {
    updateFontSize() {
      const screenTop = window.scrollY;

      // only update if on screen
      if (screenTop <= this.offsetFromTop) {
        const dif = this.offsetFromTop - screenTop;

        this.fontSize = `${2 + (dif / this.offsetFromTop) * 3}rem`;
        EventBus.$emit('showNavbarBrand', false);
      } else {
        this.fontSize = '2rem';
        EventBus.$emit('showNavbarBrand', true);
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.updateFontSize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateFontSize);
  },
};
</script>

<style lang="scss" scoped>
.hero-brand {
  font-family: "Montserrat", sans-serif;
  font-size: 5rem;
  font-weight: bold;
  padding: 0;
  display: inline-block;
  transition: 0.01s;
  z-index: 50;
  // margin: 2rem;
}
</style>
