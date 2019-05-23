<template>
  <a
    class="navbar-item has-dropdown avatar"
    :class="{ 'is-active': isDisplayingMenu }"
    @click="isDisplayingMenu = !isDisplayingMenu"
    @mouseleave="isDisplayingMenu = false">
    <!-- username and image -->
    <div class="navbar-item username">
      {{ username }}
    </div>
    <img :src="avatarImage">

    <!-- menu displayed when clicked -->
    <div
      class="navbar-dropdown is-boxed is-right">
      <a class="navbar-item">
        <i class="fas fa-user" />
        Account
      </a>
      <a class="navbar-item">
        <i class="fas fa-cog" />
        Settings
      </a>

      <hr class="navbar-divider">

      <a class="navbar-item">
        <i class="fas fa-arrow-circle-left" />
        Sign Out
      </a>
    </div>
  </a>
</template>

<script>
export default {
  name: 'NavbarAvatar',
  data() {
    return {
      username: 'ebxn',
      avatarImage: 'https://picsum.photos/500/500',
      isDisplayingMenu: false
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  height: 52px;
  align-items: center;

  & img { border-radius: 50%; }
}

.navbar-dropdown {
  cursor: default;
}

.navbar-item {
  & i {
    text-align: center;
    width: 14px;
    margin-right: 0.5rem;
  }
}

.navbar-divider { margin: 0.5rem 0.3rem; }

.username {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
