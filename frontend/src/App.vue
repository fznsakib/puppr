<template>
  <div>
    <Navbar @showUploadModal="isVis = true" />
    <UploadModal
      v-if="isVis"
      @closeUploadModal="isVis = false" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/navbar/Navbar.vue'
import UploadModal from '@/components/modals/UploadModal.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    UploadModal
  },
  data() {
    return {
      isVis: false
    }
  },
  created () {
    this.validateSession()
  },
  methods: {
    ...mapActions({
      validateSession: 'auth/validateSession'
    })
  }
}
</script>

<style scoped>
</style>
