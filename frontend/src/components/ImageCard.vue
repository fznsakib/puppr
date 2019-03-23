<template>
  <div class="imagecard card"
       @mouseover="isHovered=true"
       @mouseleave="isHovered=false">
    <figure class="image is-4by3">
      <img :src="imageUrl" alt="">
    </figure>

    <ImageCardStats :isHovered="isHovered"/>

  </div>
</template>

<script>
import ImageCardStats from '@/components/ImageCardStats.vue';

export default {
  name: 'imagecard',
  components: {
    ImageCardStats
  },
  props: {
    imageUrl: {
      type: String,
      required: true,
      default: 'https://bulma.io/images/placeholders/128x128.png',
    },
  },
  data() {
    return {
      isHovered: false
    }
  },
};
</script>

<style scoped>
.imagecard {
  position: relative;
  margin: 1rem;
  overflow-y: hidden;
}
</style>
