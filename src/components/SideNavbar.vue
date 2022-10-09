<template>
  <div class="i-flex-column i-flex-align-center side-navbar">
    <div class="i-flex">
      <img src="@/assets/images/logo.png" alt="" />
    </div>
    <div
      class="i-flex-column i-flex-1 i-flex-align-center i-flex-justify-center side-navbar__menu"
    >
      <div class="i-flex i-flex side-navbar__item" @click="open('Selection')">
        <span>غربالگری</span>
      </div>
      <div class="i-flex i-flex side-navbar__item" @click="open('scheduling')">
        <span>زمانبندی</span>
      </div>
      <div class="i-flex i-flex side-navbar__item" @click="open('Selection')">
        <span>مصاحبه</span>
      </div>
      <div class="i-flex i-flex side-navbar__item" @click="open('Selection')">
        <span>مدیریت کاربر</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["open"],
  methods: {
    open(pageName) {
      this.$router.push(pageName);
    },
  },
};
</script>

<style lang="scss" scoped>
.side-navbar {
  width: 300px;
  height: 100%;
  padding-top: 50px;
  background-color: var(--color-3);
  &__menu {
    margin-top: 50px;
    width: 100%;
  }
  &__item {
    margin: 25px 0;
    color: var(--on-color-3);
    font-size: 23px;
    padding: 10px 20px;
    width: 100%;
    cursor: pointer;
    &:hover {
      font-size: 24px;
      font-weight: 700;
    }
    &--active {
      border-top: solid 1px white;
      border-bottom: solid 1px white;
    }
  }
}
</style>
