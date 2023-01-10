import { createStore } from "vuex";

export default createStore({
  state: {
    activeInterviewYear: null,
    isLogin: false,
    username: null,
    proName: "",
  },
  mutations: {
    setInterviewYear(state, year) {
      state.activeInterviewYear = year;
    },
    login(state, username) {
      state.isLogin = true;
      state.username = username;
    },
    logout(state) {
      localStorage.setItem("token", null);
      localStorage.setItem("username", null);
      state.isLogin = false;
      state.username = null;
    },
    setName(state, proName) {
      state.proName = proName;
    },
  },
  actions: {},
  modules: {},
});
