<template lang="pug">
  div(class="navbar-dropdown is-boxed is-right")
    router-link(class="navbar-item", @click="goToAccount",
      :to="{ path: '/user/' + user.username }")
      i(class="fas fa-user")
      | Account

    router-link(class="navbar-item", :to="{ path: '/settings ' }")
      i(class="fas fa-cog")
      | Settings

    hr(class="navbar-divider")

    a(class="navbar-item" @click="handleLogout")
      i(class="fas fa-arrow-circle-left")
      | Log Out
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavbarRightAvatarMenu',
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  methods: {
    handleLogout() {
      this.logout()
      this.$router.push({ path: '/landing' })
    },

    goToAccount() {
      this.$router.push({ path: `/user/${this.user.username}` })
    },

    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar-item {
  & i {
    text-align: center;
    width: 14px;
    margin-right: 0.5rem;
  }
}

.navbar-divider { margin: 0.5rem 0.3rem; }
</style>
