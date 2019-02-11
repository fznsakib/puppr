<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
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
              <a class="button is-black">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
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

export default {
  name: '',
  data() {
    return {
      image: brand,
    };
  },
};
</script>

<style scoped>

</style>
