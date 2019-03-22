<template>
  <div class="register container">
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
                             placeholder="First" v-model="name" autofocus>
                  </div>
              </div>
            </div>

            <div class="column">
              <!-- last name -->
              <div class="field">
                  <label for="last" class="label">Surname</label>

                  <div class="control">
                      <input type="text" name="last" class="input"
                             placeholder="Last" v-model="name" autofocus>
                  </div>
              </div>
            </div>
          </div>

          <!-- email -->
          <div class="field">
              <label for="email" class="label">Email</label>

              <div class="control">
                  <input type="text" name="email" class="input"
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

          <!-- submit -->
          <div class="field">
              <div class="control">
                  <button type="submit" class="button is-link">Sign Up</button>
              </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'sign-up',
  data() {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    register() {
      const newUserData = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
      };
      registerUser(newUserData);
      this.$router.push('/');
    },
    ...mapActions({
      registerUser: 'account/register'
    })
  },
};
</script>

<style scoped>
.register {
  margin-top: 3rem;
  max-width: 500px;
}
.container {
  height: 100vh;
  justify-content: center;
  align-content: center;
}
.box {
  padding: 2.5rem 2rem;
}
</style>
