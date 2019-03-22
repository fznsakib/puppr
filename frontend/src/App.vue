<template>
  <div>
    <Navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  methods: {
    ...mapActions({
      fetchAccessToken: 'user/fetchAccessToken',
    }),
  },
  created() {
    this.fetchAccessToken();
  },
};
</script>

<style scoped></style>
