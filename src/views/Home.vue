<template>
  <div class="i-flex home" dir="rtl">
    <navbar @open="openPage" />
    <div class="home__content i-flex-1">
      <component :is="activePage" />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/SideNavbar.vue";
import AddYear from "../components/AddYear.vue";
import Selection from "../components/Selection.vue";

export default {
  name: "Home",
  data() {
    return {
      activePage: "AddYear",
    };
  },
  components: { AddYear, Navbar, Selection },
  methods: {
    openPage(pageName) {
      console.log(pageName);
      this.activePage = pageName;
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background-color: var(--color-1);
  &__content {
    padding: 64px;
  }
}
</style>
