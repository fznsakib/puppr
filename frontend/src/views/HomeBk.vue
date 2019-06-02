<template>
  <div class="home page">
    <div class="container">
      <div class="box has-text-centered">
        <form @submit.prevent="submitPost">
          bfile
          <input type="file" class="egg" @change="fileSelected">
          <br>
          <textarea v-model="postToSubmit.caption"
                    type="text" placeholder="caption" />
          <br>
          <input v-model="postToSubmit.username"
                 type="text" placeholder="username">
          <br>
          <input type="submit" value="post">
        </form>
      </div>

      <div class="box">
        <figure class="image is-128x128">
          <img :src="post.imageURL">
        </figure>
        <h4 class="title is-3">
          {{ post.username }}
        </h4>
        <p>
          {{ post.caption }}
        </p>
        <form @submit.prevent="addComment">
          <input v-model="commentToAdd" type="text">
          <input type="submit" value="Add comment">
        </form>

        <div class="box">
          <h2 class="title is-bold">
            Comments
          </h2>
          <div v-for="(c,i) in comments" :key="i">
            <p>
              <a class="has-text-weight-bold">
                {{ c.username }}
              </a> {{ c.body }}
            </p>
            <p>
              {{ commentPosted(c.date) }}
            </p>
          </div>
        </div>
      </div>

      <div class="box has-text-centered">
        <button @click="getPost(1)">
          Get post
        </button>
        <button @click="getComments(1)">
          Get comments
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService'

export default {
  name: 'Home',
  data() {
    return {
      hover: false,
      postToSubmit: {
        image: null,
        username: '',
        caption: ''
      },
      post: {},
      commentToAdd: '',
      comments: []
    }
  },
  methods: {
    submitPost() {
      ApiService.createPost(this.postToSubmit)
        .then(() => console.log(`Post created.`))
        .catch((err) => console.log(`${err}`))
    },
    fileSelected(e) {
      [this.postToSubmit.image] = e.target.files
    },
    getPost(id) {
      ApiService.getPost(id)
        .then(({ data }) => {
          this.post = data
        })
        .catch((err) => console.log(`${err}`))
    },
    getComments(id) {
      ApiService.getComments(id)
        .then(({ data }) => {
          this.comments = data
        })
        .catch((err) => console.log(`${err}`))
    },
    addComment() {
      let id = 1
      ApiService.createComment(id, this.commentToAdd, 'ebxn')
        .then(() => {
          ApiService.getComments(id)
            .then(({ data }) => {
              this.comments = data
            })
            .catch((err) => console.log(`${err}`))
        })
        .catch((err) => console.log(`${err}`))
      this.commentToAdd = ''
    },
    commentPosted(datePosted) {
      let minutes = Math.floor((Date.now() - new Date(datePosted)) / 1000 / 60)
      if (minutes < 60) {
        return minutes > 1 ? `${minutes} minutes ago.` : `${minutes} minute ago.`
      } else if (minutes < 60 * 24) {
        let hours = Math.floor(minutes / 60)
        return hours > 1 ? `${hours} hours ago.` : `${hours} hour ago.`
      } else {
        let days = Math.floor(minutes / 60 / 24)
        return days > 1 ? `${days} days ago.` : `${days} day ago.`
      }
    }
  }
}
</script>

<style scoped>
.page {
  padding-top: 5rem;
  min-height: 100vh;
}
.container {
}
</style>
