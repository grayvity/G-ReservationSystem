<template>  
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-6">
        <h4 class="card-title">Захиалга жагсаалт</h4>
      </div>
      <div class="col-md-6" style="text-align:right;">
        <button type="button" class="btn btn-primary btn-fw" v-on:click="set_order_info('', '', '')" data-toggle="modal" data-target="#orderEntryModal">
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
                  <label class="col-sm-4 col-form-label">Огноо</label>
                  <div class="col-sm-3">
                      <date-picker class="w-100" v-model="search_info.begindate" placeholder="Сонгоно уу" format="YYYY-MM-DD" type="date" max="3000-12-31" min="1000-01-01" lang="en">
                        </date-picker>
                  </div>
                  <div class="col-sm-3">
                      <date-picker class="w-100" v-model="search_info.enddate" placeholder="Сонгоно уу" format="YYYY-MM-DD" type="date" max="3000-12-31" min="1000-01-01" lang="en">
                        </date-picker>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group row">
                  <div class="col">
                      <select class="form-control" v-model="search_info.room_cat_id">
                        <option value="0" selected>Бүх</option>
                        <option v-for="room_cat in room_categories" v-bind:key="room_cat.id" :value="room_cat.id">{{room_cat.name}}</option>
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
                            {{order.status}}
                          </td>
                          <td>
                            {{order.start_date}}
                          </td>
                          <td>
                            {{order.end_date}}
                          </td>
                          <td>
                            {{order.cus_name}}
                          </td>
                          <td>
                            {{order.cash_amount}}
                          </td>
                          <td>
                            {{order.card_amount}}
                          </td>
                          <td>
                            {{order.total_amount}}
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
export default {
  name: 'Report',
  components: {DatePicker},
  methods:{
    async get_data(){
      try{
        this.$store.dispatch('set_loading_status', true)

        const res = await fetch("/api/get-report", {
            method: "POST",
            body: JSON.stringify({search_info: this.search_info}),
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
        console.log(resJson.datas);
        this.orders = resJson.datas.order;
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
      }finally{
          this.$store.dispatch('set_loading_status', false);
      }
    },
    async set_order_info(orderid, date, roomid){
        this.order_info = {orderid:orderid, date:date, roomid:roomid};
    }
  },
  data(){
    return { 
      search_info: { current_date: moment(),begindate: moment().add(-4, 'days'), enddate: moment().add(10, 'days'), room_cat_id: 0, order_status: 0 },
      orders: [],
    }
  },
  mounted(){
     this.get_data();
  }
}
</script>
