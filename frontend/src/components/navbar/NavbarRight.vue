<template lang="pug">
  div(class="navbar-end")
    NavbarRightAuth(v-if="!isUserSignedIn")
    NavbarRightAvatar(v-else)
</template>

<script>
import NavbarRightAvatar from '@/components/navbar/NavbarRightAvatar.vue'
import NavbarRightAuth from '@/components/navbar/NavbarRightAuth.vue'

export default {
  name: 'NavbarEnd',
  components: {
    NavbarRightAvatar,
    NavbarRightAuth
  },
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
