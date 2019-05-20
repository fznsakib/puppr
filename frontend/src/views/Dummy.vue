<template>
  <div class="middleBoi page">
    <h1 class="title">
      Dummy
    </h1>

    <form @submit.prevent="createPost">
      <div
        class="file has-name is-boxed"
        @change="onImageSelect">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            exampleFileName.jpg
          </span>
        </label>
      </div>

      <div class="field">
        <label
          for="postComment"
          class="label">Comment</label>

        <div class="control">
          <textarea
            v-model="postCaption"
            name="postCaption"
            class="textarea" />
        </div>
      </div><!-- field -->

      <div class="field">
        <div class="control">
          <button
            type="submit"
            class="button is-link">
            Ligma
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import { mapGetters } from 'vuex'

export default {
  name: 'Dummy',
  data () {
    return {
      postImage: null,
      postCaption: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'account/getUser'
    })
  },
  methods: {
    onImageSelect (event) {
      [this.postImage] = event.target.files
    },

    createPost () {
      ApiService.createPost(this.user.username, this.postImage, this.postCaption)
        .then((res) => {
          console.log('Post created successfully.')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.middleBoi {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
}
</style>
