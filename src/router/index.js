import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Layout from "../components/AuthLayout.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import ForgetPassword from "../components/Auth/ForgetPassword.vue";
import UpdatePassword from "../components/Auth/UpdatePassword.vue";
import DashboardLayout from "../components/Dashboard/DashboardLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          name: "register",
          component: Register,
        },
        {
          path: "/login",
          name: "login",
          component: Login,
        },
        {
          path: "/forget-password/",
          name: "forgetPassword",
          component: ForgetPassword,
        },
        {
          path: "/update-password/:id",
          name: "updatePassword",
          component: UpdatePassword,
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: 'dashboard',
          component: Register,
        },
        {
          path: "/dashboard/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
  ],
});

export default router;
