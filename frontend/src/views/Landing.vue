<template lang="pug">
  div(class="landing page is-flex")
    div(class="container")
      div(class="columns")
        //- left (text)
        div(class="left column is-flex")
          LandingContent

        //- right (box)
        div(class="right column is-flex")
          LandingPanel
</template>

<script>
import LandingPanel from '@/components/landing/LandingPanel.vue'
import LandingContent from '@/components/landing/LandingContent.vue'

export default {
  name: 'Landing',
  components: {
    LandingPanel,
    LandingContent
  }
}
</script>

<style lang="scss" scoped>
.landing {
  min-height: 100vh;
  height: 100vh;
  align-items: center;
  background-color: #f7f7f7;
}

.column {
  align-items: center;
}

@media screen and (min-width: 769px) {
  &.right { justify-content: flex-start; margin-left: 5rem;}
  &.left { justify-content: flex-end; }
}
</style>
