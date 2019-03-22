<template>
  <div>
    <h1>Congrats, you can only make it here if you are Marc Tannous!</h1>
    <a class="button is-black" @click="home">
      Back
    </a>
  </div>
</template>

<script>

export default {
  name: 'profile',
  methods: {
    home() {
      this.$router.push({ name: 'home' });
    },
  },
};

</script>

<style scoped>

</style>
