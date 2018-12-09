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
                  <label class="col-sm-4 col-form-label">Хугацааны хамрах хүрээ</label>
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
                            Нэр
                          </th>
                          <th>
                            Бүлэг
                          </th>
                          <th>
                            Хүний багтаамж
                          </th>
                          <th>
                            Үнэ
                          </th>
                          <th>
                            Тэмдэглэл
                          </th>
                          <th>
                            Идэвхитэй
                          </th>
                          <th/>
                          <th/>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="info in rooms" v-bind:key="info.id">
                          <td class="font-weight-medium">
                            {{info.id}}
                          </td>
                          <td>
                            {{info.name}}
                          </td>
                          <td>
                            {{info.category_name}}
                          </td>
                          <td>
                            {{info.person_limit}}
                          </td>
                          <td>
                            {{info.price}}
                          </td>
                          <td>
                            {{info.note}}
                          </td>
                          <td class="min">
                            <i v-if="info.is_active === 'Y'" class="fa fa-check-circle-o" style="color:green"></i>
                            <i v-else class="fa fa-eye-slash" style="color:yellow"></i>
                          </td>
                          <td class="min">
                            <a href="javascript:;" v-on:click="setCurrent(info)" data-toggle="modal" data-target="#entryModal">
                              <i class="fa fa-edit"></i>
                            </a>
                          </td>
                          <td class="min">
                            <a href="javascript:;" v-on:click="setCurrent(info)" data-toggle="modal" data-target="#askmodal">
                              <i class="fa fa-trash-o" style="color:red"></i>
                            </a>
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

        const res = await fetch("/api/get-orders", {
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
    async set_order_info(orderid, date, roomid){
        this.order_info = {orderid:orderid, date:date, roomid:roomid};
    }
  },
  data(){
    return { 
      search_info: { current_date: moment(),begindate: moment().add(-4, 'days'), enddate: moment().add(10, 'days'), room_cat_id: 0, order_status: 0 },
      orderList: [],
    }
  },
  mounted(){
     this.get_data();
  }
}
</script>
