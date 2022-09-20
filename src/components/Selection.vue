<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      yaersOptions: [
        { value: 1397, text: "Please select an option" },
        { value: 1398, text: "This is First option" },
        { value: 1399, text: "Selected Option" },
        { value: 1400, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
    };
  },
};
</script>

<style></style>
