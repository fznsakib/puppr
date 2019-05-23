<template>
  <div class="landingcontent">
    <transition name="fade">
      <img
        :src="dogImage"
        :key="dogImage"
        class="doggo"
        alt="A good boy">
    </transition>

    <h1 class="title is-bold is-1 has-text-centered">
      puppr.
    </h1>
  </div>
</template>

<script>
export default {
  name: 'LandingContent',
  data() {
    return {
      currentImageIndex: 0,
      images: [
        require('@/assets/doggo.png'),
        require('@/assets/doggo2.png'),
        require('@/assets/doggo3.png'),
        require('@/assets/doggo4.png')
      ]
    }
  },
  computed: {
    dogImage() {
      return this.images[this.currentImageIndex]
    }
  },
  created() {
    this.updateDogImage()
  },
  methods: {
    updateDogImage() {
      // eslint-disable-next-line
      let imageCycleInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % 4
      }, 1000)
    }
  }
}
</script>

<style scoped>
.landingcontent {
  position: absolute;
}

.doggo {
  position: relative;
  top: 50%;
  left: 50%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
