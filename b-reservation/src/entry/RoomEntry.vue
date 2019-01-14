<template>
  <!-- Modal -->
  <b-modal
    id="entryModal"
    ref="entryModal"
    hide-footer
    title="Өрөө"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
  >
    <form class="forms-sample">
      <div class="form-group">
        <label for="type">Нэр</label>
        <input type="text" class="form-control" id="type" v-model="info.name" placeholder="Төрөл">
      </div>
      <div class="form-group">
        <label for="cmbType">Бүлэг</label>
        <select class="form-control form-control-sm" id="cmbType" v-model="info.category_id">
          <option v-for="cat in roomCategories" v-bind:key="cat.id" :value="cat.id">{{cat.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="person_limit">Хүний багтаамж</label>
        <input
          type="number"
          value
          min="0"
          step="100"
          data-number-to-fixed="2"
          data-number-stepfactor="100"
          class="form-control currency"
          v-model="info.person_limit"
        >
      </div>
      <div class="form-group">
        <label for="description">Тэмдэглэл</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="info.note"
          placeholder="Тэмдэглэл"
        >
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">₮</span>
        </div>
        <money class="form-control currency" v-model="info.price" v-bind="money"></money>
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
      <button type="button" class="btn btn-success mr-2" data-dismiss="modal" v-on:click="save">
        <i class="fa fa-save"></i>
        Хадгалах
      </button>
    </div>
  </b-modal>
</template>

<script>
import {Money} from 'v-money'
export default {
  components: { Money },
  name: "RoomEntry",
  props: ["info"],
  data() {
    return {
      roomCategories: [],
      money: {
          decimal: '.',
          thousands: ',',
          prefix: '',
          suffix: '',
          precision: 0,
          masked: false /* doesn't work with directive */
        }
    };
  },
  mounted() {
    console.log("entry created!");
    this.getData();
  },
  methods: {
    hideModal() {
      this.$refs.entryModal.hide();
    },
    async getData() {
      try {
        this.$store.dispatch("set_loading_status", true);
        const res = await fetch("/api/get-room-categories", {
          method: "GET"
        });
        const resJson = await res.json();

        this.roomCategories = resJson.datas;
        console.log("categories: ", resJson.datas);
      } catch (err) {
        this.$notify({
          title: "Алдаа",
          text: err,
          type: "error"
        });
        console.log(err);
      } finally {
        this.$store.dispatch("set_loading_status", false);
      }
    },
    async checkControl() {
      if (!this.info.category_id || this.info.category_id.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Талбар бүрэн бөглөнө үү.",
          type: "warn"
        });
        return false;
      } else if (!this.info.name || this.info.name.length == 0) {
        this.$notify({
          title: "Анхаар",
          text: "Талбар бүрэн бөглөнө үү.",
          type: "warn"
        });
        return false;
      } else if (
        !this.info.price ||
        this.info.price.length == 0 ||
        this.info.price <= 0
      ) {
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

        const res = await fetch("/api/save-room", {
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