import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    is_logged: localStorage.getItem("token") || 0
  },
  getters: {
    get_is_logged: state => {
      return state.is_logged;
    }
  },
  mutations: {
    set_login_status: (state, is_logged) => {
      state.is_logged = is_logged;
      localStorage.setItem("token", is_logged);
    }
  },
  actions: {
    set_login_status: (context, is_logged) => {
      context.commit("set_login_status", is_logged);
    }
  }
});
