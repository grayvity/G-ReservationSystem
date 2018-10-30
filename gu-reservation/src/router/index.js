import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";
import Reserve from "@/pages/Reserve.vue";
import PageManager from "@/components/PageManager.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: PageManager },
    { path: "/login", component: Login },
    { path: "/home", component: Home },
    { path: "/reserve", component: Reserve }
  ]
});
