<template>
  <nav class="navbar is-fixed-top-desktop" role="navigation" aria-label="main navigation">
    <div class="container">
    <div class="navbar-brand" v-show="displayBrand">
      <a class="navbar-item has-text-black" href="/">
        puppr.
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-black">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              <strong>Log in</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  </nav>
</template>

<script>
import EventBus from '@/services/EventBusService';

export default {
  name: 'navbar',
  data() {
    return {
      displayBrand: false,
    };
  },
  mounted() {
    EventBus.$on('showNavbarBrand', (brandVisibile) => {
      if (brandVisibile) {
        this.displayBrand = true;
      } else {
        this.displayBrand = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  font-family: "Montserrat", sans-serif;
  height: 60px;

  &-brand .navbar-item {
    font-size: 2rem;
    font-weight: 700;
  }

  &-link:hover &-link.is-active {
    background-color: none !important;
  }
}
</style>
