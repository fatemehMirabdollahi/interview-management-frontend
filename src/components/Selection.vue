<template>
  <div class="i-flex-column i-flex-align-center">
    <div
      class="i-flex i-flex-justify-start i-flex-align-center selection__option"
    >
      <div
        class="i-flex i-flex-align-center selection__option-field"
        @click="editMode = !editMode"
      >
        <edit-icon class="i-flex" :color="editMode ? '#394454' : '#bbbfca'" />
      </div>
    </div>
    <div class="selection__table i-flex-column">
      <div class="selection__table__row selection__table__row--header i-flex">
        <div class="i-flex i-flex-align-center" style="flex: 1"></div>
        <div class="i-flex i-flex-align-center" style="flex: 2">
          شماره پرونده
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">نام</div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          نام خانوادگی
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">تاریخ تولد</div>
        <div class="i-flex i-flex-align-center" style="flex: 6">کارشناسی</div>
        <div class="i-flex i-flex-align-center" style="flex: 6">
          کارشناسی ارشد
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 1">
          <b-form-checkbox
            v-model="overallSelected"
            :disabled="!editMode"
            @change="updateChecks"
            style="cursor: pointer"
          ></b-form-checkbox>
        </div>
      </div>

      <div
        class="selection__table__row i-flex"
        v-for="(row, index) in students"
        :key="index"
      >
        <div class="i-flex i-flex-align-center" style="flex: 1">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 2">
          {{ row.docnumber }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.studentname }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.lastname }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.birthdate }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 6">
          {{ row.bacheloruni }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 6">
          {{ row.masteruni }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 1">
          <b-form-checkbox
            style="cursor: pointer"
            v-model="row.selected"
            :disabled="!editMode"
          ></b-form-checkbox>
        </div>
      </div>
    </div>
    <div
      class="i-flex i-flex-justify-between selection__buttons"
      v-if="editMode"
    >
      <form-button
        class="login__form-button"
        :size="{ width: 120, height: 40 }"
        label="ثبت"
        @i-click="submit"
      />
      <form-button
        class="login__form-button"
        :size="{ width: 120, height: 40 }"
        label="انصراف"
        action="secondary"
        @i-click="cancelEdit"
      />
    </div>
  </div>
</template>

<script>
import EditIcon from "./icons/EditIcon";
import FormButton from "./FormButton";
export default {
  components: { EditIcon, FormButton },
  computed: {
    interviewYear() {
      return this.$store.state.activeInterviewYear;
    },
    selectes() {
      if (!this.students.length) return null;
      return this.students
        .filter((el) => el.selected)
        .map((el) => el.docnumber);
    },
  },
  watch: {
    interviewYear() {
      this.$axios.get(`/interview/ ${this.interviewYear}`).then((response) => {
        this.students = response.data;
        for (let index = 0; index < this.students.length; index++) {
          const element = this.students[index];
          if (element.selected) {
            this.selectedStudents.push(element.docNumber);
          }
        }
      });
    },
    selectes() {
      if (this.selectes.length == this.students.length) {
        this.overallSelected = true;
      } else {
        this.overallSelected = false;
      }
    },
  },
  data() {
    return {
      selected: null,
      students: [],
      editMode: false,
      selectedStudents: [],
      overallSelected: false,
    };
  },
  methods: {
    cancelEdit() {
      this.editMode = false;
      for (let index = 0; index < this.students.length; index++) {
        const element = this.students[index];
        if (this.selectedStudents.includes(element.docNumber))
          element.selected = true;
        else element.selected = false;
      }
    },
    submit() {
      let selecteds = this.students
        .filter((el) => el.selected)
        .map((el) => el.docnumber);
      this.$axios.put("/student/select", selecteds).then((response) => {
        console.log(response);
      });
    },
    updateChecks() {
      for (let index = 0; index < this.students.length; index++) {
        const element = this.students[index];
        if (this.selectedStudents.includes(element.docNumber))
          element.selected = this.overallSelected;
        else element.selected = this.overallSelected;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selection {
  &__option {
    padding: 10px 32px;
    align-self: flex-start;
    &-field {
      cursor: pointer;
    }
  }
  &__table {
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-collapse: collapse;
    border-radius: 8px;
    font-size: 18px;
    &__row {
      padding: 0 16px;
      &--header {
        background-color: var(--color-3);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        color: var(--on-color-3);
        padding: 0 16px;
        font-size: 20px;
      }
      height: 60px;
      border-bottom: 1px solid var(--color-2);
      &:last-child {
        border-bottom: 2px solid var(--color-3);
      }
      &:nth-of-type(even) {
        background-color: var(--on-color-3);
      }
      &:hover {
        text-shadow: var(--highlight-color) 1px 1px 2px;
      }
    }
    &-icon {
      cursor: pointer;
      width: 20px;
      &:hover {
        width: 22px;
      }
    }
  }
  &__buttons {
    width: 280px;
    margin-top: 64px;
  }
}
</style>
