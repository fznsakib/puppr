<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store/store';

export default {
  name: 'app',
  created() {
    // Checks to see if token still valid. If not, simply log out
    this.$http.interceptors.response.use(undefined, err => new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch(logout);
      }
      throw err;
    }));
  },
};
</script>

<style scoped></style>
