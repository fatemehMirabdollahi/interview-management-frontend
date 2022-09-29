import { createStore } from "vuex";

export default createStore({
  state: {
    activeInterviewYear: null,
  },
  mutations: {
    setInterviewYear(state, year) {
      state.activeInterviewYear = year;
    },
  },
  actions: {},
  modules: {},
});
