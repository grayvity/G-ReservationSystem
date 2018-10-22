import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Reserve from "../components/Reserve.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/login", component: Login },
    { path: "/", component: Home },
    { path: "/reserve", component: Reserve }
  ]
});
