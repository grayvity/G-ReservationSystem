<template>
  <!-- partial:partials/_navbar.html -->
  <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <a class="navbar-brand brand-logo" href="javascript;:">
        <img src="/static/images/logo.svg" alt="logo">
      </a>
      <a class="navbar-brand brand-logo-mini" href="javascript;:">
        <img src="/static/images/logo-mini.svg" alt="logo">
      </a>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center">
      <ul class="navbar-nav navbar-nav-right">
        <li class="nav-item dropdown d-none d-xl-inline-block">
          <a
            class="nav-link dropdown-toggle"
            id="UserDropdown"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="profile-text">{{get_username}}</span>
            <img
              class="img-xs rounded-circle"
              src="/static/images/faces/face1.jpg"
              alt="Profile image"
            >
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="UserDropdown"
          >
            <a class="dropdown-item p-0">
              <div class="d-flex border-bottom">
                <div class="py-3 px-4 d-flex align-items-center justify-content-center">
                  <i class="mdi mdi-bookmark-plus-outline mr-0 text-gray"></i>
                </div>
                <div
                  class="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right"
                >
                  <i class="mdi mdi-account-outline mr-0 text-gray"></i>
                </div>
                <div class="py-3 px-4 d-flex align-items-center justify-content-center">
                  <i class="mdi mdi-alarm-check mr-0 text-gray"></i>
                </div>
              </div>
            </a>
            <a class="dropdown-item mt-2">Миний мэдээлэл</a>
            <a class="dropdown-item">Нууц үг солих</a>
            <a class="dropdown-item">Тохиргоо</a>
            <a v-on:click="logOut" href="javascript:;" class="dropdown-item">Гарах</a>
          </div>
        </li>
      </ul>
      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button"
        data-toggle="offcanvas"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>
  <!-- partial -->
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: "",
      role: ""
    };
  },
  methods: {
    logOut() {
      console.log("logout...");
      this.$store.dispatch("set_login_status", 0);
      this.$router.replace("/login");
    }
  },
  computed: {
    get_username() {
      return this.$store.getters.get_logged_user.username;
    }
  }
};
</script>