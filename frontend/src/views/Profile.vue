<template>
  <div class="profile">
    <div class="container">
      <div class="columns">

        <!-- Profile Card -->
        <div class="column is-3">
          <ProfileCard :user="user"/>
          <div class="card" style="border-radius: 10px">
            <div class="card-image">
              <figure class="image is-square">
                <img class="is-rounded" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="file is-centered" style="padding-top: 1rem; margin: 0 auto;" @change="onProfilePictureSelected">
              <label class="file-label">
                <input class="file-input" type="file" name="resume">
                <span class="file-cta">
                  <span class="file-label">
                    Choose a picture
                  </span>
                </span>
              </label>
              <a v-if="selectedProfilePicture == null" class="button is-primary" style="margin-left: 1rem;" disabled>Upload</a>
              <a v-else @click="onProfilePictureUpload" class="button is-primary" style="margin-left: 1rem;">Upload</a>


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
        <div class="column is-9">
          <ProfileGallery :user="user"/>
        </div>

      </div><!-- columns -->
    </div><!-- container -->
  </div><!-- profile -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileCard from '@/components/ProfileCard.vue';
import ProfileGallery from '@/components/ProfileGallery.vue';
import ApiService from '@/services/ApiService';
import axios from 'axios';

export default {
  name: 'profile',
  components: {
    ProfileCard,
    ProfileGallery,
  },
  data() {
    return {
      selectedProfilePicture: null,
      fd: null,
    };
  },
  methods: {
    onProfilePictureSelected(event) {
      // Get image file
      this.selectedProfilePicture = event.target.files[0];
      console.log(this.selectedProfilePicture);
    },
    onProfilePictureUpload() {
      this.uploadProfilePicture(this.selectedProfilePicture);
    },
    ...mapActions({
      uploadProfilePicture: 'account/uploadPictureToUser',
    }),
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
