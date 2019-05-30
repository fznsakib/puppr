<template lang="pug">
div(class='landing page is-flex')
  div(class='container')
    div(class='columns')
      //- left (text)
        REFACTOR YOUR ROUTES (use the bookmarked link)
        REFACTOR INTO PUG
      div(class='left column is-flex')
        LandingContent

      //- right (box)
      div(class='right column is-flex')
        LoginPanel(
          v-if='displayLoginPanel',
          @togglePanel='displayLoginPanel = !displayLoginPanel'
        )
        RegisterPanel(
          v-else,
          @togglePanel='displayLoginPanel = !displayLoginPanel'
        )
</template>

<script>
import LoginPanel from '@/components/landing/LoginPanel.vue'
import RegisterPanel from '@/components/landing/RegisterPanel.vue'
import LandingContent from '@/components/landing/LandingContent.vue'

export default {
  name: 'Landing',
  components: {
    LoginPanel,
    RegisterPanel,
    LandingContent
  },
  data() {
    return {
      displayLoginPanel: true
    }
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
