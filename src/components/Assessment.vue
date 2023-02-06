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
        <div class="i-flex i-flex-align-center" style="flex: 1">قبولی</div>
        <div
          class="i-flex i-flex-align-center i-flex-justify-center"
          style="flex: 2"
        >
          نمره دهی
        </div>
      </div>
      <div
        class="assessment__table__row i-flex"
        v-for="(row, index) in students"
        :key="index"
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
        <div class="i-flex i-flex-align-center" style="flex: 1">
          <b-form-checkbox
            style="cursor: pointer"
            v-model="row.accepted"
          ></b-form-checkbox>
        </div>
        <div
          class="i-flex i-flex-align-center i-flex-justify-center"
          style="flex: 2"
        >
          <i
            class="i-flex bi bi-pencil-square edit"
            @click="openForm(row.docnumber)"
          />
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
      <div class="i-flex-column i-width-1-1" style="position: relative">
        <i class="bi bi-file-earmark-pdf pdf-icon" @click="download"></i>
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
                type="number"
                theme="contrast"
                style="max-width: 60px"
                v-model="row.max"
                :id="`max_1${index}`"
                :rules="['integer']"
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
                v-model="row.how"
              />
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 4"
              :style="[index == 0 ? 'flex-direction: column' : '']"
            >
              <Input
                type="number"
                theme="contrast"
                style="max-width: 60px"
                v-model="row.grade[0]"
                id="first"
                :rules="['integer', `checkMax:max_1${index}`]"
                v-if="index != 0"
              />
              <Input
                type="number"
                theme="contrast"
                style="max-width: 60px"
                v-model="row.grade[0]"
                id="first"
                :rules="['integer', `checkSumMax:max_1${index}`]"
                v-if="index == 0"
              />
              <Input
                v-if="index == 0"
                type="number"
                theme="contrast"
                style="max-width: 60px"
                id="second"
                v-model="row.grade[1]"
                :rules="['integer', `checkSumMax:max_1${index}`]"
              />
              <Input
                v-if="index == 0"
                type="number"
                theme="contrast"
                style="max-width: 60px"
                id="third"
                v-model="row.grade[2]"
                :rules="['integer', `checkSumMax:max_1${index}`]"
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
                type="number"
                theme="contrast"
                style="max-width: 60px"
                v-model="row.max"
                :id="`max_2${index}`"
                :rules="['integer']"
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
                v-model="row.how"
              />
            </div>
            <div
              class="i-flex i-flex-align-center i-flex-justify-center"
              style="flex: 4"
            >
              <Input
                type="number"
                theme="contrast"
                style="max-width: 60px"
                v-model="row.grade[0]"
                :rules="['integer', `checkMax:max_2${index}`]"
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
  <vue3-html2pdf
    ref="html2Pdf"
    :manual-pagination="true"
    :enable-download="true"
    :filename="`assessment__${selectedDocnumber}`"
    pdf-format="a4"
  >
    <template v-slot:pdf-content>
      <div class="print i-flex-column">
        <span class="print--h1">فرم پیشنهادی شماره (۲)</span>
        <span class="print--h2"
          >نحوه بررسی سوابق علمی و مصاحبه آزمون دکتری (Ph.D)</span
        >
        <span class="print--desc"
          >براساس قانون سنجش و پذیرش دانشجو در دوره های تحصیلات تکمیلی مصاحبه و
          بررسی سوابق آموزشی، پژوهشی و فناوری به شرح زیر است.</span
        >
        <div class="print__details i-flex i-flex-column">
          <span class="print__details--title">دکتری آموزشی - پژوهشی:</span>
          <div class="i-flex i-width-1-1 i-flex-justify-between">
            <div class="print__details__item">
              <span>۱-</span
              ><span>سوابق آموزشی، پژوهشی و فناوری (۲۰ نمره)</span>
            </div>
            <div class="print__details__item">
              <span>۱-</span
              ><span>سوابق آموزشی، پژوهشی و فناوری (۳۰ نمره)</span>
            </div>
          </div>
        </div>
        <div class="print__warning">
          <span>تذکر ۱:</span>
          <span
            >نمره تمامی داوطلبان در هر یک از بخش های «سوابق آموزشی، پژوهشی و
            فناوری، مصاحبه علمی و سنجش علمی» توسط موسسه به صورت جداگانه از طریق
            پرتال ارتباطی به سازمان اعلام خواهد شد.</span
          >
        </div>
        <span class="print__form--title">دکتری آموزشی-پژوهشی</span>
        <div>
          <div class="i-flex-column i-width-1-1" style="position: relative">
            <span class="print__form-header"
              >۱) نمره سوابق آموزشی، پژوهشی و فناوری</span
            >
            <span class="print__form-desc"
              >جدول ۱- نحوه مساحبه نمرات آموزشی، پژوهشی و فناوری</span
            >
            <div
              class="i-flex-column i-flex-align-center i-flex-justify-center print__form__table"
            >
              <div
                class="print__form__table__row print__form__table__row--header i-flex"
              >
                <div class="i-flex i-flex-align-center" style="flex: 1">
                  ردیف
                </div>
                <div class="i-flex i-flex-align-center" style="flex: 12">
                  نوع فعالیت
                </div>
                <div class="i-flex i-flex-align-center" style="flex: 3">
                  حداکثر نمره
                </div>
                <div class="i-flex i-flex-align-center" style="flex: 4">
                  نحوه ارزیابی
                </div>
                <div class="i-flex i-flex-align-center" style="flex: 3">
                  نمره مکتسبه
                </div>
              </div>
              <div
                class="print__form__table__row i-flex"
                v-for="(row, index) in form_1"
                :key="index"
              >
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 1"
                >
                  {{ index }}
                </div>
                <div
                  class="i-flex-column i-flex-justify-center"
                  style="flex: 12"
                >
                  <span v-for="title in row.title" :key="title">{{
                    title
                  }}</span>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 3"
                >
                  <span>{{ row.max }}</span>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 4"
                >
                  <span>{{ row.how }}</span>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 3"
                  :style="[index == 0 ? 'flex-direction: column' : '']"
                >
                  <span v-if="index != 0"> {{ row.grade[0] }}</span>
                  <span v-if="index == 0"> {{ row.grade[0] }}</span>
                  <span v-if="index == 0"> {{ row.grade[1] }}</span>
                  <span v-if="index == 0"> {{ row.grade[2] }}</span>
                </div>
              </div>
              <div
                class="print__form__table__row print__form__table__row--footer i-flex"
              >
                <div class="i-flex i-flex-align-center" style="flex: 1"></div>
                <div class="i-flex i-flex-align-center" style="flex: 12">
                  جمع
                </div>
                <div class="i-flex i-flex-align-center" style="flex: 3">
                  {{ maxValueSum_1 }}
                </div>
                <div class="i-flex i-flex-align-center" style="flex: 4">-</div>
                <div class="i-flex i-flex-align-center" style="flex: 3">
                  {{ gradeSum_1 }}
                </div>
              </div>
            </div>
          </div>
          <div class="i-flex-column i-width-1-1">
            <span class="print__form-header"
              >۲) نمره مصاحبه علمی و سنجش علمی</span
            >
            <span class="print__form-desc"
              >جدول ۲-نمره مصاحبه علمی و سنجش علمی</span
            >
            <div
              class="i-flex-column i-flex-align-center i-flex-justify-center print__form__table"
            >
              <div
                class="print__form__table__row print__form__table__row--header i-flex"
              >
                <div class="i-flex i-flex-align-center" style="flex: 1">
                  ردیف
                </div>
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
                class="print__form__table__row i-flex"
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
                  <span v-for="title in row.title" :key="title">{{
                    title
                  }}</span>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 4"
                >
                  <span>{{ row.max }}</span>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 5"
                >
                  <span>{{ row.how }}</span>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  style="flex: 4"
                >
                  <span>{{ row.grade[0] }}</span>
                </div>
              </div>
              <div
                class="print__form__table__row print__form__table__row--footer i-flex"
              >
                <div class="i-flex i-flex-align-center" style="flex: 1"></div>
                <div class="i-flex i-flex-align-center" style="flex: 7">
                  جمع
                </div>
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
        </div>
        <div class="print__footer i-flex i-flex-justify-even">
          <span>نام و نام خانوادگی مصاحبه کننده:</span>
          <span>تاریخ و امضاءمصاحبه کننده:</span>
        </div>
      </div>
    </template>
  </vue3-html2pdf>
</template>

<script>
import ModalWindow from "./ModalWindow";
import Input from "./FieldTextInput";
import Button from "./FormButton";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Vue3Html2pdf from "vue3-html2pdf";

export default {
  components: { ModalWindow, Input, Button, Vue3Html2pdf },
  data() {
    return {
      showForm: false,
      students: [],
      form_1: [],
      form_2: [],
      selectedDocnumber: null,
    };
  },
  computed: {
    interviewYear() {
      return this.$store.state.activeInterviewYear;
    },
    maxValueSum_1() {
      const sum = this.form_1.reduce((accumulator, object) => {
        return accumulator + Number(object.max);
      }, 0);
      return sum;
    },
    maxValueSum_2() {
      const sum = this.form_2.reduce((accumulator, object) => {
        return accumulator + Number(object.max);
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
        sum += element.reduce((accumulator, object) => {
          return accumulator + Number(object);
        }, 0);
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
    if (this.interviewYear) this.getInterviewStudents();
  },
  methods: {
    download() {
      this.$refs.html2Pdf.generatePdf();
    },
    getInterviewStudents() {
      this.$axios.get(`/interview/ ${this.interviewYear}`).then((response) => {
        this.students = response.data;
      });
      this.$axios.get("/assessment/fields").then((response) => {
        this.titles = response.data;
        this.form1_titles = this.titles.filter((el) => el.formnum == 1);
        this.form2_titles = this.titles.filter((el) => el.formnum == 2);
      });
    },
    openForm(docnumber) {
      this.showForm = true;
      this.selectedDocnumber = docnumber;
      this.$axios.get(`/assessment/student/${docnumber}`).then((res) => {
        let form1 = res.data.filter((el) => el.formnum == 1);
        let form2 = res.data.filter((el) => el.formnum == 2);
        for (let index = 0; index < this.form1_titles.length; index++) {
          const elementTitle = this.form1_titles[index];
          let findField = form1.find(
            (el) => el.fieldnum == elementTitle.fieldnum
          );
          if (findField) {
            this.form_1.push({
              title: elementTitle.name,
              max: findField.max,
              how: findField.how,
              grade: findField.grade,
              fieldnum: elementTitle.fieldnum,
            });
          } else {
            this.form_1.push({
              title: elementTitle.name,
              max: "",
              how: "",
              grade: Array(elementTitle.name.length).fill(""),
              fieldnum: elementTitle.fieldnum,
            });
          }
        }
        for (let index = 0; index < this.form2_titles.length; index++) {
          const elementTitle = this.form2_titles[index];
          let findField = form2.find(
            (el) => el.fieldnum == elementTitle.fieldnum
          );
          if (findField) {
            this.form_2.push({
              title: elementTitle.name,
              max: findField.max,
              how: findField.how,
              grade: findField.grade,
              fieldnum: elementTitle.fieldnum,
            });
          } else {
            this.form_2.push({
              title: elementTitle.name,
              max: "",
              how: "",
              grade: Array(elementTitle.name.length).fill(""),
              fieldnum: elementTitle.fieldnum,
            });
          }
        }
      });
    },
    closeForm() {
      this.form_1 = [];
      this.form_2 = [];
      this.showForm = false;
    },
    applyAssessment() {
      let fields = [
        ...this.form_1.map((el) => {
          return {
            grade: el.grade.map((el) => (el === "" ? null : Number(el))),
            max: el.max,
            how: el.how,
            formnum: 1,
            fieldnum: el.fieldnum,
          };
        }),
        ...this.form_2.map((el) => {
          return {
            grade: el.grade.map((el) => (el === "" ? null : Number(el))),
            max: el.max,
            how: el.how,
            formnum: 2,
            fieldnum: el.fieldnum,
          };
        }),
      ];
      fields = fields.filter((el) => {
        return el.max !== "" && el.grade.indexOf(null) == -1;
      });
      if (
        fields.length &&
        !document.getElementsByClassName("error-icon").length
      ) {
        this.$axios
          .post(`/assessment/student/${this.selectedDocnumber}`, {
            fields,
          })
          .then(() => {
            this.form_1 = [];
            this.form_2 = [];
            toast(".تغییرات با موفقیت اعمال شد", {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_LEFT,
              type: "success",
            });
            this.showForm = false;
          })
          .catch(() => {
            toast("!خطا در اعمال تغییرات", {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_LEFT,
              type: "error",
            });
            this.showForm = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  cursor: pointer;
  &:hover {
    text-shadow: var(--highlight-color) 1px 1px 2px;
  }
}
.assessment {
  &__table {
    width: 80%;
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
      // &:hover {
      //   text-shadow: var(--highlight-color) 1px 1px 2px;
      // }
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
.pdf-icon {
  position: absolute;
  left: 112px;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    text-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
  }
}
$page-height: 295mm;
$page-width: 209mm;
.print {
  width: $page-width;
  height: $page-height;
  max-height: $page-height;
  padding: 25px 25px;
  overflow: hidden;
  font-size: 12px;
  direction: rtl;
  &--h1 {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &--h2 {
    font-size: 12px;
    font-weight: bold;
    align-self: center;
    margin-bottom: 20px;
  }
  &--desc {
    font-size: 11px;
    padding-bottom: 10px;
  }
  &__details {
    width: 100%;
    border: black solid 1px;
    padding: 10px;
    margin-bottom: 5px;
    &--title {
      font-size: 12px;
      font-weight: bold;
    }
    &__item {
      padding: 0 10px;
      &:last-child {
        margin-left: 100px;
      }
      & > span {
        font-size: 10px;
      }
    }
  }
  &__warning {
    margin-bottom: 10px;
    & > span {
      font-size: 11px;
    }
    & > span:first-child {
      font-weight: bold;
    }
  }
  &__form {
    &--title {
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    overflow-y: scroll;
    width: 1200px;
    min-height: 500px;
    padding: 32px;
    &-header {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    &-desc {
      font-size: 11;
      margin-bottom: 32px;
      font-style: italic;
    }
    &__table {
      width: 100%;
      margin-bottom: 16px;
      &__row {
        width: 80%;
        min-height: 30px;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        border-left: 1px solid black;
        padding: 0 8px;
        font-size: 10;
        & > div {
          border-left: 1px solid black;
          &:first-child {
            border-left: none;
          }
          &:last-child {
            border-left: none;
          }
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
            border-left: 1px solid black;
            &:first-child {
              border-left: none;
            }
            &:last-child {
              border-left: none;
            }
          }
          background-color: rgb(226, 225, 225);
          border: 1px solid black;
          font-size: 10px;
          font-weight: 500;
        }
        &--footer {
          & > div {
            display: flex;
            align-content: center;
            justify-content: center;
            border-left: 1px solid black;
            &:first-child {
              border-left: none;
            }
            &:last-child {
              border-left: none;
            }
          }
          background-color: rgb(226, 225, 225);
          border: 1px solid black;
          border-top: none;
          color: black;
          font-size: 10px;
          // min-height: 55px !important;
          font-weight: 500;
        }
      }
    }
  }
  &__footer {
    font-size: 12px;
    margin-top: 20px;
  }
}
</style>
