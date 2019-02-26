<template>
    <div>
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="email" /><br>
            <input type="password" name="password" /><br>
            <input type="submit" value="Login" />
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'Login',
  methods: {
    login: (e) => {
      e.preventDefault();
      const email = 'user@email.com';
      const password = 'password';
      const login = () => {
        const data = {
          email,
          password,
        };
        axios.post('/api/login', data)
          .then((response) => {
            console.log('Logged in');
            router.push('/dashboard');
          })
          .catch((errors) => {
            console.log('Cannot log in');
          });
      };
      login();
    },
  },
};
</script>
