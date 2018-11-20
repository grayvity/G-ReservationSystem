<template>  
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-6">
        <h4 class="card-title">Захиалга жагсаалт</h4>
      </div>
      <div class="col-md-6" style="text-align:right;">
        <button type="button" class="btn btn-primary btn-fw" data-toggle="modal" data-target="#orderEntryModal">
          <i class="fa fa-plus"></i>нэмэх
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-10">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Хугацааны хамрах хүрээ</label>
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
                  <div class="col-sm-2" >
                      <button class="btn btn-success mr-2" v-on:click="get_data">Шүүх</button>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:none" class="row">
              <div class="col-md-8">
                <div class="form-group row">
                  <div class="col-sm-3">
                      <date-picker class="w-100" v-model="search_info.current_date" placeholder="Сонгоно уу" format="YYYY-MM-DD" type="date" max="3000-12-31" min="1000-01-01" lang="en">
                        </date-picker>
                  </div>
                  <label class="col-sm-2 col-form-label"> - өдрөөр - </label>
                  <div class="col-sm-3">
                      <select class="form-control" v-model="search_info.order_status">
                        <option value="0" selected>Бүх</option>
                        <option value="1" selected>Захиалгагүй</option>
                        <option value="2" selected>Захиалгатай</option>
                      </select>
                  </div>
                  <label class="col-sm-1 col-form-label"> - </label>
                  <div class="col-sm-3">
                      <select class="form-control" v-model="search_info.room_cat_id">
                        <option value="0" selected>Бүх</option>
                        <option v-for="room_cat in room_categories" v-bind:key="room_cat.id" :value="room_cat.id">{{room_cat.name}}</option>
                      </select>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group row">
                  <div class="col-sm-2" >
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
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th style="padding: 5px 10px 5px 10px !important" class="text-center"></th>
                          <th style="padding: 5px 10px 5px 10px !important" class="text-center" v-for="day in orderDays" v-bind:key="day.day">
                            {{ day.day }}
                            {{ day.weekday }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orderList" v-bind:key="order.name">
                          <td style="padding: 5px 10px 5px 10px !important" >
                            {{order.name}}
                          </td>
                          <td style="padding: 5px 10px 5px 10px !important" v-for="cell in order.cols" v-bind:key="cell.date" v-bind:colspan="cell.orderday" class="py-1">
                            <button type="button" v-bind:class="{'btn-inverse-success w-100' : cell.status == 'confirmed','btn-inverse-warning w-100' : cell.status == 'new','btn-inverse-secondary w-100' : cell.status == 'default',}" class="btn btn-rounded">{{ cell.note }}</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <OrderEntry/>
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
import DatePicker from 'vue2-datepicker'
export default {
  name: 'Orders',
  components: {OrderEntry, DatePicker},
  methods:{
    async get_data(){
      try{
        this.$store.dispatch('set_loading_status', true)

        const res = await fetch("/api/get-order-info", {
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
        // console.log(resJson.datas.range_days);
        this.orderDays = resJson.datas.range_days;
        this.orderList = resJson.datas.orderlist;
        this.room_categories = resJson.datas.room_categories;
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
  },
  data(){
    return { 
      search_info: { current_date: moment(),begindate: moment().add(-4, 'days'), enddate: moment().add(10, 'days'), room_cat_id: 0, order_status: 0 },
      orderList: [],
      orderDays: [],
      room_categories: []
    }
  },
  // created(){
  //   this.get_data();
  // },
  mounted(){
     this.get_data();
  }
}
</script>
