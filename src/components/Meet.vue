<template>
  <div class="meet i-flex-column" v-if="!showDetails">
    <div class="i-flex i-flex-justify-between">
      <div class="meet__field i-flex">
        <span class="meet__label"> نام و نام خانوادگی: </span>
        <span class="meet__value">
          {{ student.studentname }} {{ student.lastname }}
        </span>
      </div>
      <div class="meet__field i-flex">
        <span class="meet__label"> شماره پرونده: </span>
        <span class="meet__value">
          {{ student.docnumber }}
        </span>
      </div>
    </div>
    <div class="meet__field">
      <div class="meet__more" @click="moreDetails">اطلاعات بیشتر ...</div>
    </div>
    <div class="meet__field i-flex-column">
      <span class="meet__label i-flex i-flex-align-center">
        موضوعات موردعلاقه در دکترا:
      </span>
      <div class="meet__input">
        <field-text-input theme="light" v-model="favphdfields" />
      </div>
    </div>
    <div class="meet__field i-flex-column">
      <span class="meet__label i-flex i-flex-align-center">
        برداشت اولیه:
      </span>
      <div class="meet__text-area">
        <field-text-area-input
          height="60"
          theme="light"
          v-model="firstimpression"
        />
      </div>
    </div>
    <div class="meet__field i-flex-column">
      <span class="meet__label i-flex i-flex-align-center"> توضیحات: </span>
      <div class="meet__text-area">
        <field-text-area-input height="100" theme="light" v-model="opinion" />
      </div>
    </div>

    <span class="meet__label meet__table--label" v-if="comments.length">
      نظرات ثبت شده:
    </span>
    <div class="meet__table i-flex-column" v-if="comments.length">
      <div class="meet__table__row meet__table__row--header i-flex">
        <div class="i-flex i-flex-align-center" style="flex: 1"></div>
        <div class="i-flex i-flex-align-center" style="flex: 4">نام استاد</div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          برداشت اولیه
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 6">
          موضوعات موردعلاقه دکترا
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 7">توضیحات</div>
      </div>
      <div
        class="meet__table__row i-flex"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div class="i-flex i-flex-align-center" style="flex: 1">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ `${comment.user_id}`.substring(0, 20) }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          <span v-b-tooltip.hover :title="comment.firstimpression">
            {{ `${comment.firstimpression}`.substring(0, 16)
            }}<span v-if="comment.firstimpression?.length > 16">...</span>
          </span>
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 6">
          <span v-b-tooltip.hover :title="comment.favphdfields">
            {{ `${comment.favphdfields}`.substring(0, 25)
            }}<span v-if="comment.favphdfields?.length > 25">...</span>
          </span>
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 7">
          <span v-b-tooltip.hover :title="comment.opinion">
            {{ `${comment.opinion}`.substring(0, 30)
            }}<span v-if="comment.favphdfields?.length > 30">...</span>
          </span>
        </div>
      </div>
    </div>
    <div class="meet__buttons i-flex i-flex-justify-between">
      <Button
        label="تایید"
        theme="light"
        :size="{ width: 120, height: 40 }"
        @i-click="submitComment"
      />
      <Button
        action="secondary"
        theme="light"
        label="انصراف"
        :size="{ width: 120, height: 40 }"
        @i-click="$emit('close')"
      />
    </div>
  </div>
  <div class="meet i-flex-column" v-else>
    <div class="meet__back justify-content-end i-flex">
      <BackIcon
        edit-icon
        class="i-flex meet__back--icon"
        theme="light"
        @click="showDetails = false"
      />
    </div>
    <div class="i-flex meet__detail">
      <div v-for="prop in Object.keys(titles)" :key="prop">
        <div class="meet__detail-item i-flex-column">
          <span>{{ titles[prop] }}</span>
          <span>{{ student[prop] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fieldTextInput from "./FieldTextInput";
import fieldTextAreaInput from "./FieldTextAreaInput";
import Button from "./FormButton";
import BackIcon from "./icons/BackIcon";
export default {
  components: { fieldTextInput, fieldTextAreaInput, Button, BackIcon },
  data() {
    return {
      student: {},
      showDetails: false,
      titles: {
        docnumber: "شماره پرونده داوطلب",
        chosenfields: "گرايش (هاي) انتخابي",
        gender: "جنسيت",
        studentname: "نام",
        lastname: "نام خانوادگي",
        fathername: "نام پدر",
        birthdate: "تاریخ تولد",
        masterfield: "رشته تحصيلي كارشناسي ارشد",
        masteruni: "دانشگاه محل اخذ مدرك كارشناسي ارشد",
        gradewiththesis: "معدل با احتساب پايان نامه ارشد",
        thesistitle: "عنوان پايان نامه كارشناسي ارشد",
        mastersupervisorname: "نام استاد راهنما كارشناسي ارشد",
        masterdate: "تاريخ اخذ مدرك ارشد",
        bachelorfield: "رشته تحصيلي كارشناسي",
        bacheloruni: "دانشگاه محل اخذ مدرك كارشناسي",
        bachelorgrade: "معدل دوره كارشناسي",
        bachelordate: "تاريخ اخذ مدرك كاررشناسي",
        writtendiplomagrade: "معدل كتبي ديپلم",
        diplomagrade: "معدل ديپلم",
        employmentstatus: "وضعيت شغلي",
        talent: "استعداد درخشان",
        quota: "استفاده از سهميه",
        phonenumber: "تلفن همراه",
        evnumber: "شماره داوطلبي سنجش",
        homenumber: "تلفن منزل",
        homeaddress: "آدرس",
        email: "پست الكترونيكي",
      },
      firstimpression: "",
      opinion: "",
      favphdfields: "",
      comments: [],
    };
  },
  props: {
    docnumber: {
      type: Number,
    },
  },
  created() {
    // this.user_id = Math.ceil(Math.random() * 5);
    this.user_id = 1;
    if (this.docnumber) {
      this.$axios.get(`/student/${this.docnumber}`).then((response) => {
        this.student = response.data;
      });
      this.$axios.get(`comment/${this.docnumber}`).then((res) => {
        this.comments = res.data.filter((el) => el.user_id != this.user_id);
        let userComment = res.data.find((el) => el.user_id == this.user_id);
        if (userComment) {
          this.firstimpression = userComment.firstimpression;
          this.opinion = userComment.opinion;
          this.favphdfields = userComment.favphdfields;
        }
      });
    }
  },
  methods: {
    moreDetails() {
      this.showDetails = true;
    },
    submitComment() {
      this.$axios.post("/comment", {
        firstimpression: this.firstimpression,
        opinion: this.opinion,
        favphdfields: this.favphdfields,
        user_id: this.user_id,
        docnumber: this.docnumber,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.meet {
  padding: 32px 32px;
  min-width: 825px;
  min-height: 500px;
  max-height: 90vh;
  overflow: hidden auto;
  position: relative;
  & > div:first-child {
    margin-left: 50px;
    & > div:first-child {
      margin-left: 110px;
    }
  }
  &__label {
    margin-left: 24px;
    font-size: fontSize("lg");
    font-weight: 500;
    color: var(--on-color-3);
  }
  &__value {
    font-size: fontSize("lg");
    color: var(--on-color-3);
  }
  &__field {
    margin-bottom: 32px;
  }
  &__more {
    font-weight: 500;
    cursor: pointer;
    color: var(--on-color-3);
    &:hover {
      font-weight: bold;
    }
  }
  &__input {
    width: 420px;
    margin-top: 24px;
  }
  &__text-area {
    width: 500px;
    margin-top: 24px;
  }
  &__buttons {
    margin: 0 25%;
    margin-top: 32px;
  }
  &__back {
    margin-left: 0 !important;
    position: absolute;
    left: 16px;
    top: 16px;
    &--icon {
      cursor: pointer;
      width: 40px;
    }
  }
  &__detail {
    overflow: hidden auto;
    flex-flow: row wrap;
    margin: 0 !important;
    &-item {
      height: 50px;
      border-right: solid 2px var(--highlight-light-color);
      min-width: 190px;
      margin: 0 0 32px 15px;
      padding-right: 10px;
      color: var(--on-color-3);
      & > span:last-child {
        font-size: fontSize("m");
        max-width: 350px;
      }
      & > span:first-child {
        font-weight: 700;
        font-size: fontSize("l");
      }
    }
  }
  &__table {
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-collapse: collapse;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 8px;
    &--label {
      margin-top: 32px;
    }
    &__row {
      span {
        color: var(--color-3);
      }
      padding: 0 12px;
      background-color: var(--color-2);
      &--header {
        border-top: solid 1px var(--on-color-3);
        background-color: var(--color-3);
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        color: var(--on-color-3);
        padding: 0 12px;
        font-size: 16px;
      }
      height: 50px;
      border-bottom: 1px solid var(--color-2);
      &:last-child {
        border-bottom: 2px solid var(--on-color-3);
      }
      &:nth-of-type(even) {
        background-color: var(--color-1);
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
}
</style>
