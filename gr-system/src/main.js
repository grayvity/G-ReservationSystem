import Vue from "vue";
import App from "./App";
// import router from "./router";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

// new Vue({
//   el: "#app",
//   router: router,
//   components: { App },
//   template: "<App/>"
// });
