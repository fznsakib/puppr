<template>
 <div>
   <form class="login" @submit.prevent="loginSubmit">
     <h1>Sign in</h1>
     <label>Email</label>
     <input required v-model="email" type="email" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginSubmit() {
      const { email, password } = this;
      this.login({ email, password });
      this.$router.push('/');
    },
    ...mapActions({
      login: 'account/login',
    }),
  },
};
</script>
