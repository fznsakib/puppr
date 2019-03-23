<template>
  <div class="profile">
    <div class="container">
      <div class="columns">

        <!-- Profile Card -->
        <div class="column is-3">
          <ProfileCard :user="user"/>
        </div>

        <!-- Profile Uploads -->
        <div class="column is-9">
          <ProfileGallery :user="user"/>
        </div>

      </div><!-- columns -->
    </div><!-- container -->
  </div><!-- profile -->
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileCard from '@/components/ProfileCard.vue';
import ProfileGallery from '@/components/ProfileGallery.vue';

export default {
  name: 'profile',
  components: {
    ProfileCard,
    ProfileGallery,
  },
  computed: {
    ...mapGetters({
      user: 'account/getUser',
    }),
  },
};
</script>

<style scoped>
.profile {
  background-color: #ECF0F3;
  padding-top: 2rem;
  min-height: 100vh;
}
</style>
