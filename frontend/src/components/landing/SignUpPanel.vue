<template>
  <div class="signup">
    <div class="box">
      <h1 class="title is-bold has-text-centered">
        Sign Up
      </h1>

      <form @submit.prevent="signup">
        <!-- Name -->
        <div class="field">
          <label class="label">
            Full Name
          </label>

          <div class="control has-icons-left">
            <input type="text" class="input" autofocus>
            <span class="icon is-small is-left">
              <i class="fas fa-address-card" />
            </span>
          </div>
        </div>

        <!-- username -->
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input type="text" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-user" />
            </span>
          </div>
        </div>

        <!-- email -->
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input type="email" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </div>
        </div>

        <!-- password -->
        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control has-icons-left">
            <input type="password" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-key" />
            </span>
          </div>
        </div>

        <!-- password confirm -->
        <div class="field">
          <label for="password" class="label">Confirm Password</label>
          <div class="control has-icons-left">
            <input type="password" class="input">
            <span class="icon is-small is-left">
              <i class="fas fa-key" />
            </span>
          </div>
        </div>

        <!--submit -->
        <div class="field is-grouped is-flex">
          <!-- sign up button -->
          <div class="control">
            <button
              type="submit"
              class="button is-black">
              Sign Up
            </button>
          </div>
          <!-- form toggle => TO login -->
          <div class="control">
            <button
              class="button is-text"
              type="button"
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
export default {
  name: 'SignUpPanel',
  methods: {
    togglePanel() {
      this.$emit('togglePanel')
    }
  }
}
</script>

<style lang="scss" scoped>
/* The entire component */
.signup {
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
