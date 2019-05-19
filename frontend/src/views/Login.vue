<template>
  <div id="login">
    <div class="container is-flex">
      <div class="box">
        <h4 class="title is-bold has-text-centered">
          Login
        </h4>
        <form @submit.prevent="loginSubmit">
          <!-- first name -->
          <div class="field">
            <label
              for="email"
              class="label">Email</label>

            <div class="control">
              <input
                v-model="email"
                type="email"
                name="email"
                class="input"
                placeholder="example@mail.com"
                autofocus>
            </div>
          </div>

          <!-- password -->
          <div class="field">
            <label
              for="password"
              class="label">Password</label>

            <div class="control">
              <input
                v-model="password"
                type="password"
                name="password"
                class="input">
            </div>
          </div>

          <div class="columns is-vcentered is-mobile">
            <!-- submit -->
            <div class="column">
              <div class="field">
                <div class="control">
                  <button
                    type="submit"
                    :disabled="loggingIn"
                    :class="{ 'is-loading': loggingIn }"
                    class="button is-link">
                    Log In
                  </button>
                </div>
              </div>
            </div>

            <div class="column">
              <router-link
                :to="{ name: 'register' }"
                class="is-pulled-right">
                Create Account
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div><!-- container -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      loggingIn: false
    }
  },
  methods: {
    loginSubmit () {
      const { email, password } = this
      this.loggingIn = true
      this.login({ email, password })
      setTimeout(() => {
        this.loggingIn = false
        this.$router.push('/')
      }, 250)
    },
    ...mapActions({
      login: 'account/login'
    })
  }
}
</script>

<style scoped>
#login {
  font-family: 'Montserrat', sans-serif;
  width: 100vw;
  height: calc(100vh - 52px);
  background-color: #fafafa;
}
.container {
  height: 100%;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  max-width: 500px;
}
.box {
  padding: 2.5rem 2rem;
  padding-top: 2rem;
  width: 500px;
}

input:active, input:focus {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
</style>
