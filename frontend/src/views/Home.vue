<template lang="pug">
  div(class="home page")
    div(class="container")
      //- post creation
      div(class="box has-text-centered")
        form(@submit.prevent="handlePostSubmit")
          input(type="file" @change="handleFileSelection")
          br
          textarea(v-model="postToSubmit.caption" type="text")
          br
          input(type="submit" value="post")

      //- post get
      div(class="box has-text-centered")
        form(@submit.prevent="handleGetAllSubmit")
          div(v-for="(p, i) in posts", :key="i")
            figure(class="image is-128x128")
              img(:src="p.imageURL")
          input(type="submit" value="getAll")

</template>

<script>
import PostService from '@/services/post.service'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      postToSubmit: {
        imageName: null,
        caption: ''
      },
      posts: {}
    }
  },
  computed: {
    ...mapGetters({
      'user': 'auth/getUser'
    })
  },
  methods: {
    handleFileSelection(e) {
      let [image] = e.target.files
      this.postToSubmit.imageName = image.name
    },
    handlePostSubmit() {
      PostService.create({ username: this.user.username, ...this.postToSubmit })
        .then()
        .catch((err) => console.log(`Error posting: ${err}`))
    },
    handleGetAllSubmit() {
      PostService.getAll()
        .then((apiRes) => {
          this.posts = apiRes.data
        })
        .catch((err) => console.log(`Error getting all: ${err}`))
    }
  }
}
</script>
￼
Home
Upload
a

<style lang="scss" scoped>
.box {
  margin-top: 1rem;
}
</style>
