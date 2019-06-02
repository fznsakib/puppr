<template lang="pug">
  div(class="landingPanel")
    LandingPanelLogin(v-if="panel === 'login'", @togglePanel="toggleLandingPanel('register')")
    LandingPanelRegister(v-if="panel === 'register'", @togglePanel="toggleLandingPanel('login')")
</template>

<script>
import LandingPanelLogin from '@/components/landing/LandingPanelLogin.vue'
import LandingPanelRegister from '@/components/landing/LandingPanelRegister.vue'

export default {
  name: 'LandingPanel',
  components: {
    LandingPanelLogin,
    LandingPanelRegister
  },
  data() {
    return {
      panel: 'login'
    }
  },
  methods: {
    toggleLandingPanel(panel) {
      this.panel = panel
      // this.$router.push({ path: `/${panel}` })
    }
  }
}
</script>

<style scoped>
</style>
