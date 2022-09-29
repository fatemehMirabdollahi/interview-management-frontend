<template>
  <div class="i-flex home" dir="rtl">
    <div class="i-flex i-flex-align-center home__selection">
      <span>انتخاب سال مصاحبه:</span>
      <div class="i-flex home__selection-field">
        <b-form-select :options="interviewYears" @change="test"></b-form-select>
      </div>
    </div>
    <navbar />
    <div class="home__content i-flex-1">
      <router-view></router-view>
    </div>
  </div>
  <div class="home__user" v-click-outside="closeMenu">
    <div class="i-flex" @click="userMenu = !userMenu">
      <img
        class="home__user-arrow"
        src="../assets/images/dropdown.svg"
        alt=""
      />
      <img class="home__user-icon" src="../assets/images/user.svg" alt="" />
    </div>

    <div class="home__menu" v-if="userMenu">
      <div class="i-flex i-flex-justify-center home__menu-item">user name</div>
      <div dir="rtl" class="i-flex home__menu-item">
        <img
          class="home__menu-logout"
          src="../assets/images/logout.svg"
          alt=""
        />
        خروج
      </div>
      <div
        dir="rtl"
        class="i-flex home__menu-item"
        @click="$router.push('AddYear'), (this.userMenu = false)"
      >
        <img class="home__menu-icon" src="../assets/images/plus.svg" alt="" />
        افزودن مصاحبه
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
    };
  },
  components: { Navbar },
  methods: {
    closeMenu() {
      this.userMenu = false;
    },
    test(el) {
      console.log(el);
      this.$store.commit("setInterviewYear", el);
    },
  },
  created() {
    this.$axios.get("/interview/years").then((response) => {
      this.interviewYears = response.data.map((el) => {
        return { value: el.interview_year, text: el.interview_year };
      });
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
  }
  &__user {
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
    &-icon {
      width: 40px;
      height: 40px;
    }
    &-arrow {
      width: 30px;
      height: 3 0px;
    }
  }
  &__menu {
    position: absolute;
    box-shadow: 5px 5px 10px 1px var(--color-3);
    left: 2px;
    top: 47px;
    background: var(--color-3);
    color: var(--on-color-3);
    width: 150px;
    z-index: 5;
    border-radius: 5px;
    border: 0.5px solid var(--highlight-color);
    &-item {
      padding: 10px;
      &:hover {
        font-weight: bold;
      }
    }
    &-icon {
      width: 10px;
      margin-left: 10px;
    }
    &-logout {
      margin-left: 10px;
      width: 20px;
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
