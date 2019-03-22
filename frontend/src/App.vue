<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',
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
