import Vue from "vue";
import App from "./App.vue";
// import store from "./store";
import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";

// Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Home }
];

const router = new VueRouter({ routes, mode: "history" });

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
