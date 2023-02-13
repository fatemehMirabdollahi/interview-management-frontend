<template>
  <div class="i-flex i-flex-column i-flex-align-center user-setting">
    <div
      class="i-felx i-flex-column i-flex-justify-center i-flex-align-center user-setting__container"
    >
      <div class="i-flex user-setting__header" style="position: absolute">
        <i class="i-flex i-flex-align-center bi bi-person-gear" />
        <span>ویرایش پروفایل</span>
      </div>
      <div class="i-flex i-flex-column" style="width: 50%">
        <div class="i-flex user-setting__input">
          <field-text-input
            v-model="name"
            label="نام و نام خانوادگی"
            :rules="['required', 'maxLength:30']"
          />
        </div>
        <div class="i-flex user-setting__input">
          <field-text-input
            v-model="username"
            label="نام کاربری"
            :rules="['required', 'maxLength:20']"
          />
        </div>
        <span
          data-bs-toggle="collapse"
          href="#passChange"
          aria-expanded="false"
          aria-controls="passChange"
          class="user-setting__pass-label"
          @click="isCol = !isCol"
          ><i class="bi bi-pencil-fill" />تغییر رمز عبور
        </span>
        <div class="collapse multi-collapse" id="passChange">
          <div class="i-flex user-setting__input">
            <field-text-input
              :rules="['required']"
              v-model="oldPass"
              label="رمز عبور کنونی"
            />
          </div>
          <div class="i-flex user-setting__input">
            <field-text-input
              v-model="newPass"
              id="password"
              type="password"
              label="رمز عبور جدید"
              :rules="['required', 'passwordCheck']"
              @change="newPassConf = ''"
            />
          </div>
          <div class="i-flex user-setting__input">
            <field-text-input
              type="password"
              v-model="newPassConf"
              label="تکرار رمز عبور جدید"
              :rules="['required', `confirmPass`]"
            />
          </div>
        </div>
        <Button
          theme="dark"
          label="تایید"
          :size="{ width: 120, height: 40 }"
          @click="confirmEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FieldTextInput from "./FieldTextInput";
import Button from "./FormButton";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  components: {
    FieldTextInput,
    Button,
  },
  data() {
    return {
      name: "",
      username: "",
      isCol: true,
      oldPass: "",
      newPass: "",
      newPassConf: "",
    };
  },
  computed: {
    proName() {
      return this.$store.state.proName;
    },
  },
  watch: {
    proName(proname) {
      console.log(proname);
      this.name = proname;
    },
  },
  created() {
    this.username = this.$store.state.username;
    this.name = this.$store.state.proName;
  },
  methods: {
    confirmEdit() {
      if (this.username && this.name) {
        if (
          this.isCol ||
          (this.oldPass &&
            this.newPass &&
            this.newPassConf &&
            this.newPass == this.newPassConf &&
            !document.getElementsByClassName("error-icon").length)
        ) {
          this.$axios
            .put("/user/self", {
              oldUsername: this.$store.state.username,
              username: this.username,
              name: this.name,
              oldPass: !this.isCol ? this.oldPass : "",
              newPass: !this.isCol ? this.newPass : "",
            })
            .then((res) => {
              this.$store.commit("setName", res.data.name);
              this.$store.commit("login", res.data.username);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.username);
              toast(".تغییرات با موفقیت اعمال شد", {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_LEFT,
                type: "success",
              });
            })
            .catch(() => {
              toast("!خطا در اعمال تغییرات", {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_LEFT,
                type: "error",
              });
            });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-setting {
  height: 100%;
  &__container {
    border: 1px solid var(--color-3);
    width: 70%;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 1px var(--color-3);
    height: 100%;
    position: relative;
  }
  &__input {
    width: 100%;
    margin-bottom: 24px;
  }
  &__header {
    margin-bottom: 32px;
    font-weight: bold;
    font-size: fontSize("xxl");
    color: var(--color-3);
    top: 32px;
    right: 32px;
    border-bottom: var(--color-3) 2px solid;
    border-radius: 3px;
    padding-bottom: 8px;
    & > i {
      font-size: 32px;
      margin-left: 8px;
    }
  }
  &__pass {
    &-label {
      &:hover {
        text-shadow: var(--highlight-light-color) -2px 2px 2.6px;
      }
      width: fit-content;
      color: var(--color-3);
      cursor: pointer;
      border-bottom: var(--color-3) 2px solid;
      margin-bottom: 24px;
      padding: 0 4px;
      padding-bottom: 8px;
      & > i {
        margin-left: 8px;
      }
    }
  }
}
button {
  align-self: center;
}
</style>
