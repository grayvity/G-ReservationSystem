<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h4 class="card-title">Өрөөний бүлэг</h4>
              </div>
              <div class="col-md-6" style="text-align:right;">
                <button
                  type="button"
                  class="btn btn-primary btn-fw"
                  v-b-modal.entryModal
                  @click="createNew"
                >
                  <i class="fa fa-plus"></i>нэмэх
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Нэр</th>
                    <th>Идэвхитэй</th>
                    <th/>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="info in services" v-bind:key="info.id">
                    <td class="font-weight-medium">{{info.id}}</td>
                    <td>{{info.name}}</td>
                    <td class="min">
                      <i
                        v-if="info.is_active === 'Y'"
                        class="fa fa-check-circle-o"
                        style="color:green"
                      ></i>
                      <i v-else class="fa fa-eye-slash" style="color:gray"></i>
                    </td>
                    <td class="min">
                      <a href="javascript:;" v-on:click="setCurrent(info)" v-b-modal.entryModal>
                        <i class="fa fa-edit"></i>
                      </a>
                    </td>
                    <td class="min">
                      <a
                        href="javascript:;"
                        v-on:click="setCurrent(info)"
                        data-toggle="modal"
                        data-target="#askmodal"
                      >
                        <i class="fa fa-trash-o" style="color:red"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Entry v-bind:info="current_info" @onCompleted="modal_completed"/>
              <AskModal @onChanged="modal_value_changed"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- content-wrapper ends -->
</template>

<script>
import Entry from "@/entry/RoomCategoryEntry.vue";
import AskModal from "@/components/AskModal.vue";

export default {
  name: "RoomCategories",
  components: { Entry, AskModal },
  data() {
    return {
      services: [],
      current_info: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.$store.dispatch("set_loading_status", true);
        const res = await fetch("/api/get-room-categories", {
          method: "GET"
        });
        const resJson = await res.json();

        // console.log(resJson.services)

        this.services = resJson.datas;
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
    setCurrent(info) {
      this.current_info = info;
    },
    async delete() {
      try {
        console.log("deleting...");
        this.$store.dispatch("set_loading_status", true);

        const res = await fetch("/api/delete-room-category", {
          method: "POST",
          body: JSON.stringify({ id: this.current_info.id }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();

        this.$notify({
          title: "Амжилттай",
          text: "Амжилттай устгагдлаа",
          type: "success"
        });
        this.getData();

        if (!resJson.success) {
          console.log(resJson.error);
          this.$notify({
            title: "Алдаа",
            text: resJson.error,
            type: "error"
          });
        }
        if (res.error) {
          console.log(res.error);
          this.$notify({
            title: "Алдаа",
            text: res.error,
            type: "error"
          });
        }
      } catch (err) {
        this.$notify({
          title: "Алдаа",
          text: err,
          type: "error"
        });
      } finally {
        this.$store.dispatch("set_loading_status", false);
      }
    },
    createNew() {
      this.current_info = { is_active: true };
    },
    modal_value_changed(value) {
      if (value) {
        this.delete();
      }
    },
    modal_completed() {
      console.log("refreshing...");
      this.getData();
    }
  }
};
</script>