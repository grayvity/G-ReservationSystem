<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-6">
        <h4 class="card-title">Захиалга жагсаалт</h4>
      </div>
      <div class="col-md-6" style="text-align:right;">
        <button
          type="button"
          class="btn btn-primary btn-fw"
          v-on:click="set_order_info('', '', '', '')"
        >
          <!-- v-b-modal.entryModal -->
          <i class="fa fa-plus"></i>нэмэх
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Хугацааны хамрах хүрээ</label>
                  <div class="col-sm-3">
                    <date-picker
                      class="w-100"
                      v-model="search_info.begindate"
                      placeholder="Сонгоно уу"
                      format="YYYY-MM-DD"
                      type="date"
                      max="3000-12-31"
                      min="1000-01-01"
                      lang="en"
                    ></date-picker>
                  </div>
                  <div class="col-sm-3">
                    <date-picker
                      class="w-100"
                      v-model="search_info.enddate"
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
              <div class="col-md-2">
                <div class="form-group row">
                  <div class="col">
                    <select class="form-control" v-model="search_info.room_cat_id">
                      <option value="0" selected>Бүх</option>
                      <option
                        v-for="room_cat in room_categories"
                        v-bind:key="room_cat.id"
                        :value="room_cat.id"
                      >{{room_cat.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group row">
                  <div class="col">
                    <button class="btn btn-success mr-2" v-on:click="get_data">Шүүх</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" style="position: initial;">
                <thead>
                  <tr>
                    <th style="padding: 5px 10px 5px 10px !important" class="text-center"></th>
                    <th
                      style="padding: 5px 10px 5px 10px !important"
                      class="text-center"
                      v-for="day in orderDays"
                      v-bind:key="day.day"
                    >
                      {{ day.day }}
                      {{ day.weekday }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orderList" v-bind:key="order.name">
                    <td style="padding: 5px 10px 5px 10px !important">{{order.name}}</td>
                    <td
                      style="padding: 5px 10px 5px 10px !important"
                      v-for="cell in order.cols"
                      v-bind:key="cell.date"
                      v-bind:colspan="cell.orderday"
                      class="py-1"
                    >
                      <button
                        type="button"
                        class="btn btn-rounded"
                        data-toggle="modal"
                        data-target="#orderEntryModal"
                        v-on:click="set_order_info(cell.orderid, cell.date, cell.roomid, cell.status)"
                        v-bind:class="{'btn-inverse-success w-100' : cell.status == 'confirmed','btn-inverse-warning w-100' : cell.status == 'new','btn-inverse-secondary w-100' : cell.status == 'default',}"
                      >{{ cell.note }}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <OrderEntry ref="entryRef" @hidden="onHiddenOrderEntry" @onCompleted="modal_completed"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- content-wrapper ends -->
</template>
<script>
import OrderEntry from "@/entry/OrderEntry.vue";
import DatePicker from "vue2-datepicker";
import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
export default {
  name: "Orders",
  components: { OrderEntry, DatePicker },
  filters: {
    status: function (status) {
      if (status == 'new')
        return 'Захиалагдсан';
      else if (status == 'confirmed')
        return 'Төлбөр төлөгдсөн';
      else if (status == 'canceled')
        return 'Цуцалсан';
      else
        return status;
    }
  },
  computed: {
    room_total: function(){
      return this.print_info.order_rooms ? this.print_info.order_rooms.reduce(function(room_total, item){
        return room_total + (item.price ? parseInt(item.price) : 0); 
      },0) : 0;
    },
    service_total: function(){
      return this.print_info.order_services ? this.print_info.order_services.reduce(function(service_total, item){
        return service_total + (item.price ? parseInt(item.price) : 0); 
      },0) : 0;
    },
    total_amount:function(){
      return parseInt(this.print_info.card_amount) + parseInt(this.print_info.cash_amount);
    },
    total_price:function(){
      return this.print_info.room_total_price + this.print_info.service_total_price;
    },
  },
  methods: {
    modal_completed(){
      this.get_data();
    },
    onHiddenOrderEntry (evt) {
      this.get_data();
    },
    async get_data() {
      try {
        console.log(this.search_info)
        const res = await fetch("/api/get-orders", {
          method: "POST",
          body: JSON.stringify({ search_info: this.search_info }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();

        this.$notify({
          title: "Амжилттай",
          text: "Амжилттай",
          type: "success"
        });
        // console.log(resJson.datas.range_days);
        this.orderDays = resJson.datas.range_days;
        this.orderList = resJson.datas.orderlist;
        this.room_categories = resJson.datas.room_categories;
        if (res.error) {
          this.$notify({
            title: "Алдаа",
            text: res.error,
            type: "error"
          });
        }
      } catch (err) {
        this.$notify({
          title: "Алдаа",
          text: err.message,
          type: "error"
        });
      }
    },
    async set_order_info(orderid, date, roomid, status) {
      // if(status == 'confirmed')
      // {
      //   this.$notify({
      //     title: "Амжилттай",
      //     text: "Тооцоо хаасан захиалга байна. Тайлангаас харах боломжтой.",
      //     type: "success"
      //   });
      //   return;
      // }
      this.$refs.entryRef.info = {id: orderid, order_date: date ? date : moment(), room_id: roomid};
      this.$refs.entryRef.showModal();
    }
  },
  data() {
    return {
      search_info: {
        current_date: moment(),
        begindate: moment().add(-4, "days"),
        enddate: moment().add(10, "days"),
        room_cat_id: 0,
        order_status: 0,
      },
      orderList: [],
      orderDays: [],
      room_categories: [],
      print_info: {},
    };
  },
  mounted() {
    this.get_data();
  }
};
</script>
