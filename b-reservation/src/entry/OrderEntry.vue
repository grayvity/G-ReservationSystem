<template>
    <!-- Modal -->
    <div class="modal fade" id="orderEntryModal" tabindex="-1" role="dialog" aria-labelledby="orderEntryModalCenterTitle" aria-hidden="true">
        <div style="max-width: none; width: 90%;" class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderEntryModalLongTitle">Захиалга бүртгэл</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="forms-sample">
                  
                    <p class="card-description font-weight-bold">
                      Захиалгын мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Дугаар</label>
                          <div class="col-sm-9">
                            <input type="text" v-model="info.id" class="form-control" readonly/>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Огноо</label>
                          <div class="col-sm-9">
                             <input type="date" name="bday" v-model="info.order_date" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Банкаар</label>
                          <div class="col-sm-9">
                            <input type="number" v-model="info.card_amount" pattern="^\d+(\.|\,)\d{2}$" min=0 class="form-control" value="0.00">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Бэлнээр</label>
                          <div class="col-sm-9">
                            <input type="number" v-model="info.cash_amount" pattern="^\d+(\.|\,)\d{2}$" min=0 class="form-control" value="0.00">
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description font-weight-bold">
                      Захиалагчын мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Нэр</label>
                          <div class="col-sm-9">
                            <input type="text" v-model="info.cus_name" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Төрөл</label>
                          <div class="col-sm-9">
                            <input type="text" v-model="info.cus_type" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Утас</label>
                          <div class="col-sm-9">
                            <input type="text" v-model="info.cus_phone" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Имэйл</label>
                          <div class="col-sm-9">
                            <input type="text" v-model="info.cus_email" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description font-weight-bold">
                      Нэмэлт мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-12">
                        <textarea class="form-control" v-model="info.note" id="exampleTextarea1" rows="2"></textarea>
                      </div>
                    </div>
                    <div style="margin-top: 15px;" class="row">
                      <div class="col-md-2">
                        <p class="card-description font-weight-bold">
                          Өрөөний мэдээлэл
                        </p>
                      </div>
                      <div class="col">
                        <a data-toggle="collapse" href="javascript:;" data-target="#roomCollapse" role="button" aria-expanded="true" aria-controls="roomCollapse roomAddCollapse">
                          <i class="fa fa-toggle-down"></i>
                        </a>
                      </div>
                      <div class="col">
                        <div id="roomAddCollapse" class="multi-collapse1 show"  style="text-align:right;">
                          <button  type="button" class="btn btn-primary btn-sm" v-on:click="addRoom">
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
                                <td class="pt-3-half" >
                                  <select class="form-control" v-model="info_room.room_id">
                                    <option value="-1" selected>Сонгоно уу</option>
                                    <option v-for="room in rooms" v-bind:key="room.id" :value="room.id">{{room.name}}</option>
                                  </select>
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" v-model="info_room.person_count" type="number" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" v-model="info_room.child_count" type="number" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input type="date" name="bday" v-model="info_room.start_date" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                                </td>
                                <td class="pt-3-half" >
                                  <input type="date" name="bday" v-model="info_room.end_date" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" v-model="info_room.note" type="text" placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" v-model="info_room.price" type="number" pattern="(^\d+(\.|\,)\d{2}$)" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half">
                                  <a href="javascript:;" style="margin-left: 10px;" v-on:click="removeRoom(info_room)">
                                    <i class="fa fa-trash-o" style="color:red"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                      </div>
                    </div>
                    <div style="margin-top: 15px;" class="row">
                      <div class="col-md-2">
                        <p class="card-description font-weight-bold">
                          Үйлчилгээний мэдээлэл
                        </p>
                      </div>
                      <div class="col">
                        <a data-toggle="collapse" href="javascript:;" data-target="#serviceCollapse" role="button" aria-expanded="true" aria-controls="serviceCollapse serviceAddCollapse">
                          <i class="fa fa-toggle-down"></i>
                        </a>
                      </div>
                      <div class="col">
                        <div id="serviceAddCollapse" class="multi-collapse show"  style="text-align:right;">
                          <button  type="button" class="btn btn-primary btn-sm" v-on:click="addService">
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
                                  <select class="form-control" v-model="info_service.service_id">
                                    <option value="-1" selected>Сонгоно уу</option>
                                    <option v-for="service in services" v-bind:key="service.id" :value="service.id">{{service.name}}</option>
                                  </select>
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" v-model="info_service.note" type="text" placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" v-model="info_service.price" type="number" pattern="(^\d+(\.|\,)\d{2}$)" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half">
                                  <a href="javascript:;" style="margin-left: 10px;" v-on:click="removeService(info_service)">
                                    <i class="fa fa-trash-o" style="color:red"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                      </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" data-dismiss="modal">Болих</button>
                <button type="button" class="btn btn-success mr-2" v-on:click="save">Хадгалах</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'OrderEntry',
  props: ['orderinfo'],
  data() {
    return{
      info: {},
      rooms:[],
      services:[],
      order_rooms: [{room_id: -1, person_count: 0, child_count: 0, start_date: new Date(), end_date: new Date()}],
      order_services: [{service_id: -1}]
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    async getData(){
      try{
        this.$store.dispatch('set_loading_status', true);
        console.log('orderid-------');
        console.log(this.orderinfo);
        const res = await fetch("/api/get-room-and-service", {
            method: "POST",
            body: JSON.stringify({info_id: this.orderinfo.orderid}),
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            }
        });
        const resJson = await res.json();
        console.log(resJson.order_info);
        this.rooms = resJson.rooms;
        this.services = resJson.services;
        console.log(this.rooms)
        console.log(this.services)
      }catch(err){
        this.$notify({
          title: 'Алдаа',
          text: err,
          type: 'error'
        });
        console.log(err)
      }finally{
        this.$store.dispatch('set_loading_status', false)
      }
    },
    async save(){
        try{
          console.log('Saving');
          // let isValidate = await this.checkControl();
          // console.log('isValid: ', isValidate)
          // if(!isValidate){ return; }
            
          this.$store.dispatch('set_loading_status', true)
          this.info.order_rooms = this.order_rooms;
          this.info.order_services = this.order_services;

          const res = await fetch("/api/save-order", {
              method: "POST",
              body: JSON.stringify(this.info),
                  headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              }
          });
          const resJson = await res.json();
          console.log(resJson)
          

          // this.$emit("onCompleted")
          if(resJson.success){
            this.$notify({
              title: 'Амжилттай',
              text: 'Амжилттай хадгалагдлаа',
              type: 'success'
            });
          }

          if (!resJson.success) {
              console.log(resJson.error)
              this.$notify({
                  title: 'Алдаа 0',
                  text: resJson.error,
                  type: 'error'
              });
          }
          if (res.error) {
              console.log(res.error)
              this.$notify({
                  title: 'Алдаа 1',
                  text: res.error,
                  type: 'error'
              });
          }
      }catch(err){
          this.$notify({
                  title: 'Алдаа 2',
                  text: err,
                  type: 'error'
              });
      }finally{
          this.$store.dispatch('set_loading_status', false)
      }
    },
    addRoom(){
      this.order_rooms.push({room_id: -1, person_count: 0, child_count: 0, start_date: new Date(), end_date: new Date()});
    },
    addService(){
      this.order_services.push({service_id: -1});
    },
    removeService(info){
      this.order_services.splice( this.order_services.indexOf(info), 1 );
    },
    removeRoom(info){
      this.order_rooms.splice( this.order_rooms.indexOf(info), 1 );
    }
  }
}

</script>