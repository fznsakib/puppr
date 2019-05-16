<template>
  <div class="tabs is-centered is-medium is-fullwidth">
    <ul>
      <li v-for="(tab, index) in tabsData"
          :key="index"
          @click="activeTabIndex = index"
          class="tab"
          :class="{ 'is-active': index===activeTabIndex }">
        <a id="override">
          <span class="icon is-small">
            <i :class="tab.iconClasses" aria-hidden="true"></i>
          </span>
          <span>{{ tab.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'basetabs',
  data() {
    return {
      activeTabIndex: 1,
    };
  },
  props: {
    tabsData: {
      type: Array,
      required: true,
    },
  },
};
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
