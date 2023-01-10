<template>
  <router-view />
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("token")) {
      this.$axios.defaults.headers.common[
        "x-access-token"
      ] = `${localStorage.getItem("token")}`;
      this.$store.commit("login", localStorage.getItem("username"));
    }
  },
};
</script>

<style></style>
