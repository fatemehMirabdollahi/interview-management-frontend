<template>
  <div
    class="card i-flex-column i-flex i-flex-align-center i-flex-justify-center"
    v-if="interview.type == 'interview'"
  >
    <div v-if="interview.student">
      <span
        >{{ interview.student.studentname }}
        {{ interview.student.lastname }}</span
      >
    </div>
    <div v-if="interview.student">
      <span>{{ interview.student.docnumber }}</span>
    </div>
    <div class="card--empty i-flex i-flex-justify-center" v-else>-</div>
  </div>
  <div class="card--gap i-flex-column" v-else>
    {{ interview.type == "gap" ? "نماز و نهار" : "" }}
  </div>
</template>

<script>
export default {
  props: {
    interview: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-height: 64px;
  border: 1px solid var(--color-3);
  border-radius: 5px;
  padding: 7px;
  &--empty {
    width: 70px;
  }
}
</style>
