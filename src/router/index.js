import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import AddYear from "@/components/AddYear";
import Selection from "@/components/Selection";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/addYear",
        component: AddYear,
      },
      {
        path: "/selection",
        component: Selection,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
