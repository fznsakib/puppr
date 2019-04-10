<template>
  <div class="profilecard card" style="border-radius: 10px">
    <div class="card-image">
      <figure class="image is-square">
        <img class="is-rounded" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ user.firstname }} {{ user.lastname }}</p>
          <p class="subtitle is-6">@{{ user.username }}</p>
        </div>
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
      <div class="content">
        <span class="bio" v-if="!isEditingBio">
          {{ bio }}
          <br>
          <a class="bio-edit" @click.prevent="startBioEdit">Edit</a>
        </span>

        <span class="bio-edit" v-else>
          <textarea name="" class="textarea" v-model="bio"></textarea>
          <div class="bio-edit__buttons">
            <a class="bio-edit__buttons--save" @click.prevent="saveBioEdit">Save</a>
            <a class="bio-edit__butons--cancel" @click.prevent="cancelBioEdit">Cancel</a>
          </div>
        </span>

        </div>
      </div><!-- content -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ApiService from '@/services/ApiService';
import axios from 'axios';

export default {
  name: "profilecard",
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      bio: 'Description goes here. Apothecary. Really good.',
      oldBio: '',
      isEditingBio: false,
      selectedProfilePicture: null,
    }
  },
  methods: {
    startBioEdit() {
      this.oldBio = this.bio;
      this.isEditingBio = true;
    },
    saveBioEdit() {
      this.isEditingBio = false;
    },
    cancelBioEdit() {
      this.bio = this.oldBio;
      this.isEditingBio = false;
    },
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
      userData: 'account/getUser',
    }),
  },
};
</script>

<style lang="scss" scoped>
.card-image {
  padding: 1rem;
}
.bio-edit {
  & textarea {
    min-height: 70px !important;
  }

  &__buttons {
    &--save {
      margin-right: 0.3rem;
    }
  }
}
</style>
