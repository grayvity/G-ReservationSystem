import Vue from "vue";
import Router from "vue-router";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Controller from "@/pages/PageController";
import Services from "@/pages/Services";
import Rooms from "@/pages/Rooms";
import Orders from "@/pages/Orders";
import Users from "@/pages/Users";
import RoomCategories from "@/pages/RoomCategories";
import Report from "@/pages/Report";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "admin",
      component: Controller,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard
        },
        {
          path: "services",
          name: "services",
          component: Services
        },
        {
          path: "rooms",
          name: "rooms",
          component: Rooms
        },
        {
          path: "users",
          name: "users",
          component: Users
        },
        {
          path: "room_categories",
          name: "room_categories",
          component: RoomCategories
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        },
        {
          path: "report",
          name: "report",
          component: Report
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
