<template>
  <div class="navbar-end">
    <div v-if="!isUserSignedIn" class="navbar-item">
      <div class="buttons">
        <a class="button is-text">
          Sign up
        </a>
        <a class="button is-text">
          Log in
        </a>
      </div>
    </div>

    <NavbarAvatar v-else />
  </div>
</template>

<script>
import NavbarAvatar from '@/components/navbar/NavbarAvatar.vue'

export default {
  name: 'NavbarEnd',
  components: {
    NavbarAvatar
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
