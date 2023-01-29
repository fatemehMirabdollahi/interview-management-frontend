<template>
  <div class="assessment i-flex-column i-flex-align-center">
    <div class="assessment__table i-flex-column">
      <div class="assessment__table__row assessment__table__row--header i-flex">
        <div class="i-flex i-flex-align-center" style="flex: 2"></div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          شماره پرونده
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">نام</div>
        <div class="i-flex i-flex-align-center" style="flex: 5">
          نام خانوادگی
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 2">قبولی</div>
      </div>
      <div
        class="assessment__table__row i-flex"
        v-for="(row, index) in students"
        :key="index"
        @click="openForm(row)"
      >
        <div class="i-flex i-flex-align-center" style="flex: 2">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.docnumber }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.studentname }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 5">
          {{ row.lastname }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 2">
          <b-form-checkbox
            style="cursor: pointer"
            v-model="row.selected"
          ></b-form-checkbox>
        </div>
      </div>
    </div>
  </div>
  <modal-window
    @esc="closeForm"
    title="سوابق علمی و مصاحبه آزمون دکتری"
    v-if="showForm"
  >
    <div class="i-flex-column i-flex-align-center assessment__form">
      <div class="i-flex-column i-width-1-1">
        <span class="assessment__form-header"
          >۱) نمره سوابق آموزشی، پژوهشی و فناوری</span
        >
        <span class="assessment__form-desc"
          >جدول ۱- نحوه مساحبه نمرات آموزشی، پژوهشی و فناوری</span
        >
        <div
          class="i-flex-column i-flex-align-center i-flex-justify-center assessment__form__table"
        >
          <div
            class="assessment__form__table__row assessment__form__table__row--header i-flex"
          >
            <div class="i-flex i-flex-align-center" style="flex: 1">ردیف</div>
            <div class="i-flex i-flex-align-center" style="flex: 7">
              نوع فعالیت
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              حداکثر نمره
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 5">
              نحوه ارزیابی
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              نمره مکتسبه
            </div>
          </div>
          <div
            class="assessment__form__table__row i-flex"
            v-for="(row, index) in form_1"
            :key="index"
          >
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 1"
            >
              {{ index }}
            </div>
            <div class="i-flex-column i-flex-justify-center" style="flex: 7">
              <span v-for="title in row.title" :key="title">{{ title }}</span>
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 4"
            >
              <Input
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.maxValue"
              />
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 5"
            >
              <Input
                type="text"
                theme="contrast"
                style="max-width: 200px"
                v-model="row.desc"
              />
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 4"
            >
              <Input
                v-if="index != 0"
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.grade"
              />
              <Input
                v-if="index == 0"
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.grade[0]"
              />
              <Input
                v-if="index == 0"
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.grade[1]"
              />
              <Input
                v-if="index == 0"
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.grade[2]"
              />
            </div>
          </div>
          <div
            class="assessment__form__table__row assessment__form__table__row--footer i-flex"
          >
            <div class="i-flex i-flex-align-center" style="flex: 1"></div>
            <div class="i-flex i-flex-align-center" style="flex: 7">جمع</div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              {{ maxValueSum_1 }}
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 5">-</div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              {{ gradeSum_1 }}
            </div>
          </div>
        </div>
      </div>
      <div class="i-flex-column i-width-1-1">
        <span class="assessment__form-header"
          >۲) نمره مصاحبه علمی و سنجش علمی</span
        >
        <span class="assessment__form-desc"
          >جدول ۲-نمره مصاحبه علمی و سنجش علمی</span
        >
        <div
          class="i-flex-column i-flex-align-center i-flex-justify-center assessment__form__table"
        >
          <div
            class="assessment__form__table__row assessment__form__table__row--header i-flex"
          >
            <div class="i-flex i-flex-align-center" style="flex: 1">ردیف</div>
            <div class="i-flex i-flex-align-center" style="flex: 7">
              نوع فعالیت
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              حداکثر نمره
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 5">
              نحوه ارزیابی
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              نمره مکتسبه
            </div>
          </div>
          <div
            class="assessment__form__table__row i-flex"
            v-for="(row, index) in form_2"
            :key="index"
          >
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 1"
            >
              {{ index }}
            </div>
            <div
              class="i-flex-column i-flex-justify-center i-flex-align-center"
              style="flex: 7"
            >
              <span v-for="title in row.title" :key="title">{{ title }}</span>
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 4"
            >
              <Input
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.maxValue"
              />
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 5"
            >
              <Input
                type="text"
                theme="contrast"
                style="max-width: 200px"
                v-model="row.desc"
              />
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 4"
            >
              <Input
                type="text"
                theme="contrast"
                style="max-width: 50px"
                v-model="row.grade"
              />
            </div>
          </div>
          <div
            class="assessment__form__table__row assessment__form__table__row--footer i-flex"
          >
            <div class="i-flex i-flex-align-center" style="flex: 1"></div>
            <div class="i-flex i-flex-align-center" style="flex: 7">جمع</div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              {{ maxValueSum_2 }}
            </div>
            <div class="i-flex i-flex-align-center" style="flex: 5">-</div>
            <div class="i-flex i-flex-align-center" style="flex: 4">
              {{ gradeSum_2 }}
            </div>
          </div>
        </div>
      </div>
      <div class="assessment__form__buttons i-flex i-flex-justify-between">
        <Button
          label="تایید"
          theme="light"
          :size="{ width: 120, height: 40 }"
          @click="applyAssessment"
        />
        <Button
          action="secondary"
          theme="light"
          label="انصراف"
          :size="{ width: 120, height: 40 }"
          @click="closeForm"
        />
      </div>
    </div>
  </modal-window>
</template>

<script>
import ModalWindow from "./ModalWindow";
import Input from "./FieldTextInput";
import Button from "./FormButton";
export default {
  components: { ModalWindow, Input, Button },
  data() {
    return {
      showForm: false,
      students: [],
      form_1: [
        {
          title: [
            "۱-۱ مقالات علمی - پژوهشی (داخلی و خارجی) مرتبط با رشته تحصیلی",
            "۱-۲ گواهی ثبت اختراع مورد تایید سازمان پژوهش های علمی و صنعتی ایران",
            "۱-۳ برگزیدگی در جشنواره های علمی معتبر",
          ],
          maxValue: "",
          decs: "",
          grade: ["", "", ""],
        },
        {
          title: ["مقالات علمی-ترویجی مرتبط با رشته تحصیلی"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["مقالات چاپ شده در کنفرانس های معتبر (داخلی و خارجی)"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["تالیف یا ترجمه کتاب مرتبط با رشته تحصیلی"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["معدل و کیفیت دانشگاه محل تحصیل"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["برگزیدگان المپیادهای علمی - دانشجویی"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["مدرک زبان معتبر"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["سایر موارد مورد نظر دانشگاه"],
          maxValue: "",
          desc: "",
          grade: "",
        },
      ],
      form_2: [
        {
          title: ["آزمون شفاهی و یا کتبی"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["مصاحبه تخصصی"],
          maxValue: "",
          desc: "",
          grade: "",
        },
        {
          title: ["نظر اساتید راهنما"],
          maxValue: "",
          desc: "",
          grade: "",
        },
      ],
    };
  },
  computed: {
    interviewYear() {
      return this.$store.state.activeInterviewYear;
    },
    maxValueSum_1() {
      const sum = this.form_1.reduce((accumulator, object) => {
        return accumulator + Number(object.maxValue);
      }, 0);
      return sum;
    },
    maxValueSum_2() {
      const sum = this.form_2.reduce((accumulator, object) => {
        return accumulator + Number(object.maxValue);
      }, 0);
      return sum;
    },
    gradeSum_2() {
      const sum = this.form_2.reduce((accumulator, object) => {
        return accumulator + Number(object.grade);
      }, 0);
      return sum;
    },
    gradeSum_1() {
      let sum = 0;
      for (let index = 0; index < this.form_1.length; index++) {
        const element = this.form_1[index].grade;
        if (index == 0) {
          sum += Number(element[0]) + Number(element[1]) + Number(element[2]);
        } else {
          sum += Number(element);
        }
      }
      return sum;
    },
  },
  watch: {
    interviewYear() {
      this.getInterviewStudents();
    },
  },
  created() {
    this.getInterviewStudents();
  },
  methods: {
    getInterviewStudents() {
      this.$axios.get(`/interview/ ${this.interviewYear}`).then((response) => {
        this.students = response.data;
      });
    },
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      for (let index = 0; index < this.form_1.length; index++) {
        const element = this.form_1[index];
        if (index == 0) {
          element.grade[0] = "";
          element.grade[1] = "";
          element.grade[2] = "";
        } else {
          element.grade = "";
        }
        element.maxValue = "";
        element.desc = "";
      }
      for (const item of this.form_2) {
        item.maxValue = "";
        item.grade = "";
        item.desc = "";
      }
      this.showForm = false;
    },
    applyAssessment() {
      this.showForm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment {
  &__table {
    width: 80%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-collapse: collapse;
    border-radius: 8px;
    font-size: 18px;
    &__row {
      cursor: pointer;
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
  }
  &__form {
    overflow-y: scroll;
    width: 1200px;
    min-height: 500px;
    padding: 32px;
    color: var(--on-color-3);
    &-header {
      font-size: fontSize("lg");
      font-weight: 600;
      margin-bottom: 8px;
    }
    &-desc {
      font-size: fontSize("m");
      margin-bottom: 32px;
    }
    &__table {
      width: 100%;
      margin-bottom: 16px;
      &__row {
        background-color: var(--on-color-3);
        width: 80%;
        min-height: 65px;
        border-bottom: 1px solid var(--color-3);
        border-right: 1px solid var(--color-1);
        border-left: 1px solid var(--color-1);
        color: var(--color-3);
        padding: 0 8px;
        font-size: fontSize("l");
        & > div {
          & > span {
            margin-bottom: 8px;
            &:last-child {
              margin-bottom: 0;
            }
          }
          &:first-child {
            font-weight: 700;
          }
        }
        &--header {
          & > div {
            display: flex;
            align-content: center;
            justify-content: center;
          }
          background-color: var(--color-3);
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border: 1px solid var(--color-1);
          color: var(--color-1);
          font-size: fontSize("lg");
          min-height: 60px !important;
          font-weight: 500;
        }
        &--footer {
          & > div {
            display: flex;
            align-content: center;
            justify-content: center;
          }
          background-color: var(--color-3);
          border: 1px solid var(--color-1);
          border-radius: 0 0 5px 5px;
          border-top: none;
          color: var(--on-color-3);
          font-size: fontSize("lg");
          min-height: 55px !important;
          font-weight: 500;
        }
      }
    }
    &__buttons {
      width: 25%;
      margin-top: 16px;
    }
  }
}
</style>
