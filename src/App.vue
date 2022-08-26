<template>
  <router-view />
</template>

<script>
import variables from "./assets/scss/_export.module.scss";

export default {
  setup() {
    console.log(variables);
  },
};
</script>

<style></style>
