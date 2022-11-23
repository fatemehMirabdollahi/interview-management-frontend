<template>
  <div class="meet i-flex-column" v-if="!showDetails">
    <div class="i-flex i-flex-justify-between">
      <div class="meet__field i-flex">
        <span class="meet__lable"> نام و نام خانوادگی: </span>
        <span class="meet__value">
          {{ student.studentname }} {{ student.lastname }}
        </span>
      </div>
      <div class="meet__field i-flex">
        <span class="meet__lable"> شماره پرونده: </span>
        <span class="meet__value">
          {{ student.docnumber }}
        </span>
      </div>
    </div>
    <div class="meet__field">
      <div class="meet__more" @click="moreDetails">اطلاعات بیشتر ...</div>
    </div>
    <div class="meet__field i-flex-column">
      <span class="meet__lable i-flex i-flex-align-center">
        موضوعات موردعلاقه در دکتری:
      </span>
      <div class="meet__input">
        <field-text-input theme="light" v-model="favphdfields" />
      </div>
    </div>
    <div class="meet__field i-flex-column">
      <span class="meet__lable i-flex i-flex-align-center">
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
      <span class="meet__lable i-flex i-flex-align-center"> توضیحات: </span>
      <div class="meet__text-area">
        <field-text-area-input height="100" theme="light" v-model="opinion" />
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
    this.user_id = 2;
    if (this.docnumber) {
      this.$axios.get(`/student/${this.docnumber}`).then((response) => {
        this.student = response.data;
      });
      this.$axios.get(`comment/${this.docnumber}`).then((res) => {
        this.comments = res.data;
        let userComment = this.comments.find(
          (el) => el.user_id == this.user_id
        );

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
      this.$axios
        .post("/comment", {
          firstimpression: this.firstimpression,
          opinion: this.opinion,
          favphdfields: this.favphdfields,
          user_id: this.user_id,
          docnumber: this.docnumber,
        })
        .then(() => {
          this.$emit("close");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.meet {
  padding: 32px 32px;
  max-width: 1000px;
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
  &__lable {
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
}
</style>
