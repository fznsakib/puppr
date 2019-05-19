<template>
  <div class="box is-paddingless">
    <BaseTabs :tabs-data="profileTabs" />
    <div class="columns profilegallery is-gapless is-marginless">
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
    </div>
    <div class="columns profilegallery is-gapless is-marginless">
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
    </div>
    <div class="columns profilegallery is-gapless is-marginless">
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
    </div>
    <div class="columns profilegallery is-gapless is-marginless">
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
    </div>
    <div class="columns profilegallery is-gapless is-marginless">
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
    </div>
    <div class="columns profilegallery is-gapless is-marginless">
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
      <div class="column">
        <ImageCard :image-url="tmpImageLink" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue'
import ImageCard from '@/components/ImageCard.vue'

export default {
  name: 'ProfileGallery',
  components: {
    BaseTabs,
    ImageCard
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tmpImageLink: 'https://picsum.photos/200/300',
      profileTabs: [
        { name: 'Posts', iconClasses: ['fas', 'fa-camera'] },
        { name: 'Favorites', iconClasses: ['fas', 'fa-heart'] }
      ]
    }
  }
}
</script>

<style scoped>
.profilegallery {
  padding: 0 24px;
}
</style>
