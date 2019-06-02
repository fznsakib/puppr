<template lang="pug">
  nav(class="navbar is-fixed-top", role="navigation", aria-label="main navigation")
    div(class="container")
      //- TODO: Give NavBrand a href
      NavbarBrand

      div(id="hamburger", class="navbar-menu")
        NavbarLeft(:is-user-signed-in="isLoggedIn")
        NavbarRight(:is-user-signed-in="isLoggedIn")
</template>

<script>
import NavbarBrand from '@/components/navbar/NavbarBrand.vue'
import NavbarLeft from '@/components/navbar/NavbarLeft.vue'
import NavbarRight from '@/components/navbar/NavbarRight.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    NavbarBrand,
    NavbarLeft,
    NavbarRight
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
