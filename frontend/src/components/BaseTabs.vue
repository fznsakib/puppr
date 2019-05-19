<template>
  <div class="tabs is-centered is-medium is-fullwidth">
    <ul>
      <li
        v-for="(tab, index) in tabsData"
        :key="index"
        class="tab"
        :class="{ 'is-active': index===activeTabIndex }"
        @click="activeTabIndex = index"
      >
        <a id="override">
          <span class="icon is-small">
            <i
              :class="tab.iconClasses"
              aria-hidden="true"
            />
          </span>
          <span>{{ tab.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    tabsData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeTabIndex: 1
    }
  }
}
</script>

<style scoped>
.tabs {
  justify-content: center;
}
.tab {
  border: none;
}
/*#override {
  color: red;
}
.is-active #override {
  border-bottom-color: red;
}*/
</style>
