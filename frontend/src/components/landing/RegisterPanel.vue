<template>
  <div class="register">
    <div class="box">
      <h1 class="title is-bold has-text-centered">
        Register
      </h1>

      <form @submit.prevent="submit">
        <!-- Name -->
        <div class="field">
          <label class="label">
            Full Name
          </label>

          <div class="control has-icons-left"
               :class="{ 'input-filled': fullnameInputHasText }">
            <input v-model="userToRegister.fullname" type="text" class="input" autofocus>
            <span class="icon is-small is-left">
              <i class="fas fa-address-card" />
            </span>
          </div>
        </div>

        <!-- username -->
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left"
               :class="{ 'input-filled': usernameInputHasText }">
            <input v-model="userToRegister.username" type="text" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-user" />
            </span>
          </div>
        </div>

        <!-- email -->
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left"
               :class="{ 'input-filled': emailInputHasText }">
            <input v-model="userToRegister.email" type="email" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </div>
        </div>

        <!-- password -->
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left"
               :class="{ 'input-filled': passwordInputHasText }">
            <input v-model="userToRegister.password" type="password" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-key" />
            </span>
          </div>
        </div>

        <!-- password confirm -->
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control has-icons-left"
               :class="{ 'input-filled': passwordConfirmInputHasText }">
            <input v-model="userToRegister.passwordConfirm" type="password" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-key" />
            </span>
          </div>
        </div>

        <!--submit -->
        <div class="field is-grouped is-flex">
          <!-- sign up button -->
          <div class="control">
            <button type="submit" class="button is-black">
              Sign Up
            </button>
          </div>
          <!-- form toggle => TO login -->
          <div class="control">
            <button class="button is-text" type="button"
                    @click="togglePanel">
              Log in
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
  name: 'RegisterPanel',
  data() {
    return {
      userToRegister: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  computed: {
    fullnameInputHasText() {
      return !(this.userToRegister.fullname === '')
    },
    usernameInputHasText() {
      return !(this.userToRegister.username === '')
    },
    emailInputHasText() {
      return !(this.userToRegister.email === '')
    },
    passwordInputHasText() {
      return !(this.userToRegister.password === '')
    },
    passwordConfirmInputHasText() {
      return !(this.userToRegister.passwordConfirm === '')
    }
  },
  methods: {
    togglePanel() {
      this.$emit('togglePanel')
    },
    submit() {
      this.register(this.userToRegister)
      this.$router.push({ path: '/' })
    },
    ...mapActions({
      register: 'auth/register'
    })
  }
}
</script>

<style lang="scss" scoped>
/* The entire component */
.register {
  max-width: 27rem;
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
  -webkit-box-shadow: none;
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
