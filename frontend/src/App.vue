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
      validateSession: 'account/validateSession',
    }),
  },
  created() {
    this.validateSession();
  },
};
</script>

<style scoped></style>
