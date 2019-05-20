<template>
  <div
    class="profilecard card"
    style="border-radius: 10px">
    <div class="card-image">
      <figure class="image is-square">
        <img
          v-if="user.ppUrl"
          class="is-rounded"
          :src="user.ppUrl"
          alt="Placeholder image">
        <img
          v-else
          class="is-rounded"
          src="https://bulma.io/images/placeholders/1280x960.png"
          alt="Placeholder image"
        >
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">
            {{ user.firstname }} {{ user.lastname }}
          </p>
          <p class="subtitle is-6">
            @{{ user.username }}
          </p>
        </div>
      </div>

      <div
        class="file is-centered is-boxed"
        @change="onProfilePictureSelection"
      >
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume"
          >
          <span class="file-cta">
            <div class="file-icon">
              <i class="fas fa-upload" />
            </div>
            <div class="file-label">
              Select image…
            </div>
          </span>
        </label>
      </div>
      <br>
      <a
        class="button is-info"
        style="margin-left: 1rem"
        :disabled="!isProfilePictureSelected"
        @click="onProfilePictureUpload"
      >
        Upload
      </a>

      <div class="content">
        <span
          v-if="!isEditingBio"
          class="bio"
        >
          {{ bio }}
          <br>
          <a
            class="bio-edit"
            @click.prevent="startBioEdit"
          >
            Edit
          </a>
        </span>

        <span
          v-else
          class="bio-edit"
        >
          <textarea
            v-model="bio"
            name=""
            class="textarea"
          />
          <div class="bio-edit__buttons">
            <a
              class="bio-edit__buttons--save"
              @click.prevent="saveBioEdit"
            >
              Save
            </a>
            <a
              class="bio-edit__butons--cancel"
              @click.prevent="cancelBioEdit">
              Cancel
            </a>
          </div>
        </span>
      </div><!-- content -->
    </div><!-- card-content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileCard',
  props: {
    userID: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      bio: 'Description goes here. Apothecary. Really good.',
      oldBio: '',
      isEditingBio: false,
      isProfilePictureSelected: false,
      profilePictureToUpload: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'account/getUser'
    })
  },
  methods: {
    startBioEdit () {
      this.oldBio = this.bio
      this.isEditingBio = true
    },
    saveBioEdit () {
      this.updateBio(this.bio)
      this.isEditingBio = false
    },
    cancelBioEdit () {
      this.isEditingBio = false
    },
    onProfilePictureSelection (event) {
      this.isProfilePictureSelected = true;
      [this.profilePictureToUpload] = event.target.files
    },
    onProfilePictureUpload () {
      this.updateProfilePicture(this.profilePictureToUpload)
      this.isProfilePictureSelected = false
      console.log('Before force')
      this.$forceUpdate()
      console.log('After force')
    },
    ...mapActions({
      updateProfilePicture: 'account/updateProfilePicture',
      updateBio: 'account/updateBio'
    })
  }
}
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
