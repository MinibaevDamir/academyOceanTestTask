import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import CourseView from "../views/Courses/_id.vue";
import DashboardView from "../views/DashboardView.vue";
import auth from "@/middleware/auth";

Vue.use(VueRouter);
const isLoggedIn = localStorage.getItem("isLoggedIn");

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (to.name === "login" && isLoggedIn) {
        next("dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/courses/:id",
    name: "course",
    component: CourseView,
    beforeEnter: (to, from, next) => {
      auth(isLoggedIn, next);
    },
  },
  {
    path: "/dashboard/",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      auth(isLoggedIn, next);
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
