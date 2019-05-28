<template>
  <nav class="navbar is-fixed-top" role="navigation"
       aria-label="main navigation">
    <div class="container">
      <!-- debug test. Please change back to an a with href inside NavbarBrand -->
      <NavbarBrand />

      <div id="hamburger" class="navbar-menu">
        <NavbarStart :is-user-signed-in="isLoggedIn" />
        <NavbarEnd :is-user-signed-in="isLoggedIn" />
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarBrand from '@/components/navbar/NavbarBrand.vue'
import NavbarStart from '@/components/navbar/NavbarStart.vue'
import NavbarEnd from '@/components/navbar/NavbarEnd.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    NavbarBrand,
    NavbarStart,
    NavbarEnd
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/getLoggedInStatus'
    })
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
