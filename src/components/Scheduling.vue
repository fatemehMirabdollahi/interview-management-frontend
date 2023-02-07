<template>
  <div class="scheduling i-flex-column" v-if="!showCalender">
    <i
      class="scheduling__refresh bi bi-arrow-counterclockwise"
      v-if="changed && interviewYear"
      @click="refresh"
    />
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
          @change="fieldChanged"
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
          :rules="['required', 'isBetween:5,90']"
          @change="fieldChanged"
          :disabled="!$store.state.isAdmin"
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
          :rules="['required', 'isBetween:0,90']"
          @change="fieldChanged"
          :disabled="!$store.state.isAdmin"
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
            :rules="['required', 'isBetween:0,59']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="startTime.hour"
            :rules="['required', 'isBetween:0,23']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
      </div>
      <span class="scheduling-bold">پایان :</span>
      <div class="scheduling__field-range i-flex i-flex-align-center">
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="endTime.minute"
            :rules="['required', 'isBetween:0,59']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="endTime.hour"
            :rules="['required', 'isBetween:0,23']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
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
            :rules="['required', 'isBetween:0,59']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapStart.hour"
            :rules="['required', 'isBetween:0,23']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
      </div>
      <span class="scheduling-bold">پایان :</span>
      <div class="scheduling__field-range i-flex i-flex-align-center">
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapEnd.minute"
            :rules="['required', 'isBetween:0,59']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
        <span class="scheduling-bold">:</span>
        <div class="scheduling__field-number">
          <field-text-input
            type="number"
            v-model="gapEnd.hour"
            :rules="['required', 'isBetween:0,23']"
            @change="fieldChanged"
            :disabled="!$store.state.isAdmin"
          />
        </div>
      </div>
    </div>
    <div
      class="scheduling__field scheduling__field-buttons i-flex i-flex-justify-center"
    >
      <form-button
        label="زمانبندی"
        :size="{ width: 100, height: 40 }"
        @i-click="schedule"
        :disable="
          students.length == 0 || dates.length == 0 || !$store.state.isAdmin
        "
      />
      <form-button
        label="نمایش تقویم مصاحبه ها"
        theme="light"
        :size="{ width: 200, height: 40 }"
        @i-click="openCalender"
        :disable="students.length == 0 || dates.length == 0"
      />
    </div>
    <div class="i-flex i-flex-justify-center">
      <span v-if="hasError" class="scheduling__error-text"
        >لطفا موارد مشخص شده را اصلاح کنید!</span
      >
    </div>
    <div class="scheduling__field i-flex">
      <span class="scheduling__field-label">تعداد مصاحبه امکانپذیر:</span>
      <span class="scheduling__field-value">{{ scheduledInterviewNum }}</span>
    </div>
    <div class="scheduling__field i-flex">
      <span class="scheduling__field-label"
        >تعداد دانشجویان زمانبندی نشده :</span
      >
      <span
        class="scheduling__field-value"
        v-if="sudentsNumber > scheduledInterviewNum"
        >{{ sudentsNumber - scheduledInterviewNum }}</span
      >
      <div v-else>0</div>
    </div>
  </div>
  <div v-else>
    <div class="i-flex-column i-flex-align-center">
      <div class="i-flex i-width-1-1 i-flex-justify-end">
        <i
          class="i-flex i-flex-align-center scheduling__back bi bi-arrow-counterclockwise"
          @click="refresh('calender')"
        />
        <i
          class="i-flex i-flex-align-center scheduling__back bi bi-escape"
          @click="(showCalender = false), refresh('calender')"
        />
      </div>

      <div class="scheduling__table i-flex-column">
        <div class="scheduling__table-header scheduling__table-row i-flex">
          <div
            class="scheduling__table__width-150 i-flex i-flex-align-center i-flex-justify-center"
          >
            تاریخ
          </div>
          <div
            v-for="(time, index) in interviewsPerDaySchedule"
            :key="index"
            class="i-flex i-flex-align-center i-flex-justify-center"
            :class="[
              time.type == 'interview'
                ? 'scheduling__table__width-150'
                : time.type == 'rest'
                ? 'scheduling__table__width-10'
                : 'scheduling__table__width-20',
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
          class="i-flex scheduling__table-row"
          v-for="day in Object.keys(interviews)"
          :key="day"
        >
          <div
            class="scheduling__table__width-150 i-flex i-flex-align-center i-flex-justify-center"
          >
            {{ day }}
          </div>
          <div
            v-for="(interview, index2) in interviews[day]"
            :key="index2"
            class="i-flex i-flex-align-center i-flex-justify-center"
            :class="[
              interview.type == 'interview'
                ? 'scheduling__table__width-150'
                : interview.type == 'rest'
                ? 'scheduling__table__width-10'
                : 'scheduling__table__width-20',
            ]"
          >
            <interview-card
              :interview="interview"
              @dragged="dragstart(interview)"
              @dropped="dragend(interview)"
            />
          </div>
        </div>
      </div>
      <div class="i-flex i-flex-justify-between report__buttons">
        <form-button
          label="print"
          :size="{ width: 100, height: 40 }"
          @i-click="download"
        />

        <form-button
          v-if="
            sudentsNumber <= scheduledInterviewNum && scheduledInterviewNum != 0
          "
          label="ذخیره جدول زمانبندی"
          :size="{ width: 200, height: 40 }"
          @i-click="saveCalender"
          :disable="!$store.state.isAdmin"
        />
      </div>
    </div>
  </div>
  <vue3-html2pdf
    ref="html2Pdf"
    :manual-pagination="true"
    :enable-download="true"
    :filename="'interviewShedule'"
    pdf-orientation="landscape"
    pdf-format="a4"
  >
    <template v-slot:pdf-content>
      <div class="report i-flex-column i-flex-align-center">
        <div
          class="i-flex i-flex-column i-flex-align-center"
          style="
            border: 5px solid black;
            width: 100%;
            height: 100%;
            padding: 30px 10px;
            position: relative;
          "
        >
          <span class="report__title--first">بسم تعالی</span>
          <span class="report__title--seconde"
            >زمان بندی مصاحبه های سال ۱۴۰۰</span
          >

          <div class="report__table i-flex-column">
            <div class="report__table-header report__table-row i-flex">
              <div
                class="report__table__width-150 i-flex i-flex-align-center i-flex-justify-center"
              >
                تاریخ
              </div>
              <div
                v-for="(time, index) in interviewsPerDaySchedule"
                :key="index"
                class="report__table-header--color i-flex i-flex-align-center i-flex-justify-center"
                :class="[
                  time.type == 'interview'
                    ? 'report__table__width-150'
                    : time.type == 'rest'
                    ? 'report__table__width-10'
                    : 'report__table__width-20',
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
              class="i-flex report__table-row"
              v-for="day in Object.keys(interviews)"
              :key="day"
            >
              <div
                class="report__table__width-150 i-flex i-flex-align-center i-flex-justify-center"
              >
                {{ day }}
              </div>
              <div
                v-for="(interview, index2) in interviews[day]"
                :key="index2"
                class="i-flex i-flex-align-center i-flex-justify-center"
                :class="[
                  interview.type == 'interview'
                    ? 'report__table__width-150'
                    : interview.type == 'rest'
                    ? 'report__table__width-10'
                    : 'report__table__width-20',
                ]"
              >
                <div v-if="interview.type == 'interview'">
                  <div v-if="interview.student" class="i-flex-column">
                    <span>
                      {{ interview.student.studentname }}
                      {{ interview.student.lastname }}
                    </span>
                    <span>{{ interview.student.docnumber }}</span>
                  </div>
                </div>
                <div
                  class="i-flex i-flex-align-center i-flex-justify-center"
                  v-else-if="interview.type == 'gap'"
                >
                  <span>نماز و نهار</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template></vue3-html2pdf
  >
</template>

<script>
import FieldDateTime from "./FieldDateTime";
import FieldTextInput from "./FieldTextInput";
import FormButton from "./FormButton";
import interviewCard from "./InterviewCard";
import Vue3Html2pdf from "vue3-html2pdf";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: {
    FieldDateTime,
    FieldTextInput,
    FormButton,
    interviewCard,
    Vue3Html2pdf,
  },
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
      rest: 5,
      gapStart: {
        hour: 12,
        minute: 0,
      },
      gapEnd: {
        hour: 13,
        minute: 30,
      },
      scheduledInterviewNum: 0,
      showCalender: false,
      interviews: {},
      timesPerDay: [],
      interviewsPerDaySchedule: [],
      changed: false,
      hasError: false,
      draggingInterview: null,
      droppedOnInterview: null,
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
      this.getInterviewData();
      this.getSudentsData();
    },
    dates() {
      // this.changed = true;
    },
  },
  created() {
    this.getSudentsData();
    this.getInterviewData();
  },
  methods: {
    dragstart(interview) {
      this.draggingInterview = { ...interview };
    },
    dragend(interview) {
      this.droppedOnInterview = { ...interview };
      let find = 0;
      for (const key in this.interviews) {
        if (Object.hasOwnProperty.call(this.interviews, key)) {
          const day = this.interviews[key];
          for (let index = 0; index < day.length; index++) {
            const meet = day[index];
            if (meet.id == this.draggingInterview.id) {
              this.interviews[key][index].id = this.droppedOnInterview.id;
              this.interviews[key][index].type = this.droppedOnInterview.type;
              this.interviews[key][index].student =
                this.droppedOnInterview.student;
              find++;
            } else if (meet.id == this.droppedOnInterview.id) {
              this.interviews[key][index].id = this.draggingInterview.id;
              this.interviews[key][index].type = this.draggingInterview.type;
              this.interviews[key][index].student =
                this.draggingInterview.student;

              find++;
            }
            if (find == 2) {
              break;
            }
          }
        }
        if (find == 2) {
          break;
        }
      }
    },
    download() {
      this.$refs.html2Pdf.generatePdf();
    },
    getSudentsData() {
      this.$axios
        .get(`/student/schedule/${this.interviewYear}`)
        .then((response) => {
          this.students = response.data;
        });
      this.startTime = {
        hour: 8,
        minute: 0,
      };
      this.endTime = {
        hour: 15,
        minute: 0,
      };
      this.interviewLength = 30;
      this.rest = 5;
      this.gapStar = {
        hour: 12,
        minute: 0,
      };
      this.gapEnd = {
        hour: 13,
        minute: 30,
      };
      this.scheduledInterviewNum = 0;
      this.interviews = {};
      this.timesPerDay = [];
      this.interviewsPerDaySchedule = [];
      this.changed = false;
      this.dates = [];
    },
    getInterviewData(input) {
      if (this.interviewYear)
        this.$axios.get(`/meet/${this.interviewYear}`).then((response) => {
          let interview = response.data.interview;
          let meets = response.data.meets;
          if (input != "calender") {
            this.startTime.hour = interview.starttime.split(":")[0];
            this.startTime.minute = interview.starttime.split(":")[1];
            this.endTime.hour = interview.endtime.split(":")[0];
            this.endTime.minute = interview.endtime.split(":")[1];
            this.dates = interview.dates;
            this.interviewLength = interview.interviewlength;
            this.rest = interview.rest;
            this.gapStart.hour = interview.gapstart.split(":")[0];
            this.gapStart.minute = interview.gapstart.split(":")[1];
            this.gapEnd.hour = interview.gapend.split(":")[0];
            this.gapEnd.minute = interview.gapend.split(":")[1];
            this.int;
          }
          this.interviews = meets;
          this.scheduledInterviewNum =
            meets[Object.keys(meets)[0]].filter((el) => el.type == "interview")
              .length * Object.keys(meets).length;
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
    createInterviewTime(start, end) {
      this.interviewLength = Number(this.interviewLength);
      this.rest = Number(this.rest);
      let interviews = [];
      let ans = Math.floor(
        (end.hour * 60 +
          end.minute -
          (start.hour * 60 + start.minute) +
          this.rest) /
          (this.interviewLength + this.rest)
      );
      for (let index = 0; index < ans; index++) {
        let s = this.addMinute(
          start,
          index * this.rest + index * this.interviewLength
        );
        let end = this.addMinute(s, this.interviewLength);
        interviews.push({
          start: s,
          end: end,
          type: "interview",
        });
        if (this.rest > 0 && index != ans - 1) {
          interviews.push({
            start: end,
            end: this.addMinute(end, this.rest),
            type: "rest",
          });
        }
      }
      return interviews;
    },
    addMinute(first, minute) {
      let minuteAdded = first.minute + minute;
      let hourAdded = Math.floor(minuteAdded / 60);
      return {
        hour: hourAdded + first.hour,
        minute: minuteAdded - hourAdded * 60,
      };
    },
    refresh(input) {
      if (input == "calender") {
        this.getInterviewData("calender");
      } else {
        this.getInterviewData();
        this.getSudentsData();
        this.changed = false;
      }
    },
    schedule() {
      console.log(document.getElementsByClassName("error-icon"));
      if (document.getElementsByClassName("error-icon").length > 0) {
        this.hasError = true;
        return;
      }
      this.hasError = false;
      this.changed = true;
      this.startTime = {
        hour: Number(this.startTime.hour),
        minute: Number(this.startTime.minute),
      };
      this.gapStart = {
        hour: Number(this.gapStart.hour),
        minute: Number(this.gapStart.minute),
      };
      this.gapEnd = {
        hour: Number(this.gapEnd.hour),
        minute: Number(this.gapEnd.minute),
      };
      this.endTime = {
        hour: Number(this.endTime.hour),
        minute: Number(this.endTime.minute),
      };
      let beforeGap = this.createInterviewTime(this.startTime, this.gapStart);
      let afterGap = this.createInterviewTime(this.gapEnd, this.endTime);
      let gap = {
        start: this.gapStart,
        end: this.gapEnd,
        type: "gap",
      };
      this.interviewsPerDaySchedule = beforeGap.concat(gap).concat(afterGap);
      this.scheduledInterviewNum =
        this.dates.length *
        this.interviewsPerDaySchedule.filter((el) => el.type == "interview")
          .length;
    },
    openCalender() {
      this.showCalender = true;
      if (this.changed) {
        this.interviews = {};
        let stIndex = 0;
        for (let index0 = 0; index0 < this.dates.length; index0++) {
          const element = this.dates[index0];
          this.interviews[element] = [];
          for (
            let index = 0;
            index < this.interviewsPerDaySchedule.length;
            index++
          ) {
            const inter = this.interviewsPerDaySchedule[index];
            this.interviews[element].push({
              ...inter,
              student:
                inter.type == "interview" ? this.students[stIndex] : null,
              id: index + index0 * this.interviewsPerDaySchedule.length,
            });
            if (inter.type == "interview") stIndex++;
          }
        }
      }
    },
    fieldChanged() {
      this.changed = true;
      this.hasError = false;
    },
    saveCalender() {
      let interviewData = {
        interviewyear: this.interviewYear,
        dates: this.dates,
        interviewlength: this.interviewLength,
        rest: this.rest,
        starttime: `${this.startTime.hour}:${this.startTime.minute}`,
        endtime: `${this.endTime.hour}:${this.endTime.minute}`,
        gapstart: `${this.gapStart.hour}:${this.gapStart.minute}`,
        gapend: `${this.gapEnd.hour}:${this.gapEnd.minute}`,
      };
      let meets = [];
      for (const date in this.interviews) {
        if (Object.hasOwnProperty.call(this.interviews, date)) {
          const day = this.interviews[date];
          for (let index = 0; index < day.length; index++) {
            const element = day[index];
            let meet = {
              type: element.type,
              interviewyear: this.interviewYear,
              docnumber: element.student ? element.student.docnumber : null,
              date: `${date}`,
              startTime: `${element.start.hour}:${element.start.minute}`,
              endTime: `${element.end.hour}:${element.end.minute}`,
            };
            meets.push(meet);
          }
        }
      }
      let data = {
        interview: interviewData,
        meets: meets,
      };
      this.$axios
        .post("/meet", data)
        .then(() => {
          toast(".زمانبندی با موفقیت ذخیره شد", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_LEFT,
            type: "success",
          });
        })
        .catch(() => {
          toast("!خطا در ذخبره زمانبندی", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_LEFT,
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$page-height: 209mm;
$page-width: 297mm;
.scheduling {
  overflow-x: auto;
  position: relative;
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
    &-save-button {
      margin-bottom: 20px;
    }
  }
  &__error-text {
    color: red;
    font-size: fontSize("s");
    margin-top: -20px;
  }
  &-bold {
    font-weight: bold;
  }
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
  &__back {
    font-size: 38px;
    margin: 10px 8px;
    &:last-child {
      margin-left: 60px;
      font-size: 34px;
    }
    &:hover {
      text-shadow: var(--highlight-color) 1px 1px 2px;
    }
    cursor: pointer;
  }
  &__refresh {
    position: absolute;
    left: 0;
    cursor: pointer;
    font-size: 38px;
    &:hover {
      text-shadow: var(--highlight-color) 1px 1px 2px;
    }
  }
}
.report {
  width: $page-width;
  height: $page-height;
  padding: 25px 25px;
  font-size: 12px;
  direction: rtl;
  &__table {
    width: 95%;
    &-header {
      background-color: rgb(75, 74, 77) !important;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      color: white;
      font-size: 14px;
      height: 50px !important;
      &--color {
        background-color: rgb(75, 74, 77) !important;
      }
    }
    &__width {
      &-150 {
        width: 120px;
        border-left: solid 1px black;
        &:last-child {
          border-left: none;
        }
      }
      &-10 {
        width: 20px;
        background-color: rgb(180, 180, 180);
        border-left: solid 1px black;
      }
      &-20 {
        width: 110px;
        background-color: rgb(180, 180, 180);
        border-left: solid 1px black;
      }
    }
    &-row {
      padding: 0;
      height: 70px;
      border-bottom: solid 0.1px rgb(89, 89, 89);
      border-right: solid 0.5px black;
      border-left: solid 0.5px black;
      &:first-child {
        border-top: solid 1px black;
        border-bottom: solid 0.1px rgb(89, 89, 89);
      }
    }
  }
  &__title {
    &--first {
      font-size: fontSize("lg");
      font-weight: bold;
      margin-bottom: 10px;
    }
    &--seconde {
      font-size: fontSize("lg");
      font-weight: 500;
      margin-bottom: 30px;
    }
  }
  &__logo {
    position: absolute;
    top: 20px;
    right: 45px;
  }
  &__buttons {
    & > button {
      margin-right: 20px;
    }
  }
}
</style>
