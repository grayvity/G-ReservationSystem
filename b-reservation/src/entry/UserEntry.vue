<template>
  <!-- Modal -->
  <b-modal
    id="entryModal"
    ref="entryModal"
    hide-footer
    title="Хэрэглэгчийн мэдээлэл"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
  >
    <form class="forms-sample">
      <div class="form-group">
        <label for="type">Хэрэглэгчийн нэр</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="info.username"
          placeholder="Хэрэглэгчийн нэр"
        >
      </div>
      <div class="form-group">
        <label for="type">Овог нэр</label>
        <input
          type="text"
          class="form-control"
          id="fullname"
          v-model="info.fullname"
          placeholder="Овог нэр"
        >
      </div>
      <div class="form-group">
        <label for="type">Нууц үг</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="info.password"
          placeholder="Нууц үг"
        >
      </div>
      <div class="form-group">
        <label for="cmbType">Эрх</label>
        <select class="form-control form-control-sm" id="cmbType" v-model="info.role">
          <option value="employee">Ажилтан</option>
          <option value="admin">Админ</option>
        </select>
      </div>
      <div class="form-check form-check-flat">
        <label class="form-check-label">
          <input type="checkbox" class="form-check-input" checked v-model="info.is_active">Идэвхитэй
          <i class="input-helper"></i>
        </label>
      </div>
    </form>

    <div class="modal-footer">
      <button class="btn btn-light" @click="hideModal">Болих</button>
      <button type="button" class="btn btn-success mr-2" v-on:click="save">
        <i class="fa fa-save"></i>
        Хадгалах
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "UserEntry",
  props: ["info"],

  mounted() {
    console.log("entry created!");
  },
  methods: {
    hideModal() {
      this.$refs.entryModal.hide();
    },
    async checkControl() {
      if (!this.info.username || this.info.username.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Хэрэглэгчийн нэр бөглөнө үү.",
          type: "warn"
        });
        return false;
      }
      if (!this.info.fullname || this.info.fullname.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Овог нэр бөглөнө үү.",
          type: "warn"
        });
        return false;
      }
      if (!this.info.password || this.info.password.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Нууц үг бөглөнө үү.",
          type: "warn"
        });
        return false;
      }
      if (!this.info.role || this.info.role.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Хэрэглэгчийн эрх бөглөнө үү.",
          type: "warn"
        });
        return false;
      }
      return true;
    },
    async save() {
      try {
        console.log("Saving");
        let isValidate = await this.checkControl();
        console.log("isValid: ", isValidate);

        if (!isValidate) {
          return;
        }
        this.$store.dispatch("set_loading_status", true);

        const res = await fetch("/api/save-user", {
          method: "POST",
          body: JSON.stringify(this.info),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();

        if (!resJson.success) {
          console.log(resJson.error);
          this.$notify({
            title: "Алдаа 0",
            text: resJson.error,
            type: "error"
          });
        } else if (res.error) {
          console.log(res.error);
          this.$notify({
            title: "Алдаа 1",
            text: res.error,
            type: "error"
          });
        } else {
          this.$notify({
            title: "Амжилттай",
            text: "Амжилттай хадгалагдлаа",
            type: "success"
          });

          this.$emit("onCompleted");
          this.hideModal();
        }
      } catch (err) {
        this.$notify({
          title: "Алдаа 2",
          text: err.message,
          type: "error"
        });
      } finally {
        this.$store.dispatch("set_loading_status", false);
      }
    }
  }
};
</script>