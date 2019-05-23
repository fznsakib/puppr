<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <NavbarBrand />

      <div
        id="hamburger"
        class="navbar-menu">
        <NavbarStart v-if="isUserSignedIn" />
        <NavbarEnd :isUserSignedIn="isUserSignedIn" />
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarBrand from '@/components/navbar/NavbarBrand.vue'
import NavbarStart from '@/components/navbar/NavbarStart.vue'
import NavbarEnd from '@/components/navbar/NavbarEnd.vue'

export default {
  name: 'Navbar',
  components: {
    NavbarBrand,
    NavbarStart,
    NavbarEnd
  },
  data() {
    return {
      isUserSignedIn: false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
              0 0 0 1px rgba(10, 10, 10, 0.0);
}
</style>
