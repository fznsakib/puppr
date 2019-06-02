<template lang="pug">
  a(class="navbar-item has-dropdown avatar", :class="{'is-active': isDisplayingMenu}"
    @click="isDisplayingMenu = !isDisplayingMenu", @mouseleave="isDisplayingMenu = false")
    //- username and image
    div(class="navbar-item username") {{ user.username }}
    img(:src="user.profileImageURL")

    //- menu displayed when clicked
    NavbarRightAvatarMenu
</template>

<script>
import NavbarRightAvatarMenu from '@/components/navbar/NavbarRightAvatarMenu.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'NavbarRightAvatar',
  components: {
    NavbarRightAvatarMenu
  },
  data() {
    return {
      isDisplayingMenu: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
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
