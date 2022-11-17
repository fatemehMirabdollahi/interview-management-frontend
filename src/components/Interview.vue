<template>
  <div>
    <div class="interview__table i-flex-column" v-if="!selectedDocnumber">
      <div class="interview__table-header interview__table-row i-flex">
        <div
          class="interview__table__width-150 i-flex i-flex-align-center i-flex-justify-center"
        >
          تاریخ
        </div>
        <div
          v-for="(time, index) in interviewsPerDaySchedule"
          :key="index"
          class="i-flex i-flex-align-center i-flex-justify-center"
          :class="[
            time.type == 'interview'
              ? 'interview__table__width-150'
              : time.type == 'rest'
              ? 'interview__table__width-10'
              : 'interview__table__width-20',
          ]"
        >
          {{
            time.type == "interview" || time.type == "gap"
              ? `${time.start.hour}:${time.start.minute}-${time.end.hour}:${time.end.minute}`
              : ""
          }}
        </div>
      </div>
      <div
        class="i-flex interview__table-row"
        v-for="day in Object.keys(interviews)"
        :key="day"
      >
        <div
          class="interview__table__width-150 i-flex i-flex-align-center i-flex-justify-center"
        >
          {{ day }}
        </div>
        <div
          v-for="(interview, index2) in interviews[day]"
          :key="index2"
          class="i-flex i-flex-align-center i-flex-justify-center"
          :class="[
            interview.type == 'interview'
              ? 'interview__table__width-150'
              : interview.type == 'rest'
              ? 'interview__table__width-10'
              : 'interview__table__width-20',
          ]"
        >
          <interview-card
            :interview="interview"
            :needDrag="false"
            @select="select(interview)"
          />
        </div>
      </div>
    </div>
    <modal title="مصاحبه" v-else @esc="selectedDocnumber = null">
      <meet :docnumber="selectedDocnumber" @close="selectedDocnumber = null" />
    </modal>
  </div>
</template>

<script>
import interviewCard from "./InterviewCard";
import Meet from "./Meet";
import Modal from "./ModalWindow";
export default {
  components: { interviewCard, Meet, Modal },
  data() {
    return {
      interviews: {},
      interviewsPerDaySchedule: [],
      selectedDocnumber: null,
    };
  },
  computed: {
    interviewYear() {
      return this.$store.state.activeInterviewYear;
    },
  },
  watch: {
    interviewYear() {
      this.getMeets();
    },
  },
  created() {
    if (this.interviewYear) this.getMeets();
  },
  methods: {
    getMeets() {
      this.$axios.get(`/meet/${this.interviewYear}`).then((response) => {
        let meets = response.data.meets;
        this.interviews = meets;
        this.interviewsPerDaySchedule = meets[Object.keys(meets)[0]].map(
          (el) => {
            return {
              type: el.type,
              start: el.start,
              end: el.end,
            };
          }
        );
      });
    },
    select(el) {
      this.selectedDocnumber = el.student ? el.student.docnumber : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.interview {
  &__table {
    margin-bottom: 40px;
    &-header {
      background-color: var(--color-3);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: var(--on-color-3);
      font-size: 20px;
    }
    &__width {
      &-150 {
        width: 120px;
      }
      &-10 {
        width: 20px;
        background-color: #1e417670;
      }
      &-20 {
        width: 110px;
        background-color: #1e417670;
      }
    }
    &-row {
      padding: 0 16px;
      height: 70px;
    }
  }
}
</style>
