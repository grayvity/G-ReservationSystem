import Vue from "vue";
import Router from "vue-router";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

// component
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "admin",
      component: Container,
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
