<template lang="pug">
  router-link(class="navbar-brand" :to="{ path: '/'} ")
    div(class="navbar-item")
      img(src="https://bulma.io/images/bulma-logo.png", width="112", height="28")

    a(role="button", class="navbar-burger burger", aria-label="menu", aria-expanded="false", data-target="hamburger")
      span(aria-hidden="true")
      span(aria-hidden="true")
      span(aria-hidden="true")
</template>

<script>
export default {
  name: 'NavbarBrand'
}
</script>

<style scoped>
</style>
