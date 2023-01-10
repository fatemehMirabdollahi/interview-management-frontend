import router from "../router";
import store from "../store/index";
export function revokeAccess() {
  localStorage.setItem("token", null);
  localStorage.setItem("name", null);
  store.commit("logout");
  router.push("/login");
}
export function authenticate(token) {
  localStorage.setItem("token", token);
  store.commit("login");
}
