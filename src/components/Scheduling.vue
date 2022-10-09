<template>
  <div class="scheduling i-flex-column">
    <div class="scheduling__field i-flex">
      <span class="scheduling__field-label"
        >تعداد دانشجویان منتخب برای مصاحبه :</span
      >
      <span class="scheduling__field-value">{{ sudentsNumber }}</span>
    </div>
    <div class="scheduling__field i-flex i-flex-align-center">
      <span class="scheduling__field-label">افزودن روز مصاحبه :</span>
      <div class="scheduling__field-date">
        <field-date-time
          id="date"
          name="date"
          v-model="dates"
          :multiple="true"
          :iconOnly="true"
        />
      </div>
    </div>
    <div class="scheduling__field i-flex">
      <span class="scheduling__field-label"
        >روز های انتخاب شده جهت مصاحبه :</span
      >
      <div class="scheduling__field-value">
        <span
          v-for="date in dates"
          :key="date"
          class="scheduling__field-value--date"
        >
          {{ date }}
        </span>
      </div>
    </div>
    <div class="scheduling__field i-flex i-flex-align-center">
      <span class="scheduling__field-label"> مدت زمان هر مصاحبه :</span>
      <div class="scheduling__field-number">
        <field-text-input
          type="number"
          v-model="interviewLength"
          :range="{ min: 5, max: 999 }"
        />
      </div>
      <span class="scheduling__field-unit">دقیقه</span>
    </div>
    <div class="scheduling__field i-flex i-flex-align-center">
      <span class="scheduling__field-label"> فاصله بین دو مصاحبه :</span>
      <div class="scheduling__field-number">
        <field-text-input
          type="number"
          v-model="rest"
          :range="{ min: 0, max: 999 }"
        />
      </div>
      <span class="scheduling__field-unit">دقیقه</span>
    </div>
    <div class="scheduling__field i-flex i-flex-align-center">
      <span class="scheduling__field-label"> زمان مصاحبه ها در هر روز :</span>
      <span class="scheduling-bold">شروع :</span>
      <div class="scheduling__field-range i-flex i-flex-align-center">
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="startTime.minute"
            :range="{ min: 0, max: 59 }"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="startTime.hour"
            :range="{ min: 0, max: 23 }"
          />
        </div>
      </div>
      <span class="scheduling-bold">پایان :</span>
      <div class="scheduling__field-range i-flex i-flex-align-center">
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="endTime.minute"
            :range="{ min: 0, max: 59 }"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="endTime.hour"
            :range="{ min: 0, max: 23 }"
          />
        </div>
      </div>
    </div>
    <div class="scheduling__field i-flex i-flex-align-center">
      <span class="scheduling__field-label"> نماز و نهار:</span>
      <span class="scheduling-bold">شروع :</span>
      <div class="scheduling__field-range i-flex i-flex-align-center">
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapStart.minute"
            :range="{ min: 0, max: 59 }"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapStart.hour"
            :range="{ min: 0, max: 23 }"
          />
        </div>
      </div>
      <span class="scheduling-bold">پایان :</span>
      <div class="scheduling__field-range i-flex i-flex-align-center">
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapEnd.minute"
            :range="{ min: 0, max: 59 }"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapEnd.hour"
            :range="{ min: 0, max: 23 }"
          />
        </div>
      </div>
    </div>
    <div
      class="scheduling__field scheduling__field-buttons i-flex i-flex-justify-center"
    >
      <form-button label="زمانبندی" :size="{ width: 100, height: 40 }" />
      <form-button
        label="نمایش تقویم مصاحبه ها"
        theme="light"
        :size="{ width: 200, height: 40 }"
      />
    </div>
    <div class="scheduling__field i-flex">
      <span class="scheduling__field-label">تعداد مصاحبه امکانپذیر:</span>
      <span class="scheduling__field-value">{{ scheduledInterviewNum }}</span>
    </div>
    <div class="scheduling__field i-flex">
      <span class="scheduling__field-label"
        >تعداد دانشجویان زمانبندی نشده :</span
      >
      <span class="scheduling__field-value">{{ scheduledInterviewNum }}</span>
    </div>
  </div>
</template>

<script>
import FieldDateTime from "./FieldDateTime.vue";
import FieldTextInput from "./FieldTextInput.vue";
import FormButton from "./FormButton.vue";
export default {
  components: { FieldDateTime, FieldTextInput, FormButton },
  data() {
    return {
      students: [],
      dates: [],
      startTime: {
        hour: 8,
        minute: 0,
      },
      endTime: {
        hour: 15,
        minute: 0,
      },
      interviewLength: 30,
      rest: 0,
      gapStart: {
        hour: 11,
        minute: 30,
      },
      gapEnd: {
        hour: 13,
        minute: 0,
      },
      scheduledInterviewNum: 0,
    };
  },
  computed: {
    interviewYear() {
      return this.$store.state.activeInterviewYear;
    },
    sudentsNumber() {
      return this.students.length;
    },
  },
  watch: {
    interviewYear() {
      this.getSudentsDate();
    },
  },
  created() {
    this.getSudentsDate();
  },
  methods: {
    getSudentsDate() {
      this.$axios
        .get(`/student/schedule/${this.interviewYear}`)
        .then((response) => {
          console.log(response.d);
          this.students = response.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.scheduling {
  &__field {
    color: var(--on-color-1);
    margin-bottom: 32px;
    &-label {
      font-weight: 500;
      margin-left: 24px;
    }
    &-date {
      width: 40px;
    }
    &-number {
      width: 70px;
    }
    &-value {
      flex-wrap: row;
      font-weight: 700;
      &--date:not(:last-child) {
        &::after {
          content: ",";
          margin: 0 10px;
        }
      }
    }
    &-range {
      & > div {
        margin: 0 10px;
      }
      margin-left: 32px;
    }
    &-unit {
      margin-right: 8px;
    }
    &-buttons {
      border-top: 1px solid var(--on-color-1);
      padding-top: 24px;
      & > button {
        margin-left: 64px;
      }
    }
  }
  &-bold {
    font-weight: bold;
  }
}
</style>
