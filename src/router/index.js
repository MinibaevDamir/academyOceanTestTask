import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import CourseView from "../views/Courses/_id.vue";
import DashboardView from "../views/DashboardView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/courses/:id",
    name: "course",
    component: CourseView,
  },
  {
    path: "/dashboard/",
    name: "dashboard",
    component: DashboardView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
