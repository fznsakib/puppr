<template>
  <div id="register">
    <div class="container is-flex">
      <div class="box">
        <h4 class="title is-bold has-text-centered">Register</h4>
        <form @submit.prevent="register">
          <div class="columns">
            <div class="column">
              <!-- first name -->
              <div class="field">
                  <label for="firstname" class="label">First Name</label>

                  <div class="control">
                      <input type="text" name="firstname" class="input"
                             placeholder="John" v-model="firstname" autofocus>
                  </div>
              </div>
            </div>

            <div class="column">
              <!-- last name -->
              <div class="field">
                  <label for="lastname" class="label">Last Name</label>

                  <div class="control">
                      <input type="text" name="lastname" class="input"
                             placeholder="Smith" v-model="lastname" autofocus>
                  </div>
              </div>
            </div>
          </div>

          <!-- username -->
          <div class="field">
              <label for="username" class="label">Username</label>

              <div class="control">
                  <input type="text" name="username" class="input"
                         placeholder="Username" v-model="username">
              </div>
          </div>

          <!-- email -->
          <div class="field">
              <label for="email" class="label">Email</label>

              <div class="control">
                  <input type="email" name="email" class="input"
                         placeholder="example@mail.com" v-model="email">
              </div>
          </div>

          <!-- password -->
          <div class="field">
              <label for="password" class="label">Password</label>

              <div class="control">
                  <input type="password" name="password" class="input"
                         v-model="password">
              </div>
          </div>

          <!-- password confirm -->
          <div class="field">
              <label for="passwordConfirm" class="label">Confirm Password</label>

              <div class="control">
                  <input type="password" name="passwordConfirm" class="input"
                         v-model="passwordConfirm">
              </div>
          </div>

          <div class="columns is-vcentered">
            <!-- submit -->
            <div class="column">
              <div class="field">
                  <div class="control">
                      <button type="submit" class="button is-link">Sign Up</button>
                  </div>
              </div>
            </div>

            <div class="column">
              <router-link :to="{ name: 'login' }"
                           class="is-pulled-right">Sign in instead</router-link>
            </div>
          </div>
        </form>
      </div>
    </div><!-- container -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'sign-up',
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    register() {
      const newUserData = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.registerUser(newUserData);
      this.$router.push('/');
    },
    ...mapActions({
      registerUser: 'account/register',
    }),
  },
};
</script>

<style scoped>
#register {
  font-family: 'Montserrat', sans-serif;
  width: 100vw;
  height: calc(100vh - 52px);
  background-color: #fafafa;
}
.container {
  height: 100%;
  max-width: 500px;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}
.box {
  padding: 2.5rem 2rem;
  padding-top: 2rem;
}

input:active, input:focus {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
</style>
