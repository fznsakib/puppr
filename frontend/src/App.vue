<template>
  <div>
    <Navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    this.validateSession()
  },
  methods: {
    ...mapActions({
      validateSession: 'account/validateSession'
    })
  }
}
</script>

<style scoped>
</style>
