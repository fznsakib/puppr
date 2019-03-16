<template>
  <div>
    <h1>Congrats, you can only make it here if you are Marc Tannous!</h1>
    <a class="button is-black" v-on:click="home()">
      Back
    </a>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'profile',
  methods: {
    home() {
      router.push({ name: 'home' });
    },
  },
};

</script>

<style scoped>

</style>
