<template>
  <div class="login">
    <div class="box">
      <h1 class="title is-bold has-text-centered">
        Login
      </h1>

      <form @submit.prevent="submit">
        <!-- Username -->
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left"
               :class="{ 'input-filled': usernameInputHasText }">
            <input v-model="userToLogin.username" type="text"
                   class="input" autofocus>
            <span class="icon is-small is-left">
              <i class="fas fa-user" />
            </span>
          </div>
        </div>

        <!-- Password -->
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left"
               :class="{ 'input-filled': passwordInputHasText }">
            <input v-model="userToLogin.password" type="password" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-key" />
            </span>
          </div>
        </div>

        <!--Submit -->
        <div class="field is-grouped is-flex">
          <div class="control">
            <button type="submit" class="button is-black">
              Login
            </button>
          </div>
          <div class="control">
            <button class="button is-text" type="button" @click="togglePanel">
              Create account
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPanel',
  data() {
    return {
      userToLogin: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    usernameInputHasText() {
      return !(this.userToLogin.username === '')
    },
    passwordInputHasText() {
      return !(this.userToLogin.password === '')
    }
  },
  methods: {
    togglePanel() {
      this.$emit('togglePanel')
    },
    submit() {
      this.login(this.userToLogin)
      this.$router.push({ path: '/' })
    },
    ...mapActions({
      login: 'auth/login'
    })
  }
}
/*
For login form:
> grey is #DADADA
> CSS for "is-focused"
> Check v-model !== ''
>    if true: add "has-text" class which is same as is-focused */

</script>

<style lang="scss" scoped>
/* The entire component */
.login {
  width: 20rem;
}

/* The box */
.box {
  background-color: rgba(255, 255, 255, 0.95);
  padding-top: 2rem;
  padding-bottom: 2rem;

  & h1 { padding-bottom: 1rem; }
}

/* A section in the box */
.field {
  padding-bottom: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Text above inputs */
.label { margin-bottom: 0.2rem; }

/* Text fields on form */
.input, .input:focus {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid #dadada;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.1s ease-in-out;

  &:focus { border-bottom: 1px solid black; }
  & + span { transition: all 0.1s ease-in-out; }
}

.input-filled {
  & input, & input:focus { border-bottom: 1px solid #7a7a7a; }
  & i { color: #7a7a7a; }
}

.button:focus { outline: none; }

.is-grouped { justify-content: space-between; }
</style>
