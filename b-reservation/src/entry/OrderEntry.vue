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
    <form class="forms-sample" style="overflow-y: auto;height: 600px;">
      <p class="card-description font-weight-bold">Захиалгын мэдээлэл</p>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Дугаар</label>
            <div class="col-sm-9">
              <input ref="i_info_id" type="text" v-model="info.id" class="form-control" readonly>
            </div>
          </div>
        </div>
        <div class="col-md-4">
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
                :disabled="info.status == 'confirmed'"
              ></date-picker>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Тайлбар</label>
            <div class="col-sm-9">
              <textarea :disabled="info.status == 'confirmed'" ref="i_info_note" class="form-control" v-model="info.note" rows="1"></textarea>
            </div>
          </div>
        </div>
      </div>
      <p class="card-description font-weight-bold">Захиалагчын мэдээлэл</p>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Нэр</label>
            <div class="col-sm-9">
              <input :disabled="info.status == 'confirmed'" ref = "i_info_cus_name" type="text" v-model="info.cus_name" class="form-control">
            </div>
          </div>
        </div>
        <!-- <div class="col-md-3">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Төрөл</label>
            <div class="col-sm-9">
              <input :disabled="info.status == 'confirmed'" ref = "i_info_cus_type" type="text" v-model="info.cus_type" class="form-control">
            </div>
          </div>
        </div> -->
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Утас</label>
            <div class="col-sm-9">
              <input :disabled="info.status == 'confirmed'" ref="i_info_cus_phone" type="text" v-model="info.cus_phone" class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Имэйл</label>
            <div class="col-sm-9">
              <input :disabled="info.status == 'confirmed'" ref="i_info_cus_email" type="text" v-model="info.cus_email" class="form-control">
            </div>
          </div>
        </div>
      </div>
      <p class="card-description font-weight-bold">Төлбөрийн мэдээлэл</p>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Банкаар</label>
            <div class="col-sm-9">
              <money :disabled="info.status == 'confirmed'" ref="i_info_card_amount" class="form-control" v-model="card_amount" v-bind="money"></money>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Бэлнээр</label>
            <div class="col-sm-9">
              <money :disabled="info.status == 'confirmed'" ref="i_info_cash_amount" class="form-control" v-model="cash_amount" v-bind="money"></money>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Төлсөн</label>
            <div class="col-sm-9">
              <span ref="i_info_total_amount" class="form-control">{{ total_amount | currency}}</span>
            </div>
          </div>
        </div>
        
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group row">
            
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Нийт төлбөр</label>
            <div class="col-sm-9">
              <span ref="i_info_price" class="form-control">{{ total_price | currency}}</span>
            </div>
          </div>
        </div>
         <div class="col-md-4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Төлөх</label>
            <div class="col-sm-9">
              <span ref="i_info_price" class="form-control">{{ diff_price | currency}}</span>
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
            <button :disabled="info.status == 'confirmed'" type="button" class="btn btn-primary btn-sm" v-on:click="addRoom">
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
                  <th class="text-center">Хоног / Гарах огноо</th>
                  <th class="text-center">Тайлбар</th>
                  <th class="text-center">Төлбөр</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="info_room in order_rooms" v-bind:key="info_room.id">
                  <td class="pt-3-half">
                    <select :disabled="info.status == 'confirmed'" :ref="'room_col_' + info_room.id" class="form-control" @change="change_room($event, info_room)" v-model="info_room.room_id">
                      <option value="-1" selected>Сонгоно уу</option>
                      <option
                        v-for="room in rooms"
                        v-bind:key="room.id"
                        :value="room.id"
                      >{{room.name}}</option>
                    </select>
                  </td>
                  <td class="pt-3-half">
                    <div class="row">
                      <label class="form-control col-md-4" style="border:none;">{{info_room.person_price}} X </label>
                      <input :disabled="info.status == 'confirmed'"
                        class="form-control col-md-3"
                        v-model="info_room.person_count"
                        v-on:input="calc_room_row_price(info_room)"
                        type="number"
                        min="0"
                        placeholder="Оруулна уу"
                      >
                      <label class="form-control col-md-4" style="border:none;"> = {{info_room.person_price * info_room.person_count}}</label>
                    </div>
                  </td>
                  <td class="pt-3-half">
                    <div class="row">
                      <label class="form-control col-md-4" style="border:none;">{{info_room.child_price}} X </label>
                      <input :disabled="info.status == 'confirmed'"
                        class="form-control col-md-3"
                        v-model="info_room.child_count"
                        v-on:input="calc_room_row_price(info_room)"
                        type="number"
                        min="0"
                        placeholder="Оруулна уу"
                      >
                      <label class="form-control col-md-4" style="border:none;"> = {{info_room.child_price * info_room.child_count}}</label>
                    </div>
                  </td>
                  <td class="pt-3-half">
                    <date-picker :disabled="info.status == 'confirmed'"
                      class="form-datepicker"
                      v-model="info_room.start_date"
                      placeholder="Сонгоно уу"
                      v-on:input="calc_room_row_end_date(info_room)"
                      format="YYYY-MM-DD"
                      type="date"
                      max="3000-12-31"
                      min="1000-01-01"
                      lang="en"
                    ></date-picker>
                  </td>
                  <td class="pt-1-half">
                    <div class="row">
                      <input :disabled="info.status == 'confirmed'"
                        class="form-control col-md-4"
                        v-model="info_room.days"
                        v-on:input="calc_room_row_end_date(info_room)"
                        type="number"
                        min="0"
                        placeholder=""
                      >
                      <label class="form-control col-md-7" style="border:none;"> / {{info_room.end_date | moment}}</label>
                    </div>
                  </td>
                  <td class="pt-3-half">
                    <input :disabled="info.status == 'confirmed'"
                      class="form-control"
                      v-model="info_room.note"
                      type="text"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <money style="min-width: 80px;" :disabled="info.status == 'confirmed'" class="form-control" 
                      v-model="info_room.price" v-bind="money"></money>
                    <!-- <input
                      class="form-control"
                      v-model="info_room.price"
                      type="number"
                      pattern="(^\d+(\.|\,)\d{2}$)"
                      min="0"
                      placeholder="Оруулна уу"
                    > -->
                  </td>
                  <td v-if="info.status != 'confirmed'" class="pt-3-half">
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
                  <th class="text-center">Нийт: {{room_total_price | currency}}</th>
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
            <button :disabled="info.status == 'confirmed'" type="button" class="btn btn-primary btn-sm" v-on:click="addService">
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
                    <select :disabled="info.status == 'confirmed'" class="form-control" @change="change_service($event, info_service)" v-model="info_service.service_id">
                      <option value="-1" selected>Сонгоно уу</option>
                      <option
                        v-for="service in services"
                        v-bind:key="service.id"
                        :value="service.id"
                      >{{service.name}}</option>
                    </select>
                  </td>
                  <td class="pt-3-half">
                    <input :disabled="info.status == 'confirmed'"
                      class="form-control"
                      v-model="info_service.note"
                      type="text"
                      placeholder="Оруулна уу"
                    >
                  </td>
                  <td class="pt-3-half">
                    <money :disabled="info.status == 'confirmed'" class="form-control" v-model="info_service.price" v-bind="money"></money>
                    <!-- <input
                      class="form-control"
                      v-model="info_service.price"
                      type="number"
                      pattern="(^\d+(\.|\,)\d{2}$)"
                      min="0"
                      placeholder="Оруулна уу"
                    > -->
                  </td>
                  <td v-if="info.status != 'confirmed'" class="pt-3-half">
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
                  <th class="text-center">Нийт: {{service_total_price | currency}}</th>
                  <th class="text-center"></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
    <div id="printMe" style="display:none">
                <link rel="stylesheet" href="./static/css/style.css">
                <div class="invoice-box">
                
                <table cellpadding="0" cellspacing="0">
                  <tr class="top justify-content-center">
                    <h2>Хульж ресорт</h2>
                  </tr>
                  <tr class="information">
                    <td colspan="4">
                      <table>
                        <tr>
                          <td>
                            Захиалгын #: {{info.id}}<br> Огноо: {{info.confirmed_date | moment}}
                          </td>

                          <td>
                            {{ info.cus_type ? info.cus_type : 'Захиалагч' }}<br> {{info.cus_name}}<br> {{info.cus_email}}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="heading">
                    <td colspan="3">Төлбөрийн хэлбэр</td>
                    <td>Дүн</td>
                  </tr>

                  <tr class="item">
                    <td colspan="3">Банкаар</td>
                    <td>{{ info.card_amount | currency }}</td>
                  </tr>
                  <tr class="item">
                    <td colspan="3">Бэлнээр</td>
                    <td>{{ info.cash_amount | currency }}</td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td>Төлсөн нийт дүн : {{ total_amount | currency }}</td>
                  </tr>
                  <tr class="heading">
                    <td>Гэр</td>
                    <td>Том хүн</td>
                    <td>Хүүхэд</td>
                    <td>Дүн</td>
                  </tr>

                  <tr class="item" v-for="room in order_rooms" v-bind:key="room.room_id">
                    <td>{{room.room_name}}</td>
                    <td>{{room.person_count}}</td>
                    <td>{{room.child_count}}</td>
                    <td>{{room.price | currency}}</td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td>Нийт: {{ room_total_price | currency }}</td>
                  </tr>
                  <tr class="heading">
                    <td colspan="3">Үйлчилгээ</td>
                    <td>Дүн</td>
                  </tr>

                  <tr class="item" v-for="room in order_services" v-bind:key="room.id">
                    <td colspan="3">{{room.service_name}}</td>
                    <td>{{room.price | currency}}</td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td>Нийт: {{ service_total_price | currency }}</td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td>Төлбөрийн нийт дүн: {{ total_price | currency }}</td>
                  </tr>
                </table>
              </div>
              </div>
    <div class="modal-footer">
      <button class="btn btn-light" @click="hideModal">Болих</button>
      <button v-if="info.status" type="button" class="btn btn-danger mr-2" v-on:click="modalAddShow = !modalAddShow">Цуцлах</button>
      <button class="btn btn-primary mr-2 hidden-print" v-on:click="print()"><span class="glyphicon glyphicon-print" aria-hidden="true"></span> Хэвлэх</button>
      <button v-if="info.status != 'confirmed'" type="button" class="btn btn-primary mr-2" v-on:click="save('new')">Түр хадгалах</button>
      <button v-if="info.status != 'confirmed'" type="button" class="btn btn-success mr-2" v-on:click="save('confirmed')">Тооцоо хаах</button>
    </div>
    <b-modal
      id="askBModal"
      ref="askBModal"
      hide-footer
      hide-header
      v-model="modalAddShow"
      @hidden="modalAddHidden"
      :centered="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Та тухайн захиалга цуцлахдаа итгэлтэй байна уу?</h5>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" v-on:click="hideAsk(false)">Үгүй</button>
                <button class="btn btn-danger mr-2"  v-on:click="hideAsk(true)">
                    Тийм
                </button>
            </div>
            </div>
        </div>
    </b-modal>
  </b-modal>
</template>
<script>
import DatePicker from "vue2-datepicker";
import {Money} from 'v-money'
import VueCurrencyFilter from 'vue-currency-filter'
import Vue from 'vue'
import AskModalB from "@/components/AskModalB.vue";
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
  ]
}
Vue.use(VueHtmlToPaper, options, VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
export default {
  components: { DatePicker, Money, AskModalB },
  name: "OrderEntry",
  props: ["orderinfo"],
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY-MM-DD');
    },
  },
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
    diff_price:function(){
      return this.total_price - this.total_amount;
    },
  },
  data() {
    return {
      cash_amount: 0,
      card_amount: 0,
      modalAddShow: false,
      info: {cash_amount: 0, card_amount:0},
      rooms: [],
      services: [],
      order_rooms: [],
      order_services: [],
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
  mounted(){
    let self = this
    let emitEvent = function(bvEvt) {
            const type = bvEvt.type
            self.$emit(type, bvEvt)
        }
      self.$refs.askBModal.emitEvent = emitEvent.bind(self.$refs.askBModal)
     // not need to set focus on main modal if additional modal is open
        let onFocusout = function(evt) {
            // If focus leaves modal, bring it back
            // 'focusout' Event Listener bound on content
            const content = self.$refs.content
            if (
                !self.modalAddShow &&
                !self.noEnforceFocus &&
                self.is_visible &&
                content &&
                !content.contains(evt.relatedTarget)
            ) {
                content.focus({preventScroll: true})
            }
        };
        self.$refs.entryModal.onFocusout = onFocusout.bind(self.$refs.entryModal)

        // replace show function for additional modal
        let show = function() {

            if (this.is_visible) {
                return
            }
            // const showEvt = new BvEvent('show', {
            //     cancelable: true,
            //     vueTarget: this,
            //     target: this.$refs.entryModal,
            //     relatedTarget: null
            // })
            // this.emitEvent(showEvt)
            // if (showEvt.defaultPrevented || this.is_visible) {
            //     // Don't show if canceled
            //     return
            // }
            this.doShow()
        }
        self.$refs.askBModal.show = show.bind(self.$refs.askBModal)
  },
  methods: {
    print() {
      this.$htmlToPaper('printMe');
    },
    hideAsk(isCancel){
      this.modalAddShow = false
      if(isCancel)
      {
        this.save('canceled')
      }
    },
    modalAddHidden() {
      if (this.modalShow) {
          const vueModal = this.$root.$refs.entryModal
          vueModal.onBeforeEnter()
          vueModal.is_block = true
          vueModal.is_show = true
          vueModal.is_transitioning = false
          vueModal.$nextTick(() => {
              // Don't try and focus if we are SSR
              if (typeof document === 'undefined') {
                  return
              }
              const content = vueModal.$refs.content
              const modal = vueModal.$refs.entryModal
              const activeElement = document.activeElement
              if (activeElement && content && content.contains(activeElement)) {
                  // If activeElement is child of content, no need to change focus
              } else if (content) {
                  // Focus the modal content wrapper
                  content.focus({preventScroll: true})
              }
            /*
              const shownEvt = new BvEvent('shown', {
                  cancelable: false,
                  vueTarget: vueModal,
                  target: modal,
                  relatedTarget: null
              })
              vueModal.emitEvent(shownEvt)
              */
          })
      }
    },
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
        service_info.price = 0;
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
              person_price: 0,
              child_count: 0,
              child_price: 0,
              start_date: moment(),
              days: 1,
              end_date: moment(),
              price: 0
            }
          ];
          this.order_services = [{ id:0, service_id: -1, price: 0 }];
          this.info.card_amount = 0;
          this.info.cash_amount = 0;
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
    checkControl(info_status){
      let isValidate = true;
      let validate_msg = 'Талбар бүрэн бөглөнө үү.';
      let is_focus = false;
      if(!this.info.order_date || this.info.order_date.length < 1){
        isValidate = false;
        validate_msg += '\n - Огноо ';
        if (!is_focus){
          $(this.$refs['i_info_order_date']).focus();
          is_focus = true;
        }
      }
      if(!this.info.cus_name || this.info.cus_name.length < 1){
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
      if(!this.info.cus_phone || this.info.cus_phone.length < 1){
        isValidate = false;
        validate_msg += '\n - Захиалагчын утас ';
        if (!is_focus){
          $(this.$refs['i_info_cus_phone']).focus();
          is_focus = true;
        }
      }

      // if(!this.info.cus_email || this.info.cus_email.length < 1){
      //   isValidate = false;
      //   validate_msg += '\n - Захиалагчын имэйл ';
      //   if (!is_focus){
      //     $(this.$refs['i_info_cus_email']).focus();
      //     is_focus = true;
      //   }
      // }
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
      if(isValidate && info_status == 'confirmed' && this.total_price == 0)
      {
        isValidate = false;
        validate_msg += '\n - Төлөх дүн 0 үед тооцоо хаах боломжгүй. ';
      }
      if(isValidate && info_status == 'confirmed' && this.total_amount < this.total_price)
      {
        isValidate = false;
        validate_msg += '\n - Төлсөн дүн нь төлөх дүнгээс бага үед тооцоо хаах боломжгүй. ';
      }
      return [isValidate, validate_msg];
    },
    async save(info_status) {
      try {
        console.log("Saving");
        let valid_param = await this.checkControl(info_status);
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
        this.info.updated_by = 1;//this.$store.getters.get_logged_user.role
        const res = await fetch("/api/save-order", {
          method: "POST",
          body: JSON.stringify(this.info),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resJson = await res.json();
        if (resJson.error) {
          this.$notify({
            title: "Алдаа 1",
            text: resJson.error,
            type: "error"
          });
          //if success
        } else {
          this.info.id = resJson.order_id;
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
          title: "Алдаа",
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
        days: 1,
        end_date: moment(),
        price:0
      });
    },
    addService() {
      var ids = []
      for(var x in this.order_services)
        ids.push(this.order_services[x].id);
      var max_id = ids.length > 0 ? Math.max(...ids) : 0;
      this.order_services.push({id:max_id + 1, service_id: -1, price:0 });
    },
    removeService(info) {
      this.order_services.splice(this.order_services.indexOf(info), 1);
    },
    removeRoom(info) {
      this.order_rooms.splice(this.order_rooms.indexOf(info), 1);
    },
    calc_room_row_price(row){
      row.price = row.person_count * row.person_price + row.child_price * row.child_count;
    },
    calc_room_row_end_date(row){
      row.end_date = moment(row.start_date).add(row.days - 1, "days");
    }
  },
};
</script>