<template>
  <div id="app">
    <router-view @authenticated="setAuthenticated" />
    <!-- <router-view /> -->
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
        authenticated: false,
    }
  },
  mounted() {
      if(!this.authenticated) {
          // this.$router.replace({ name: "login" });
          this.$router.replace("login");
      }
  },
  methods: {
      setAuthenticated(status) {
          this.authenticated = status;
      },
      logout() {
          this.authenticated = false;
      }
  }
};
</script>

