<template>
  <div class="i-flex-1 i-flex-column i-flex-justify-center addYear">
    <div class="i-flex addYear__add" @click="uploadForm = true">
      <img
        class="i-flex addYear__add__icon"
        src="../assets/images/add.svg"
        alt=""
      />

      <span class="i-flex addYear__add-text"
        >اضافه کردن سال جدید جهت مصاحبه</span
      >
    </div>
    <div class="addYear__table i-flex-column">
      <div class="addYear__table__row addYear__table__row--header i-flex">
        <div class="i-flex i-flex-align-center" style="flex: 2"></div>
        <div class="i-flex i-flex-align-center" style="flex: 5">سال</div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          تعداد متقاضیان
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          مصاحبه شده ها
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          تعداد قبولی ها
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 1"></div>
      </div>
      <div
        class="addYear__table__row i-flex"
        v-for="(row, index) in yearData"
        :key="index"
      >
        <div class="i-flex i-flex-align-center" style="flex: 2">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 5">
          {{ row.interview_year }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.students_number }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.interviewed }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.accepts }}
        </div>
        <div
          class="i-flex i-flex-align-center i-flex-justify-between"
          style="flex: 1"
        >
          <img
            class="addYear__table-icon"
            src="../assets/images/delete.svg"
            alt=""
            @click="selectDelete(row.year)"
          />
          <img
            class="addYear__table-icon"
            src="../assets/images/edit.svg"
            alt=""
            @click="editUploaded(row)"
          />
        </div>
      </div>
    </div>
  </div>
  <modal-window v-if="uploadForm" @esc="cancel" title="اضافه کردن مصاحبه جدید">
    <div class="upload-form i-flex-column i-flex-justify-between">
      <div class="i-flex-column i-flex-align-center upload-form__content">
        <field-text-input
          theme="light"
          class="upload-form__input"
          label="سال"
          v-model="newYearName"
        />
        <div class="upload-form__name i-flex i-flex-justify-between">
          <div>
            <span>کنکور:</span>
            <span>{{ filesName["konkur"] }}</span>
          </div>
          <div class="i-flex">
            <label
              class="upload-form__button upload-form__button-delete i-flex i-flex-justify-center"
              v-if="filesName['konkur']"
            >
              <img
                class="upload-form__button-delete-icon"
                src="../assets/images/delete.svg"
                alt=""
                @click="deleteUploaded('konkur')"
              />
            </label>
            <label
              class="upload-form__button i-flex i-flex-justify-center"
              for="file-input"
            >
              <img
                class="upload-form__button__icon"
                src="../assets/images/upload.svg"
                alt=""
              />
            </label>
          </div>
        </div>
        <div class="upload-form__name i-flex i-flex-justify-between">
          <div>
            <span>استعداد درخشان:</span> <span>{{ filesName["talent"] }}</span>
          </div>
          <div class="i-flex">
            <label
              class="upload-form__button upload-form__button-delete i-flex i-flex-justify-center"
              v-if="filesName['talent']"
            >
              <img
                class="upload-form__button-delete-icon"
                src="../assets/images/delete.svg"
                alt=""
                @click="deleteUploaded('talent')"
              />
            </label>
            <label
              class="upload-form__button i-flex i-flex-justify-center"
              for="file-input2"
            >
              <img
                class="upload-form__button__icon"
                src="../assets/images/upload.svg"
                alt=""
              />
            </label>
          </div>
        </div>
        <div class="upload-form__name i-flex">
          <span>تعداد متقاضیان :</span>
          <span>{{ studentsNumber }}</span>
        </div>
      </div>
      <input
        type="file"
        id="file-input"
        name="file-input"
        @change="getExcel($event, 'konkur')"
        hidden
      />
      <input
        type="file"
        id="file-input2"
        name="file-input2"
        @change="getExcel($event, 'talent')"
        hidden
      />
      <div class="upload-form__buttons i-flex i-flex-justify-between">
        <Button
          label="تایید"
          theme="light"
          :size="{ width: 120, height: 40 }"
          @click="addInterview"
        />
        <Button
          action="secondary"
          theme="light"
          label="انصراف"
          :size="{ width: 120, height: 40 }"
          @click="cancel"
        />
      </div>
    </div>
  </modal-window>
  <modal-window v-if="deleteModal" @esc="deleteModal = false" title="تایید حذف">
    <div class="delete-form i-flex-column i-flex-justify-between">
      <span>آیا از حذف اطلاعات مصاحبه {{ selected }} اطمینان دارید؟</span>
      <div class="delete-form__buttons i-flex i-flex-justify-between">
        <Button
          label="تایید"
          theme="light"
          :size="{ width: 120, height: 40 }"
          @click="confirmDelete"
        />
        <Button
          action="secondary"
          theme="light"
          label="انصراف"
          :size="{ width: 120, height: 40 }"
          @click="cancelDelete"
        />
      </div>
    </div>
  </modal-window>
</template>

<script>
import Button from "./FormButton";
import FieldTextInput from "./FieldTextInput";
import ModalWindow from "./ModalWindow";
import * as XLSX from "xlsx";
export default {
  components: { Button, FieldTextInput, ModalWindow },
  data() {
    return {
      yearData: [],
      uploadForm: false,
      deleteModal: false,
      filesName: {
        konkur: "",
        talent: "",
      },
      sheetData: {
        konkur: [],
        talent: [],
      },
      selected: "",
      newYearName: "",
    };
  },
  created() {
    this.$axios.get("/interview").then((result) => {
      this.yearData = result.data;
      console.log(result.data);
    });
  },
  computed: {
    studentsNumber() {
      let number = 0;
      if (this.sheetData["konkur"]) {
        number += this.sheetData["konkur"].length;
      }
      if (this.sheetData["talent"]) {
        number += this.sheetData["talent"].length;
      }
      return number;
    },
  },
  methods: {
    addInterview() {
      let body = {
        students: this.sheetData["konkur"].concat(this.sheetData["talent"]),
        year: this.newYearName,
      };
      this.$axios.post("/student", body);
      this.uploadForm = false;
      // this.cancel();
    },
    cancel() {
      this.uploadForm = false;
      this.filesName["konkur"] = null;
      this.filesName["talent"] = null;
      this.sheetData["konkur"] = [];
      this.sheetData["talent"] = [];
    },
    getExcel(event, name) {
      if (event.target.files) {
        this.file = event.target.files[0];
        this.filesName[name] = this.file.name;
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.file);
        fileReader.onload = () => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for (var i = 0; i != data.length; ++i)
            arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, { type: "binary" });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          this.sheetData[name] = [];
          for (let index = 0; index < arraylist.length; index++) {
            const element = arraylist[index];
            console.log(element["دين"]);
            let newEl = {
              docNumber: element["شماره پرونده داوطلب"],
              condidateNumber: element["شماره داوطلب"],
              examYear: element["سال آزمون"],
              field: element["مجموعه رشته"],
              chosenfields: element["گرايش (هاي) انتخابي"],
              fieldGroup: element["گروه"],
              lastName: element["نام خانوادگي"],
              sudentName: element["نام"],
              fatherName: element["نام پدر"],
              gender: element["جنسيت"],
              birthdate: element["تاريخ تولد"],
              idNumber: element["شماره شناسنامه"],
              birthCer: element["سری و سريال شناسنامه"],
              nId: element["كد ملي"],
              unic: element["یکتا"],
              religion: element["دين"],
              dutyState: element["وضعيت نظام وظيفه"],
              birthCity: element["شهر محل تولد"],
              city: element["شهر محل سكونت"],
              cityCer: element["شهر محل صدور شناسنامه"],
              bachUniType: element["نوع دانشگاه كارشناسي"],
              bachelorUni: element["دانشگاه محل اخذ مدرك كارشناسي"],
              bachelorField: element["رشته تحصيلي كارشناسي"],
              masterUni: element["دانشگاه محل اخذ مدرك كارشناسي ارشد"],
              masterField: element["رشته تحصيلي كارشناسي ارشد"],
              thesisTitle: element["عنوان پايان نامه كارشناسي ارشد"],
              masterSupervisorName: element["نام استاد راهنما كارشناسي ارشد"],
              diplomaGrade: element["معدل ديپلم"],
              writtenDiplomaGrade: element["معدل كتبي ديپلم"],
              bachelorGrade: element["معدل دوره كارشناسي"],
              sixthSemGrade: element["معدل تا پايان نيمسال ششم"],
              seventhSemGrade: element["معدل تا پايان نيمسال هفتم"],
              gradeWithoutThesis: element["معدل بدون پايان نامه ارشد"],
              gradeWithThesss: element["معدل با احتساب پايان نامه ارشد"],
              masterGrade: element["معدل كارشناسي ارشد يا دكتري حرفه اي"],
              bachelorDate: element["تاريخ اخذ مدرك كاررشناسي"],
              masterDate: element["تاريخ اخذ مدرك ارشد"],
              employmentStatus: element["وضعيت شغلي"],
              audYear: element["سال"],
              audMonth: element["ماه"],
              quota: element["استفاده از سهميه"],
              homeNumber: element["تلفن منزل"],
              emergencyNumber: element["تلفن ضروري"],
              phoneNumber: element["تلفن همراه"],
              email: element["پست الكترونيكي"],
              homeAddress: element["آدرس"],
              paid: element["مبلغ پرداختي (تاييد شده)"],
              evNumber: element["شماره داوطلبي سنجش"],
              imageSent: element["ارسال عكس"],
              completeDoc: element["ارسال عكس"],
              sacrifise: element["حائز شرايط ايثارگري طبق اظهار دانشجو"],
              ahadiPrize: element["متقاضي جايزه شهيد احدي"],
              talent: name == "talent" ? true : false,
            };
            for (const key in newEl) {
              if (Object.hasOwnProperty.call(newEl, key)) {
                const val = newEl[key];
                if (!val) {
                  newEl[key] = null;
                }
              }
            }
            this.sheetData[name].push(newEl);
          }
        };
      }
    },
    selectDelete(name) {
      this.selected = name;
      this.deleteModal = true;
    },

    cancelDelete() {
      this.deleteModal = false;
      this.selected = null;
    },
    confirmDelete() {
      this.cancelDelete();
    },
    deleteUploaded(name) {
      this.filesName[name] = null;
      this.sheetData[name] = [];
    },
    editUploaded(year) {
      this.uploadForm = true;
      this.filesName["konkur"] = year.konkur;
      this.filesName["talent"] = year.talent;
    },
  },
};
</script>

<style lang="scss" scoped>
.addYear {
  padding: 100px;

  &__table {
    width: 90%;
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
      height: 50px;
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
  &__add {
    align-self: flex-start;
    margin-bottom: 16px;
    cursor: pointer;
    &:hover {
      text-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
    }
    &__icon {
      margin-left: 16px;
      width: 25px;
    }
    &-text {
      font-size: 18px;
    }
  }
}
.upload-form {
  min-width: 600px;
  min-height: 370px;
  color: var(--on-color-3);
  margin: 40px;
  &__header {
    padding: 16px 24px 16px 24px;
    border-bottom: 1px solid var(--on-color-3);
    &-title {
      font-size: 20px;
    }
    &-close {
      width: 10px;
      cursor: pointer;
    }
  }
  &__content {
    padding: 10px;
  }
  &__input {
    width: 70%;
  }
  &__button {
    align-self: flex-end;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: var(--on-color-3);
    margin-right: 16px;
    cursor: pointer;
    &__icon {
      width: 26px;
    }
    &:hover {
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
    &:focus {
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
    &-delete {
      width: 30px;
      height: 30px;
      &-icon {
        width: 20px;
      }
    }
  }
  &__name {
    width: 70%;
    margin-top: 32px;
    & span:first-child {
      margin-left: 15px;
    }
  }
  &__buttons {
    margin: 0 25%;
  }
}
.delete-form {
  min-width: 500px;
  min-height: 200px;
  padding: 32px;
  & > span {
    font-size: 20px;
    color: var(--on-color-3);
  }
  &__buttons {
    margin: 0 15%;
  }
}
</style>
