import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    is_logged: localStorage.getItem("token") || 0,
    is_loading: false
  },
  getters: {
    get_is_logged: state => {
      return state.is_logged;
    },
    get_is_loading: state => {
      return state.is_loading;
    }
  },
  mutations: {
    set_login_status: (state, is_logged) => {
      state.is_logged = is_logged;
      localStorage.setItem("token", is_logged);
    },
    set_loading_status: (state, is_loading) => {
      state.is_loading = is_loading;
    }
  },
  actions: {
    set_login_status: (context, is_logged) => {
      context.commit("set_login_status", is_logged);
    },
    set_loading_status: (context, is_loading) => {
      context.commit("set_loading_status", is_loading);
    }
  }
});
