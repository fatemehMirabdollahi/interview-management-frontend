<template>
  <div class="i-flex home" dir="rtl">
    <div
      class="i-flex i-flex-align-center home__selection"
      v-if="
        $router.currentRoute._value.fullPath != '/AddYear' &&
        $router.currentRoute._value.fullPath != '/usermanagment' &&
        $router.currentRoute._value.fullPath != '/usersetting'
      "
    >
      <span>انتخاب سال مصاحبه:</span>
      <div class="i-flex home__selection-field">
        <b-form-select
          :options="interviewYears"
          @change="setInterviewYear"
          v-model="activeYear"
        ></b-form-select>
      </div>
    </div>
    <navbar />
    <div class="home__content i-flex-1">
      <router-view></router-view>
    </div>
  </div>
  <div class="home__user" v-click-outside="closeMenu">
    <div class="i-flex" @click="userMenu = !userMenu">
      <i
        class="i-flex i-flex-align-center home__user-icon bi bi-person-lines-fill"
      />
    </div>

    <div class="home__menu" v-if="userMenu">
      <div
        class="i-flex i-flex-justify-center home__menu-item"
        style="cursor: default"
      >
        {{ $store.state.proName }}
        <!-- it should replaced with name -->
      </div>
      <div dir="rtl" class="i-flex home__menu-item" @click="logout">
        <i
          class="i-flex i-flex-align-center bi bi-box-arrow-right home__menu-icon"
        />
        خروج
      </div>
      <div
        dir="rtl"
        class="i-flex home__menu-item"
        @click="$router.push('AddYear'), (this.userMenu = false)"
      >
        <i
          class="i-flex i-flex-align-center bi bi-folder-plus home__menu-icon"
        />
        مصاحبه جدید
      </div>
      <div
        dir="rtl"
        class="i-flex home__menu-item"
        @click="$router.push('usersetting'), (this.userMenu = false)"
      >
        <i
          class="i-flex i-flex-align-center bi bi-person-gear home__menu-icon home__menu-icon--larger"
        />
        ویرایش پروفایل
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/SideNavbar.vue";

export default {
  name: "Home",
  data() {
    return {
      activePage: "AddYear",
      userMenu: false,
      interviewYears: [],
      activeYear: {},
    };
  },
  components: { Navbar },
  methods: {
    closeMenu() {
      this.userMenu = false;
    },
    setInterviewYear(el) {
      this.activeYear = el;
      this.$store.commit("setInterviewYear", el);
    },
    logout() {
      this.$axios.defaults.headers.common["x-access-token"] = ``;
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  created() {
    this.$axios.get("/interview/years").then((response) => {
      this.interviewYears = response.data.map((el) => {
        return { value: el.interview_year, text: el.interview_year };
      });
    });
    this.$axios.get("/user/whoiam").then((res) => {
      this.$store.commit("setName", res.data.name);
      this.$store.commit("setIsAdmin", res.data.admin);
    });
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background-color: var(--color-1);
  &__content {
    padding: 100px 64px;
    width: calc(100vw - 300px);
  }
  &__user {
    position: absolute;
    left: 32px;
    top: 32px;
    cursor: pointer;

    &-icon {
      font-size: 42px;
      color: var(--color-3);
    }
    height: 3 0px;
    &:hover {
      text-shadow: var(--highlight-color) 1px 1px 2px;
    }
  }
  &__menu {
    position: absolute;
    box-shadow: 5px 5px 10px 1px var(--color-3);
    left: 2px;
    top: 47px;
    background: var(--color-3);
    color: var(--on-color-3);
    width: 160px;
    z-index: 5;
    border-radius: 5px;
    border: 0.5px solid var(--highlight-color);
    &-item {
      padding: 10px;
      font-size: fontSize("l");
      &:hover {
        text-shadow: var(--highlight-light-color) -2px 2px 2.6px;
      }
    }
    &-icon {
      margin-left: 10px;
      font-size: fontSize("l");
      &--larger {
        font-size: fontSize("xl");
      }
    }
  }
  &__selection {
    z-index: 5;
    position: absolute;
    margin-top: 20px;
    right: 320px;
    & > span {
      margin-left: 20px;
    }
    &-field {
      width: 160px;
    }
  }
}
</style>
