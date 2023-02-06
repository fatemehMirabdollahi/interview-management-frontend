<template>
  <div class="login__back"></div>
  <div class="login i-flex i-flex-align-center i-flex-justify-center">
    <div class="login__container i-flex">
      <div class="login__logo i-flex-column i-flex-align-center">
        <img class="login__logo-icon" src="@/assets/images/logo.png" alt="" />
        <span class="login__logo-name"> سامانه مدیریت مصاحبه دکترا </span>
      </div>
      <div class="login__form i-flex-column i-flex-align-center">
        <span class="login__form-title">ورود به سامانه</span>
        <field-text-input
          class="login__form-input"
          v-model="username"
          label="نام کاربری"
          :rules="['required']"
        />
        <field-text-input
          class="login__form-input"
          v-model="password"
          label="رمز عبور"
          type="password"
          :rules="['required']"
        />
        <form-button
          class="login__form-button"
          :size="{ width: 120, height: 40 }"
          label="ورود"
          @i-click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FieldTextInput from "@/components/FieldTextInput";
import FormButton from "@/components/FormButton";
export default {
  components: {
    FieldTextInput,
    FormButton,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      this.$axios
        .post("/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$axios.defaults.headers.common[
            "x-access-token"
          ] = `${localStorage.getItem("token")}`;
          this.$store.commit("login", res.data.username);
          localStorage.setItem("username", res.data.username);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  &__back {
    background-image: url("../assets/images/login_back.jpeg");
    background-size: 100% 100%;
    filter: blur(20px);
    -webkit-filter: blur(20px);
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: -1;
  }
  &__container {
    width: 60%;
    height: 70%;
    border-radius: 6px;
    & > div {
      width: 50%;
    }
  }
  &__logo {
    background-color: var(--color-3);
    padding: 15% 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    &-icon {
      width: 150px;
      height: 150px;
    }
    &-name {
      font-size: fontSize("xl");
      margin-top: 50px;
      color: var(--on-color-3);
    }
  }
  &__form {
    padding: 10% 0;
    background-color: var(--color-1);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    &-title {
      font-size: fontSize("xxl");
      color: var(--on-color-1);
      margin-bottom: 64px;
    }
    &-input {
      width: 55%;
      margin-bottom: 32px;
      direction: rtl;
    }
    &-button {
      margin-top: 16px;
    }
  }
}
</style>
