<template>
  <div v-if="isUserSignedIn" class="navbar-start">
    <a class="navbar-item">
      Home
    </a>
    <a class="navbar-item" @click="$emit('showUploadModal')">
      Upload
    </a>
  </div>
</template>

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
