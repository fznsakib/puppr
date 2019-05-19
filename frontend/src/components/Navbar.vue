<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          @click="showHomeView">
          <img
            class="image is-48x48"
            :src="image"
            width="112"
            height="28">
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbar"
        class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button
                v-if="!isLoggedIn"
                class="button is-black"
                @click="showRegisterView">
                <strong>Sign up</strong>
              </button>
              <button
                v-if="!isLoggedIn"
                class="button is-light"
                @click="showLoginView">
                Log in
              </button>
              <button
                v-if="isLoggedIn"
                :disabled="loggingOut"
                class="button is-info"
                @click="showProfileView">
                Profile
              </button>
              <button
                v-if="isLoggedIn"
                class="button is-light"
                :class="{ 'is-loading': loggingOut }"
                @click="logout">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import brand from '@/assets/logo.png'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: '',
  data () {
    return {
      loggingOut: false,
      image: brand
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'account/getLoggedInStatus'
    })
  },
  methods: {
    showHomeView () {
      this.$router.push({ name: 'home' })
    },
    showLoginView () {
      this.$router.push({ name: 'login' })
    },
    showRegisterView () {
      this.$router.push({ name: 'register' })
    },
    showProfileView () {
      this.$router.push({ name: 'profile' })
    },
    logout () {
      this.loggingOut = true
      setTimeout(() => {
        this.logoutUser()
        this.$router.push('/')
        this.loggingOut = false
      }, 500)
    },
    ...mapActions({
      logoutUser: 'account/logout'
    })
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
              0 0 0 1px rgba(10, 10, 10, 0.0);
}
</style>
