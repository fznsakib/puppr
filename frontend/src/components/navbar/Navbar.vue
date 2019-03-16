<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img class="image is-48x48"
               :src="image"
               width="112"
               height="28">
        </a>

        <a role="button" class="navbar-burger burger"
        aria-label="menu" aria-expanded="false" data-target="navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a v-if="!isLoggedIn" class="button is-black" v-on:click="register()">
                <strong>Sign up</strong>
              </a>
              <a v-if="!isLoggedIn" class="button is-light" v-on:click="login()">
                Log in
              </a>
              <a v-if="isLoggedIn" class="button is-light" v-on:click="logout()">
                Log out
              </a>
              <a v-if="isLoggedIn" class="button is-primary" v-on:click="profile()">
                Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import brand from '@/assets/logo.png';
import router from '../../router';

export default {
  name: '',
  data() {
    return {
      image: brand,
    };
  },
  methods: {
    login() {
      router.push({ name: 'login' });
    },
    register() {
      router.push({ name: 'register' });
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/');
        });
    },
    profile() {
      router.push({ name: 'profile' });
    },
  },
  computed: {
    isLoggedIn() { return this.$store.getters.isLoggedIn; },
  },
};
</script>

<style scoped>

</style>
