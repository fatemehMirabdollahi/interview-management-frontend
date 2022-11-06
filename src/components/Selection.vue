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
      <div class="i-flex i-flex-align-center selection__filter--select">
        <span>وضعیت:</span>
        <b-form-select
          :options="selectionStatus"
          v-model="selectionMode"
        ></b-form-select>
      </div>
    </div>

    <div class="selection__table i-flex-column">
      <div class="selection__table__row selection__table__row--header i-flex">
        <div class="i-flex i-flex-align-center" style="flex: 2"></div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          شماره پرونده
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">نام</div>
        <div class="i-flex i-flex-align-center" style="flex: 5">
          نام خانوادگی
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">تاریخ تولد</div>
        <div class="i-flex i-flex-align-center" style="flex: 7">کارشناسی</div>
        <div class="i-flex i-flex-align-center" style="flex: 7">
          کارشناسی ارشد
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 2">
          <b-form-checkbox
            v-if="selectionMode == 'both'"
            v-model="overallSelected"
            :disabled="!editMode"
            @change="updateChecks"
            style="cursor: pointer"
          ></b-form-checkbox>
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 1"></div>
      </div>

      <div
        class="selection__table__row i-flex"
        v-for="(row, index) in filteredStudents"
        :key="index"
      >
        <div class="i-flex i-flex-align-center" style="flex: 2">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.docnumber }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 5">
          {{ row.studentname }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 5">
          {{ row.lastname }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.birthdate }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 7">
          {{ row.bacheloruni }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 7">
          {{ row.masteruni }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 2">
          <b-form-checkbox
            style="cursor: pointer"
            v-model="row.selected"
            :disabled="!editMode"
          ></b-form-checkbox>
        </div>
        <div
          class="i-flex i-flex-align-center"
          style="flex: 1"
          @click="openDetailModal(row)"
        >
          <img
            class="selection__table-more"
            src="../assets/images/more.svg"
            alt=""
          />
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
  <modal v-if="detailModal" title="اطلاعات دانشجو" @esc="detailModal = false">
    <div class="i-flex selection__detail">
      <div v-for="prop in Object.keys(selectedStudent)" :key="prop">
        <div class="selection__detail-item i-flex-column">
          <span>{{ titles[prop] }}</span>
          <span>{{ selectedStudent[prop] }}</span>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import EditIcon from "./icons/EditIcon";
import FormButton from "./FormButton";
import Modal from "./ModalWindow";
export default {
  components: { EditIcon, FormButton, Modal },
  computed: {
    filteredStudents() {
      if (this.selectionMode == "both") return this.students;
      if (this.selectionMode == "selected") {
        return this.students.filter((el) => el.selected == true);
      }
      return this.students.filter((el) => el.selected == false);
    },
    interviewYear() {
      return this.$store.state.activeInterviewYear;
    },
    selecteds() {
      if (!this.students.length) return null;
      return this.students
        .filter((el) => el.selected)
        .map((el) => el.docnumber);
    },
  },
  watch: {
    interviewYear() {
      this.getInterviewStudents();
    },
    selecteds() {
      if (this.selecteds.length == this.students.length) {
        this.overallSelected = true;
      } else {
        this.overallSelected = false;
      }
    },
  },
  created() {
    if (this.interviewYear) {
      this.getInterviewStudents();
    }
  },
  data() {
    return {
      detailModal: false,
      selected: null,
      students: [],
      editMode: false,
      selectedStudents: [],
      overallSelected: false,
      titles: {
        docnumber: "شماره پرونده داوطلب",
        condidatenumber: "شماره داوطلب",
        examyear: "سال آزمون",
        field: "مجموعه رشته",
        chosenfields: "گرايش (هاي) انتخابي",
        fieldgroup: "گروه",
        lastname: "نام خانوادگي",
        studentname: "نام",
        fathername: "نام پدر",
        gender: "جنسيت",
        birthdate: "تاريخ تولد",
        idnumber: "شماره شناسنامه",
        birthcer: "سری و سريال شناسنامه",
        nid: "كد ملي",
        unic: "یکتا",
        religion: "دين",
        dutystate: "وضعيت نظام وظيفه",
        birthcity: "شهر محل تولد",
        city: "شهر محل سكونت",
        citycer: "شهر محل صدور شناسنامه",
        bachunitype: "نوع دانشگاه كارشناسي",
        bacheloruni: "دانشگاه محل اخذ مدرك كارشناسي",
        bachelorfield: "رشته تحصيلي كارشناسي",
        masteruni: "دانشگاه محل اخذ مدرك كارشناسي ارشد",
        masterfield: "رشته تحصيلي كارشناسي ارشد",
        thesistitle: "عنوان پايان نامه كارشناسي ارشد",
        mastersupervisorname: "نام استاد راهنما كارشناسي ارشد",
        diplomagrade: "معدل ديپلم",
        writtendiplomagrade: "معدل كتبي ديپلم",
        bachelorgrade: "معدل دوره كارشناسي",
        sixthsemgrade: "معدل تا پايان نيمسال ششم",
        seventhsemgrade: "معدل تا پايان نيمسال هفتم",
        gradewithoutthesis: "معدل بدون پايان نامه ارشد",
        gradewiththesss: "معدل با احتساب پايان نامه ارشد",
        mastergrade: "معدل كارشناسي ارشد يا دكتري حرفه اي",
        bachelordate: "تاريخ اخذ مدرك كاررشناسي",
        masterdate: "تاريخ اخذ مدرك ارشد",
        employmentstatus: "وضعيت شغلي",
        audyear: "سال",
        audmonth: "ماه",
        quota: "استفاده از سهميه",
        homenumber: "تلفن منزل",
        emergencynumber: "تلفن ضروري",
        phonenumber: "تلفن همراه",
        email: "پست الكترونيكي",
        homeaddress: "آدرس",
        paid: "مبلغ پرداختي (تاييد شده)",
        evnumber: "شماره داوطلبي سنجش",
        imagesent: "ارسال عكس",
        completedoc: "ارسال عكس",
        sacrifise: "حائز شرايط ايثارگري طبق اظهار دانشجو",
        ahadiprize: "متقاضي جايزه شهيد احدي",
        talent: "استعداد درخشان",
      },
      selectionStatus: [
        {
          value: "selected",
          text: "انتخاب شده",
        },
        {
          value: "notSelected",
          text: "انتخاب نشده",
        },
        {
          value: "both",
          text: "همه",
        },
      ],
      selectionMode: "both",
    };
  },
  methods: {
    getInterviewStudents() {
      this.$axios.get(`/interview/ ${this.interviewYear}`).then((response) => {
        this.students = response.data;
        for (let index = 0; index < this.students.length; index++) {
          const element = this.students[index];
          if (element.selected) {
            this.selectedStudents.push(element.docnumber);
          }
        }
      });
    },

    cancelEdit() {
      this.editMode = false;
      for (let index = 0; index < this.students.length; index++) {
        const element = this.students[index];
        if (this.selectedStudents.includes(element.docnumber))
          element.selected = true;
        else element.selected = false;
      }
    },
    submit() {
      let selecteds = [];
      selecteds = this.students
        .filter((el) => el.selected)
        .map((el) => el.docnumber);
      let unSelecteds = [];
      for (let index = 0; index < this.selectedStudents.length; index++) {
        const element = this.selectedStudents[index];
        if (!this.selecteds.includes(element)) {
          unSelecteds.push(element);
        }
      }
      this.$axios
        .put("/student/select", {
          selecteds: selecteds,
          unSelecteds: unSelecteds,
        })
        .then(() => {
          this.editMode = false;
        });
    },
    updateChecks() {
      for (let index = 0; index < this.students.length; index++) {
        const element = this.students[index];
        element.selected = this.overallSelected;
      }
    },
    openDetailModal(student) {
      this.selectedStudent = student;
      this.detailModal = true;
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
    &-more {
      cursor: pointer;
      width: 15px;
      &:hover {
        width: 17px;
      }
    }
  }
  &__buttons {
    width: 280px;
    margin-top: 64px;
  }
  &__detail {
    overflow: hidden auto;
    min-width: 500px;
    max-width: 1200px;
    max-height: 75vh;
    min-height: 200px;
    padding: 32px;
    flex-flow: row wrap;
    &-item {
      height: 50px;
      border-right: solid 2px var(--highlight-light-color);
      min-width: 190px;
      margin: 0 0 32px 15px;
      padding-right: 10px;
      color: var(--on-color-3);
      & > span:last-child {
        font-size: fontSize("m");
      }
      & > span:first-child {
        font-weight: 700;
        font-size: fontSize("l");
      }
    }
  }
  &__filter {
    &--select {
      margin-right: 24px;
      & > span {
        margin-left: 8px;
      }
    }
  }
}
</style>
