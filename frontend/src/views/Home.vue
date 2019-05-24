<template>
  <div class="home page">
    <h1>Create Post</h1>
    <form @submit.prevent="submitPost">
      <div class="file has-name is-boxed is-centered">
        <label class="file-label">
          <input class="file-input" type="file" name="resume"
                 @change="updateSelectedFile">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{ imageName }}
          </span>
        </label>
      </div>

      <div class="field is-flex">
        <div class="control">
          <textarea v-model="caption" class="textarea" />
        </div>
      </div>

      <div class="field is-flex">
        <div class="control">
          <input v-model="username" type="text" class="input">
        </div>
      </div>

      <div class="field is-flex">
        <div class="control">
          <button type="submit" class="button is-link">
            Send
          </button>
        </div>
      </div>
    </form>

    <figure class="image is-128x128">
      <img :src="imageAsUrl" alt="">
    </figure>

    <button class="button" @click="getPost">
      Get that shit.
    </button>
    <div class="test">
      <figure class="image is-128x128">
        <img :src="post.imageUrl">
      </figure>
      <h2>{{ post.username }}</h2>
      <p>{{ post.caption }}</p>
    </div>

    <button class="button" @click="getAllPosts">
      Get ALL that shit.
    </button>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService'

export default {
  name: 'Home',
  data() {
    return {
      image: null,
      imageAsUrl: null,
      caption: '',
      username: '',
      post: {}
    }
  },
  computed: {
    imageName() {
      return this.image ? this.image.name : ''
    }
  },
  methods: {
    updateSelectedFile(event) {
      [this.image] = event.target.files
      let imgReader = new FileReader()
      imgReader.onload = (e) => {
        this.imageAsUrl = e.target.result
      }
      imgReader.readAsDataURL(this.image)
    },
    submitPost() {
      const { image, caption, username } = this
      ApiService.postsCreate({ image, caption, username })
        .then(() => {
          console.log('Post created')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getPost() {
      ApiService.postsShow(1)
        .then((res) => {
          this.post = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAllPosts() {
      ApiService.postsIndex()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.field {
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
}

.control {
  width: 500px;
}
</style>
