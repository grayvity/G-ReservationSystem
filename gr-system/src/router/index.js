import Vue from "vue";
import Router from "vue-router";

// Containers
import Home from "./../components/Home";
import Login from "./../components/Login";

Vue.use(Router);

export default new Router({
  mode: "history", // Demo is living in GitHub.io, so required!
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/Home",
      name: "Home",
      template: "<div>Hello</div>"
    },
    {
      path: "/",
      name: "index",
      component: Home,
      redirect: "/Home"
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    }
  ]
});
