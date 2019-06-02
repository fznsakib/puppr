<template lang="pug">
  div(class="navbar-item")
    div(class="buttons")
      a(class="button is-text" @click="goToRegister") Register
      a(class="button is-text" @click="goToLogin") Login
</template>

<script>
export default {
  name: 'NavbarRightAuth',
  methods: {
    goToRegister() {
      this.$router.push({ path: '/landing' })
    },
    goToLogin() {
      this.$router.push({ path: '/landing' })
    }
  }
}
</script>

<style scoped>
</style>
