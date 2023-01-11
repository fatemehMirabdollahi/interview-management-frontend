import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import AddYear from "@/components/AddYear";
import Selection from "@/components/Selection";
import Scheduling from "@/components/Scheduling";
import Interview from "@/components/Interview";
import UserManagement from "@/components/UserManagement";
import store from "@/store/index";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.state.isLogin) next("/login");
      else next();
    },
    children: [
      {
        path: "/addYear",
        component: AddYear,
      },
      {
        path: "/selection",
        component: Selection,
      },
      {
        path: "/scheduling",
        component: Scheduling,
      },
      {
        path: "/interview",
        component: Interview,
      },
      {
        beforeEnter: (to, from, next) => {
          if (store.state.isAdmin) next();
        },
        path: "/usermanagment",
        component: UserManagement,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) next("/");
      else next();
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
