<template lang="pug">
  div(v-if="isUserSignedIn", class="navbar-start")
    router-link(class="navbar-item" :to="{ path: '/'} ") Home
    a(class="navbar-item", @click="$emit('showUploadModal')") Upload
</template>

<!-- <router-link :to="{ path: 'relative/path'}" append></router-link> -->

<script>
export default {
  name: 'NavbarStart',
  props: {
    isUserSignedIn: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
