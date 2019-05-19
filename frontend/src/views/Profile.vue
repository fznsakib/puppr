<template>
  <div class="profile page">
    <div class="container">
      <div class="columns">
        <!-- Profile Card -->
        <div class="column is-3">
          <ProfileCard :user="user" />
        </div>

        <!-- Profile Uploads -->
        <div class="column is-9">
          <ProfileGallery :user="user" />
        </div>
      </div><!-- columns -->
    </div><!-- container -->
  </div><!-- profile -->
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileGallery from '@/components/ProfileGallery.vue'

export default {
  name: 'Profile',
  components: {
    ProfileCard,
    ProfileGallery
  },
  computed: {
    ...mapGetters({
      user: 'account/getUser'
    })
  }
}
</script>

<style scoped>
.page {
  background-color: #FAFAFA;
  min-height: 100vh;
  margin-top: 3.25rem;
}

.profile {
  padding-top: 2rem;
}
</style>
