<template>
  <div>
    <Navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  methods: {
    ...mapActions({
      checkActiveSession: 'account/checkActiveSession',
    }),
  },
  created() {
    this.checkActiveSession();
  },
};
</script>

<style scoped></style>
