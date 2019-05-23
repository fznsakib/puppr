<template>
  <div class="navbar-end">
    <NavbarAuthButtons v-if="!isUserSignedIn" />
    <NavbarAvatar v-else />
  </div>
</template>

<script>
import NavbarAuthButtons from '@/components/navbar/NavbarAuthButtons.vue'
import NavbarAvatar from '@/components/navbar/NavbarAvatar.vue'
// import { mapGetters } from 'vuex'

export default {
  name: 'NavbarEnd',
  components: {
    NavbarAuthButtons,
    NavbarAvatar
  },
  props: {
    isUserSignedIn: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
