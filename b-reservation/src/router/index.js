import Vue from "vue";
import Router from "vue-router";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Controller from "@/pages/PageController";

// component
import Container from "@/components/Container";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "admin",
      component: Controller,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
