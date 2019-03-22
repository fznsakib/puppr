<template>
  <div class="profile">
    <div class="container">
      <div class="columns">

        <!-- Profile Card -->
        <div class="column is-3">
          <div class="card" style="border-radius: 10px">
            <div class="card-image">
              <figure class="image is-square">
                <img class="is-rounded" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
<!--                 <div class="media-left">
                  <figure class="image is-48x48">
                    <img class="is-rounded"
                    src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                  </figure>
                </div> -->
                <div class="media-content">
                  <p class="title is-4">{{ userData.firstname }} {{ userData.lastname }}</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Uploads -->
        <div class="column is-8">
          <h1 class="title is-bold">
            Your password is {{ userData.password }}
          </h1>
        </div>

      </div><!-- columns -->
    </div><!-- container -->
  </div><!-- profile -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'profile',
  methods: {
    // home() {
    // this.$router.push({ name: 'home' });
    // },
  },
  computed: {
    ...mapGetters({
      userData: 'account/getUser',
    }),
  },
};

</script>

<style scoped>
.profile {
  margin-top: 2rem;
}

.card-image {
  padding: 1rem;
}
</style>
