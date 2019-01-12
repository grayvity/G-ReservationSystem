<template>
  <!-- Modal -->
  <b-modal
    id="entryModal"
    ref="entryModal"
    hide-footer
    title="Өрөө"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    style="max-width: none; width: 90%;"
    size="lg"
  >
    <form class="forms-sample">
      <p class="card-description font-weight-bold">Захиалгын мэдээлэл</p>
      <div class="row">
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Дугаар</label>
            <div class="col-sm-9">
              <input ref="i_info_id" type="text" v-model="info.id" class="form-control" readonly>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Огноо</label>
            <div class="col-sm-9">
              <date-picker
                ref="i_info_order_date"
                class="w-100"
                v-model="info.order_date"
                placeholder="Сонгоно уу"
                format="YYYY-MM-DD"
                type="date"
                max="3000-12-31"
                min="1000-01-01"
                lang="en"
              ></date-picker>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Нэмэлт мэдээлэл</label>
            <div class="col-sm-9">
              <textarea ref="i_info_note" class="form-control" v-model="info.note" rows="1"></textarea>
            </div>
          </div>
        </div>
      </div>
      <p class="card-description font-weight-bold">Захиалагчын мэдээлэл</p>
      <div class="row">
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Нэр</label>
            <div class="col-sm-9">
              <input ref = "i_info_cus_name" type="text" v-model="info.cus_name" class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Төрөл</label>
            <div class="col-sm-9">
              <input ref = "i_info_cus_type" type="text" v-model="info.cus_type" class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Утас</label>
            <div class="col-sm-9">
              <input ref="i_info_cus_phone" type="text" v-model="info.cus_phone" class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Имэйл</label>
            <div class="col-sm-9">
              <input ref="i_info_cus_email" type="text" v-model="info.cus_email" class="form-control">
            </div>
          </div>
        </div>
      </div>
      <p class="card-description font-weight-bold">Төлбөрийн мэдээлэл</p>
      <div class="row">
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Банкаар</label>
            <div class="col-sm-9">
              <input
                ref="i_info_card_amount"
                type="number"
                v-model="card_amount"
                pattern="^\d+(\.|\,)\d{2}$"
                min="0"
                class="form-control"
                value="0.00"
              >
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Бэлнээр</label>
            <div class="col-sm-9">
              <input
                ref="i_info_cash_amount"
                type="number"
                v-model="cash_amount"
                pattern="^\d+(\.|\,)\d{2}$"
                min="0"
                class="form-control"
                value="0.00"
              >
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Төлсөн</label>
            <div class="col-sm-9">
              <input
                ref="i_info_total_amount"
                type="number"
                v-model="total_amount"
                pattern="^\d+(\.|\,)\d{2}$"
                min="0"
                class="form-control"
                disabled
              >
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Төлөх</label>
            <div class="col-sm-9">
              <input
                ref="i_info_price"
                type="number"
                v-model="total_price"
                pattern="^\d+(\.|\,)\d{2}$"
                min="0"
                class="form-control"
                disabled
              >
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 15px;" class="row">
        <div class="col-md-2">
          <p class="card-description font-weight-bold">Өрөөний мэдээлэл</p>
        </div>
        <div class="col">
          <a
            data-toggle="collapse"
            href="javascript:;"
            data-target="#roomCollapse"
            role="button"
            aria-expanded="true"
            aria-controls="roomCollapse roomAddCollapse"
          >
            <i class="fa fa-toggle-down"></i>
          </a>
        </div>
        <div class="col">
          <div id="roomAddCollapse" class="multi-collapse1 show" style="text-align:right;">
            <button type="button" class="btn btn-primary btn-sm" v-on:click="addRoom">
              <i class="fa fa-plus"></i>нэмэх
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="roomCollapse" class="table-responsive multi-collapse show">
            <table class="table table-hover sortable">
              <thead>
                <tr>
                  <th class="text-center">Өрөө,гэр #</th>
                  <th class="text-center">Том хүн</th>
                  <th class="text-center">Хүүхэд</th>
                  <th class="text-center">Орох огноо</th>
                  <th class="text-center">Гарах огноо</th>
                  <th class="text-center">Тайлбар</th>
                  <th class="text-center">Дүн</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="info_room in order_rooms" v-bind:key="info_room.id">
                  <td class="pt-3-half">
                    <select :ref="'room_col_' + info_room.id" class="form-control" @change="change_room($event, info_room)" v-model="info_room.room_id">
                      <option value="-1" selected>Сонгоно уу</option>
                      <option
                        v-for="room in rooms"
                        v-bind:key="room.id"
                        :value="room.id"
                      >{{room.name}}</option>
                    </select>
                  </td>
                  <td class="pt-3-half">
                    <input
                      class="form-control"
                      v-model="info_room.person_count"
                      type="number"
                      min="0"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <input
                      class="form-control"
                      v-model="info_room.child_count"
                      type="number"
                      min="0"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <date-picker
                      class="form-datepicker"
                      v-model="info_room.start_date"
                      placeholder="Сонгоно уу"
                      format="YYYY-MM-DD"
                      type="date"
                      max="3000-12-31"
                      min="1000-01-01"
                      lang="en"
                    ></date-picker>
                  </td>
                  <td class="pt-3-half">
                    <date-picker
                      class="form-datepicker"
                      v-model="info_room.end_date"
                      placeholder="Сонгоно уу"
                      format="YYYY-MM-DD"
                      type="date"
                      max="3000-12-31"
                      min="1000-01-01"
                      lang="en"
                    ></date-picker>
                  </td>
                  <td class="pt-3-half">
                    <input
                      class="form-control"
                      v-model="info_room.note"
                      type="text"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <input
                      class="form-control"
                      v-model="info_room.price"
                      type="number"
                      pattern="(^\d+(\.|\,)\d{2}$)"
                      min="0"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <a
                      href="javascript:;"
                      style="margin-left: 10px;"
                      v-on:click="removeRoom(info_room)"
                    >
                      <i class="fa fa-trash-o" style="color:red"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <th colspan="6" class="text-center"></th>
                  <th class="text-center">Нийт: {{room_total_price}}</th>
                  <th class="text-center"></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style="margin-top: 15px;" class="row">
        <div class="col-md-2">
          <p class="card-description font-weight-bold">Үйлчилгээний мэдээлэл</p>
        </div>
        <div class="col">
          <a
            data-toggle="collapse"
            href="javascript:;"
            data-target="#serviceCollapse"
            role="button"
            aria-expanded="true"
            aria-controls="serviceCollapse serviceAddCollapse"
          >
            <i class="fa fa-toggle-down"></i>
          </a>
        </div>
        <div class="col">
          <div id="serviceAddCollapse" class="multi-collapse show" style="text-align:right;">
            <button type="button" class="btn btn-primary btn-sm" v-on:click="addService">
              <i class="fa fa-plus"></i>нэмэх
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="serviceCollapse" class="table-responsive multi-collapse show">
            <table class="table table-hover sortable">
              <thead>
                <tr>
                  <th class="text-center">Нэр</th>
                  <th class="text-center">Тайлбар</th>
                  <th class="text-center">Дүн</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="info_service in order_services" v-bind:key="info_service.id">
                  <td class="pt-3-half">
                    <select class="form-control" @change="change_service($event, info_service)" v-model="info_service.service_id">
                      <option value="-1" selected>Сонгоно уу</option>
                      <option
                        v-for="service in services"
                        v-bind:key="service.id"
                        :value="service.id"
                      >{{service.name}}</option>
                    </select>
                  </td>
                  <td class="pt-3-half">
                    <input
                      class="form-control"
                      v-model="info_service.note"
                      type="text"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <input
                      class="form-control"
                      v-model="info_service.price"
                      type="number"
                      pattern="(^\d+(\.|\,)\d{2}$)"
                      min="0"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <a
                      href="javascript:;"
                      style="margin-left: 10px;"
                      v-on:click="removeService(info_service)"
                    >
                      <i class="fa fa-trash-o" style="color:red"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <th colspan="2" class="text-center"></th>
                  <th class="text-center">Нийт: {{service_total_price}}</th>
                  <th class="text-center"></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
    <div v-if="info.status != 'confirmed'" class="modal-footer">
      <button class="btn btn-light" @click="hideModal">Болих</button>
      <button type="button" class="btn btn-primary mr-2" v-on:click="save('new')">Түр хадгалах</button>
      <button type="button" class="btn btn-success mr-2" v-on:click="save('confirmed')">Тооцоо хаах</button>
    </div>
  </b-modal>
</template>
<script>
import DatePicker from "vue2-datepicker";
export default {
  components: { DatePicker },
  name: "OrderEntry",
  props: ["orderinfo"],
  computed: {
    room_total_price: function(){
      return this.order_rooms.reduce(function(room_total_price, item){
        return room_total_price + (item.price ? parseInt(item.price) : 0); 
      },0);
    },
    service_total_price: function(){
      return this.order_services.reduce(function(service_total_price, item){
        return service_total_price + (item.price ? parseInt(item.price) : 0); 
      },0);
    },
    total_amount:function(){
      return parseInt(this.card_amount) + parseInt(this.cash_amount);
    },
    total_price:function(){
      return this.room_total_price + this.service_total_price;
    },
  },
  data() {
    return {
      cash_amount: 0,
      card_amount: 0,
      info: {cash_amount: 0.00, card_amount:0.00},
      rooms: [],
      services: [],
      order_rooms: [],
      order_services: []
    };
  },
  methods: {
    change_room(event,room_info){
      if (event.target.value && event.target.value > 0){
        var lucky = this.rooms.filter(function(room) {
          return room.id == event.target.value;
        });
        room_info.person_count = lucky[0].person_limit;
        room_info.child_count = 0;
        room_info.price = lucky[0].price;
        room_info.room_category_id = lucky[0].category_id;
      }else{
        room_info.person_count = 0;
        room_info.child_count = 0;
        room_info.price = 0;
        room_info.room_category_id = 0;
        room_info.note = '';
      }
    },
    change_service(event,service_info){
      if (event.target.value && event.target.value > 0){
        var lucky = this.services.filter(function(service) {
          return service.id == event.target.value;
        });
        service_info.price = lucky[0].price;
      }else{
        service_info.price = 0.00;
        service_info.note = '';
      }
    },
    hideModal() {
      this.$refs.entryModal.hide();
    },
    showModal() {
      this.$refs.entryModal.show();
      this.getData();
    },
    async getData() {
      try {
        const res = await fetch("/api/get-room-and-service", {
          method: "POST",
          body: JSON.stringify({ info: this.info }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();
        if(resJson.order_info){
          // resJson.order_info.order.order_date = moment(resJson.order_info.order.order_date);
          this.info = resJson.order_info.order;
          this.order_rooms = resJson.order_info.order_rooms;
          this.order_services = resJson.order_info.order_services;
        }else{
          this.order_rooms = [
            {
              id:0,
              room_id: -1,
              person_count: 0,
              child_count: 0,
              start_date: moment(),
              end_date: moment(),
              price: 0.00
            }
          ];
          this.order_services = [{ id:0, service_id: -1, price: 0.00 }];
          this.info.card_amount = 0.00;
          this.info.cash_amount = 0.00;
        }
        this.card_amount = this.info.card_amount;
        this.cash_amount = this.info.cash_amount;
        this.rooms = resJson.rooms;
        this.services = resJson.services;
      } catch (err) {
        this.$notify({
          title: "Алдаа",
          text: err,
          type: "error"
        });
        console.log(err);
      }
    },
    checkControl(){
      let isValidate = true;
      let validate_msg = 'Талбар бүрэн бөглөнө үү.';
      let is_focus = false;
      if(!this.info.order_date || this.info.order_date.length < 4){
        isValidate = false;
        validate_msg += '\n - Огноо ';
        if (!is_focus){
          $(this.$refs['i_info_order_date']).focus();
          is_focus = true;
        }
      }
      if(!this.info.cus_name || this.info.cus_name.length < 4){
        isValidate = false;
        validate_msg += '\n - Захиалагчын нэр ';
        if (!is_focus){
          $(this.$refs['i_info_cus_name']).focus();
          is_focus = true;
        }
      }
      // if(!this.info.cus_type || this.info.cus_type.length < 4){
      //   isValidate = false;
      //   validate_msg += '\n - Захиалагчын төрөл ';
      //   if (!is_focus){
      //     $(this.$refs['i_info_cus_type']).focus();
      //     is_focus = true;
      //   }
      // }
      if(!this.info.cus_phone || this.info.cus_phone.length < 4){
        isValidate = false;
        validate_msg += '\n - Захиалагчын утас ';
        if (!is_focus){
          $(this.$refs['i_info_cus_phone']).focus();
          is_focus = true;
        }
      }

      if(!this.info.cus_email || this.info.cus_email.length < 4){
        isValidate = false;
        validate_msg += '\n - Захиалагчын имэйл ';
        if (!is_focus){
          $(this.$refs['i_info_cus_email']).focus();
          is_focus = true;
        }
      }
      // if(!this.info.note || this.info.note.length < 4){
      //   isValidate = false;
      //   validate_msg += '\n - Нэмэлт мэдээлэл ';
      //   if (!is_focus){
      //     $(this.$refs['i_info_note']).focus();
      //     is_focus = true;
      //   }
      // }
      if(!this.order_rooms || this.order_rooms.length == 0){
        isValidate = false;
        validate_msg += '\n - Өрөөний мэдээлэл оруулна уу ';
      }else{
        var lucky = this.order_rooms.filter(function(room) {
          return room.room_id && parseInt(room.room_id) > 0;
        });
        if(!lucky || lucky.length == 0){
          isValidate = false;
          validate_msg += '\n - Өрөөний мэдээлэл оруулна уу ';
          if (!is_focus){
            var ids = []
            for(var x in this.order_rooms)
              if(parseInt(this.order_rooms[x].room_id) < 1)
                ids.push(this.order_rooms[x].id);
            if(ids.length == 0)
              for(var x in this.order_rooms)
                ids.push(this.order_rooms[x].id);
            var min_id = Math.min(...ids);
            $(this.$refs['room_col_' + min_id]).focus();
            is_focus = true;
          }
        }
      }
      if(isValidate && this.info.status == 'confirmed' && this.total_price == 0)
      {
        isValidate = false;
        validate_msg += '\n - Төлөх дүн 0 үед тооцоо хаах боломжгүй. ';
      }
      else if(isValidate && this.info.status == 'confirmed' && this.total_amount < this.total_price)
      {
        isValidate = false;
        validate_msg += '\n - Төлсөн дүн нь төлөх дүнгээс бага үед тооцоо хаах боломжгүй. ';
      }
      return [isValidate, validate_msg];
    },
    async save(info_status) {
      try {
        console.log("Saving");
        let valid_param = await this.checkControl();
        if(!valid_param[0]){ 
          this.$notify({
            title: "Анхаар",
            text: valid_param[1],
            type: "warn"
          });
          return; 
        }
        this.info.order_rooms = this.order_rooms.filter(function(room) {
          return room.room_id && parseInt(room.room_id) > 0;
        });
        this.info.order_services = this.order_services.filter(function(room) {
          return room.service_id && parseInt(room.service_id) > 0;
        });
        this.info.status = info_status;
        this.info.card_amount = this.card_amount;
        this.info.cash_amount = this.cash_amount;
        this.info.total_amount = this.total_amount;
        this.info.price = this.total_price;
        const res = await fetch("/api/save-order", {
          method: "POST",
          body: JSON.stringify(this.info),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();
        // if error
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
          //if success
        } else {
          console.log('resJson---');
          console.log(resJson);
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
      }
    },
    addRoom() {
      var ids = []
      for(var x in this.order_rooms)
        ids.push(this.order_rooms[x].id);
      var max_id = ids.length > 0 ? Math.max(...ids) : 0;
      this.order_rooms.push({
        id: max_id + 1,
        room_id: -1,
        person_count: 0,
        child_count: 0,
        start_date: moment(),
        end_date: moment(),
        price:0.00
      });
    },
    addService() {
      var ids = []
      for(var x in this.order_services)
        ids.push(this.order_services[x].id);
      var max_id = ids.length > 0 ? Math.max(...ids) : 0;
      this.order_services.push({id:max_id + 1, service_id: -1, price:0.00 });
    },
    removeService(info) {
      this.order_services.splice(this.order_services.indexOf(info), 1);
    },
    removeRoom(info) {
      this.order_rooms.splice(this.order_rooms.indexOf(info), 1);
    }
  }
};
</script>