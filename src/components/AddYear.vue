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
        <div class="i-flex i-flex-align-center" style="flex: 1"></div>
        <div class="i-flex i-flex-align-center" style="flex: 4">سال</div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          تعداد متقاضیان
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          مصاحبه شده ها
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          تعداد قبولی ها
        </div>
      </div>
      <div
        class="addYear__table__row i-flex"
        v-for="(row, index) in yearData"
        :key="index"
      >
        <div class="i-flex i-flex-align-center" style="flex: 1">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.year }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.requests }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.interviewed }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.accepts }}
        </div>
      </div>
    </div>
  </div>
  <modal-window v-if="uploadForm" @esc="uploadForm = false">
    <div class="upload i-flex-column">
      <div class="i-flex i-flex-justify-between upload__header">
        <span class="upload__header-title">اضافه کردن سال تحصیلی جدید</span>
        <img
          class="upload__header-close"
          src="../assets/images/close.svg"
          alt=""
          @click="uploadForm = false"
        />
      </div>
      <div class="i-flex-column i-flex-align-center upload__content">
        <div class="i-flex">
          <field-text-input theme="light" class="upload__input" label="نام" />
          <label
            class="upload__button i-flex i-flex-justify-center"
            for="file-input"
          >
            <img
              class="upload__button__icon"
              src="../assets/images/upload.svg"
              alt=""
            />
          </label>
        </div>
        <div class="upload__name i-flex">
          <span>فایل آپلود شده :</span>
          <span>{{ fileName }}</span>
        </div>
        <div class="upload__name i-flex">
          <span>تعداد متقاضیان :</span>
          <span>{{ sheetData.length }}</span>
        </div>
      </div>
      <input
        type="file"
        id="file-input"
        name="file-input"
        @change="getExcel"
        hidden
      />
      <div class="upload__buttons i-flex i-flex-justify-between">
        <Button
          label="تایید"
          theme="light"
          :size="{ width: 120, height: 40 }"
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
      yearData: [
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
      ],
      uploadForm: false,
      fileName: "",
      sheetData: [],
    };
  },
  methods: {
    cancel() {
      this.uploadForm = false;
      this.fileName = "";
      this.sheetDate = [];
    },
    getExcel(event) {
      if (event.target.files) {
        this.file = event.target.files[0];
        this.fileName = this.file.name;
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
          this.sheetData = [];
          for (let index = 0; index < arraylist.length; index++) {
            const element = arraylist[index];
            this.sheetData.push({
              docNumber: element["شماره داوطلبي سنجش"],
              feilds: element["گرايش (هاي) انتخابي"].split("-"),
              lastName: element["نام خانوادگي"],
              name: element["نام"],
              gender: element["جنسیت"],
              fatherName: element["نام پدر"],
              talent: element["استعداد درخشان"] == "خیر" ? false : true,
              birthdate: element["تاريخ تولد"],
              bachelorUni: element["دانشگاه محل اخذ مدرك كارشناسي"],
              masterUni: element["دانشگاه محل اخذ مدرك كارشناسي ارشد"],
              fmasterUni: element["رشته تحصيلي كارشناسي ارشد"],
              thesisTitle: element["عنوان پايان نامه كارشناسي ارشد"],
              masterSupervisorName:
                element["نام استاد راهنما كارشناسي ارشد"].split("،"),
              diplomaGrade: element["معدل ديپلم"],
              writtenDiplomaGrade: element["معدل كتبي ديپلم"],
              bachelorGrade: element["معدل دوره كارشناسي"],
              masterGradeWithThesss: element["معدل با احتساب پايان نامه ارشد"],
              bachelorDate: element["تاريخ اخذ مدرك كاررشناسي"],
              masterDate: element["تاريخ اخذ مدرك ارشد"],
              employmentStatus: element["وضعيت شغلي"],
              quota: element["استفاده از سهميه"],
              phoneNumber: element["تلفن همراه"],
              email: element["پست الكترونيكي"],
              address: element["آدرس"],
              evNumber: element["شماره داوطلبي سنجش"],
            });
          }
        };
      }
    },
    submit() {
      this.uploadForm = false;
    },
    triggerFileInput() {
      document.getElementById("file-input").trigger("click");
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
        text-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
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
.upload {
  min-width: 600px;
  min-height: 400px;
  color: var(--on-color-3);
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
    margin: 40px;
  }
  &__input {
    width: 250px;
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
  }
  &__name {
    margin-top: 20px;
    align-self: flex-start;
    margin-right: 96px;
    & > span:first-child {
      margin-left: 10px;
    }
  }
  &__buttons {
    margin: 0 25%;
  }
}
</style>
