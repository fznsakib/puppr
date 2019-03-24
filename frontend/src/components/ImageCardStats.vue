<template>
  <div class="image-card-stats is-flex"
         :class="{ 'move-up': isHovered }">
    <!-- <div class="statscontent"> -->
      <div class="image-card-stats-item">
        <span class="icon is-small">
          <i class="fas fa-arrow-up"></i>
        </span>
        <span> 69</span>
      </div>

      <div class="image-card-stats-item">
        <span class="icon is-small">
          <i class="fas fa-comment"></i>
        </span>
        <span> 69</span>
      </div>

      <div class="image-card-stats-item" @click="favorited = !favorited">
        <span class="icon is-small">
          <i :class="favoritedIcon"
             :style="favorited ? 'color: red' : ''"></i>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'imagecardstats',
  props: {
    isHovered: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      numLikes: 10,
      numComments: 20,
      favorited: false,
    }
  },
  computed: {
    favoritedIcon() {
      return (this.favorited ? 'fas fa-heart' : 'far fa-heart');
    }
  }
};
</script>

<style lang="scss" scoped>
.image-card-stats {
  width: 100%;
  position: absolute;
  bottom: -3rem;
  justify-content: space-around;
  transition: all 0.25s ease-in-out;

  &-item {
    font-size: 1.3rem;
  }
}
.move-up {
  bottom: 0.5rem;
}
</style>
