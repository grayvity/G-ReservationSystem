<template>
  <div class="container-scroller">
    <Loader/>
    <div class="container-fluid page-body-wrapper full-page-wrapper auth-page">
      <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <div class="auto-form-wrapper">
              <form role="form" v-on:submit.prevent="login">
                <div class="form-group">
                  <label class="label">Хэрэглэгчийн нэр</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="username"
                      placeholder="Username"
                    >
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i class="mdi mdi-check-circle-outline"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="label">Нууц үг</label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                      placeholder="*********"
                    >
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i class="mdi mdi-check-circle-outline"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary submit-btn btn-block">Нэвтрэх</button>
                </div>
                <div class="form-group d-flex justify-content-between">
                  <div class="form-check form-check-flat mt-0">
                    <label class="form-check-label">
                      <input type="checkbox" class="form-check-input" checked>Намайг сана
                    </label>
                  </div>
                  <a href="#" class="text-small forgot-password text-black">Нууц үгээ мартсан</a>
                </div>
                <div class="form-group"></div>
                <div class="text-block text-center my-3">
                  <span class="text-small font-weight-semibold">Хэрэв бүртгэлгүй бол</span>
                  <a href="register.html" class="text-black text-small">шинээр бүртгүүлэх</a>
                </div>
              </form>
            </div>
            <ul class="auth-footer">
              <li>
                <a href="#">Conditions</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
            </ul>
            <p class="footer-text text-center">copyright © 2018 Bootstrapdash. All rights reserved.</p>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>


<script>
import Loader from "@/components/Loader.vue";
export default {
  name: "Login",
  components: { Loader },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      this.$store.dispatch("set_loading_status", true);
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });

        const resJson = await res.json();
        console.log("Response: ", resJson);

        if (resJson.response.is_success) {
          this.$store.dispatch("set_login_status", 1);
          this.$store.dispatch("set_logged_user", {
            username: resJson.response.username,
            role: resJson.response.role
          });
          this.$router.push("/dashboard");
        }

        if (resJson.error) {
          throw new Error(resJson.error);
        }
        if (res.error) {
          throw new Error(res.error);
        }
      } catch (ex) {
      } finally {
        this.$store.dispatch("set_loading_status", false);
      }
    }
  }
};
</script>