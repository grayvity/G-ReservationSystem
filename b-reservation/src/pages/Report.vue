<template>  
  <div class="content-wrapper">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-5">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Тайлангийн төрөл</label>
                  <div class="col-sm-5">
                      <select class="form-control" @change="change_report_type" v-model="search_info.report_type">
                        <option value="0" selected>Захиалгаар</option>
                        <option value="1" selected>Өрөөгөөр</option>
                      </select>
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Захиалагч</label>
                  <div class="col-sm-6">
                      <input class="form-control" v-model="search_info.cus_name"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Төрөл</label>
                  <div class="col-sm-5">
                      <select class="form-control" v-model="search_info.order_status">
                        <option value="" selected>Бүх...</option>
                        <option value="new" selected>Захиалагдсан</option>
                        <option value="confirmed" selected>Төлбөр төлөгдсөн</option>
                        <option value="canceled" selected>Цуцалсан</option>
                      </select>
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Огноо</label>
                  <div class="col-sm-4">
                      <date-picker class="w-100" v-model="search_info.begindate" placeholder="Сонгоно уу" format="YYYY-MM-DD" type="date" max="3000-12-31" min="1000-01-01" lang="en">
                        </date-picker>
                  </div>
                  <div class="col-sm-4">
                      <date-picker class="w-100" v-model="search_info.enddate" placeholder="Сонгоно уу" format="YYYY-MM-DD" type="date" max="3000-12-31" min="1000-01-01" lang="en">
                        </date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="is_hidden_room_filter" class="row">
              <div class="col-md-5">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Бүлэг</label>
                  <div class="col-sm-5">
                      <select class="form-control" v-model="search_info.room_cat_id">
                        <option style="color:gray" value="0" selected>Бүх...</option>
                        <option v-for="room_cat in room_categories" v-bind:key="room_cat.id" :value="room_cat.id">{{room_cat.name}}</option>
                      </select>
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Өрөө</label>
                  <div class="col-sm-4">
                      <select class="form-control" v-model="search_info.room_id">
                        <option style="color:gray" value="0" selected>Бүх...</option>
                        <option v-for="room in rooms" v-bind:key="room.id" :value="room.id">{{room.name}}</option>
                      </select>
                    </div>
                </div>
              </div>
            </div>
            <div class="row float-right">
              <div class="col-md-2">
                <div class="form-group row">
                  <div class="col">
                      <button class="btn btn-success mr-2" v-on:click="get_report_data">Шүүх</button>
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
                  <div v-if="search_info.report_type == 0" class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                          <th>
                            Төрөл
                          </th>
                          <th>
                            Эхлэх огноо
                          </th>
                          <th>
                            Дуусах огноо
                          </th>
                          <th>
                            Захиалагч
                          </th>
                          <th>
                            Утас
                          </th>
                          <th>
                            Бэлнээр
                          </th>
                          <th>
                            Банкаар
                          </th>
                          <th>
                            Нийт дүн
                          </th>
                          <th>
                            Тэмдэглэл
                          <th/>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" v-bind:key="order.id">
                          <td class="font-weight-medium">
                            {{order.id}}
                          </td>
                          <td>
                            <span>{{ order.status | status }}</span>
                          </td>
                          <td>
                            <span>{{ order.start_date | moment }}</span>
                          </td>
                          <td>
                            <span>{{ order.end_date | moment }}</span>
                          </td>
                          <td>
                            {{order.cus_name}}
                          </td>
                          <td>
                            {{order.cus_phone}}
                          </td>
                          <td>
                            <span>{{ order.cash_amount | currency}}</span>
                          </td>
                          <td>
                            <span>{{ order.card_amount | currency}}</span>
                          </td>
                          <td>
                            <span>{{ order.total_amount | currency}}</span>
                          </td>
                          <td>
                            {{order.note}}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div  v-if="search_info.report_type == 1" class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                          <th>
                            Төрөл
                          </th>
                          <th>
                            Эхлэх огноо
                          </th>
                          <th>
                            Дуусах огноо
                          </th>
                          <th>
                            Захиалагч
                          </th>
                          <th>
                            Утас
                          </th>
                          <th>
                            Өрөө
                          </th>
                          <th>
                            Том хүн
                          </th>
                          <th>
                            Хүүхэд
                          </th>
                          <th>
                            Үнэ
                          </th>
                          <th>
                            Тэмдэглэл
                          <th/>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" v-bind:key="order.id">
                          <td class="font-weight-medium">
                            {{order.id}}
                          </td>
                          <td>
                            <span>{{ order.status | status }}</span>
                          </td>
                          <td>
                            <span>{{ order.start_date | moment }}</span>
                          </td>
                          <td>
                            <span>{{ order.end_date | moment }}</span>
                          </td>
                          <td>
                            {{order.cus_name}}
                          </td>
                          <td>
                            {{order.cus_phone}}
                          </td>
                          <td>
                            {{order.name}}
                          </td>
                          <td>
                            {{order.person_count}}
                          </td>
                          <td>
                            {{order.child_count}}
                          </td>
                          <td>
                            <span>{{ order.price | currency}}</span>
                          </td>
                          <td>
                            {{order.note}}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
    </div>
  </div>
  <!-- content-wrapper ends -->
</template>
<script>
import DatePicker from 'vue2-datepicker'
import VueCurrencyFilter from 'vue-currency-filter'
import Vue from 'vue'
Vue.use(VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
export default {
  name: 'Report',
  components: {DatePicker},
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD');
    },
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
  methods:{
    async get_data(){
      try{
        const res = await fetch("/api/get-filter-data", {
            method: "POST",
            body: JSON.stringify({search_info: ''}),
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            }
        });
        const resJson = await res.json();
        this.$notify({
          title: 'Амжилттай',
          text: 'Амжилттай',
          type: 'success'
        });
        this.room_categories = resJson.datas.room_categories;
        this.rooms = resJson.datas.rooms;
        this.cus_names = resJson.datas.cus_names;

        if (res.error) {
            console.log(res.error)
            this.$notify({
              title: 'Алдаа',
              text: res.error,
              type: 'error'
            });
        }
      }catch(err){
        this.$notify({
          title: 'Алдаа',
          text: err,
          type: 'error'
        });
      }
    },
    async get_report_data(){
      try{
        const res = await fetch("/api/get-report", {
            method: "POST",
            body: JSON.stringify({search_info: this.search_info}),
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            }
        });
        const resJson = await res.json();
        this.orders = resJson.datas.order;
        this.$notify({
          title: 'Амжилттай',
          text: 'Амжилттай',
          type: 'success'
        });
        if (res.error) {
            console.log(res.error)
            this.$notify({
              title: 'Алдаа',
              text: res.error,
              type: 'error'
            });
        }
      }catch(err){
        this.$notify({
          title: 'Алдаа',
          text: err,
          type: 'error'
        });
      }
    },
    async set_order_info(orderid, date, roomid){
        this.order_info = {orderid:orderid, date:date, roomid:roomid};
    },
    async change_report_type(){
      this.orders = []
      this.is_hidden_room_filter = this.search_info.report_type == 1;
    }
  },
  data(){
    return {
      search_info: {
        report_type: 0,
        begindate: moment().add(-1, "month"),
        enddate: moment(),
        room_id: 0,
        room_cat_id: 0,
        order_status: '',
        cus_name: ''
      },
      orders: [],
      room_categories: [],
      order_info: {},
      cus_names: [],
      rooms: [],
      is_hidden_room_filter: false
    };
  },
  mounted(){
     this.get_data();
  }
}
</script>
