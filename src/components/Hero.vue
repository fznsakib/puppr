<template functional>
  <section class="hero is-primary is-medium is-clear">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
        </h1>
      </div>
    </div>
    <div class="hero-footer">
      <div class="container">
        <h1 class="hero-brand">
          puppr.
        </h1>
        </div>
      </div>
  </section>
</template>

<script>

export default {
  name: 'hero',
};
</script>

<style scoped>
  .hero {
    height: 70vh;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25), 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  .hero-brand {
    font-size: 10rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    /* margin-top: -10rem; */
  }
</style>
