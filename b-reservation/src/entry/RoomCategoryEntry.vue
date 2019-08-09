<template>
  <!-- Modal -->
  <b-modal
    id="entryModal"
    ref="entryModal"
    hide-footer
    title="Өрөө бүлэг"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
  >
    <form class="forms-sample">
      <div class="form-group">
        <label for="type">Нэр</label>
        <input type="text" class="form-control" id="name" v-model="info.name" placeholder="Нэр">
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
  name: "RoomCategoryEntry",
  props: ["info"],

  mounted() {
    console.log("entry created!");
  },
  methods: {
    hideModal() {
      this.$refs.entryModal.hide();
    },
    async checkControl() {
      if (!this.info.name || this.info.name.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Талбар бүрэн бөглөнө үү.",
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

        const res = await fetch("/api/save-room-category", {
          method: "POST",
          body: JSON.stringify(this.info),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();

        if (!resJson.success) {
          // console.log(resJson.error);
          this.$notify({
            title: "Алдаа 0",
            text: resJson.error,
            type: "error"
          });
        } else if (res.error) {
          // console.log(res.error);
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
          text: err,
          type: "error"
        });
      } finally {
        this.$store.dispatch("set_loading_status", false);
      }
    }
  }
};
</script>