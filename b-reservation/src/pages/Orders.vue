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
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Өрөө&гэр</th>
                          <th v-for="day in orderDays" v-bind:key="day.day">
                            {{ day.day }}
                            {{ day.week_day }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orderList" v-bind:key="order.name">
                          <td>
                            {{order.name}}
                          </td>
                          <td v-for="cell in order.cols" v-bind:key="cell.date" v-bind:colspan="cell.orderday" class="py-1">
                            <button type="button" v-bind:class="{'btn-inverse-success w-100' : cell.status == 2,'btn-inverse-warning w-100' : cell.status == 1,'btn-inverse-secondary w-50' : cell.status == 0,}" class="btn btn-rounded">{{ cell.note }}</button>
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
export default {
  name: 'Orders',
  components: {OrderEntry},
  data(){
    return { 
      orderList: [
        {name: 'ger#1', cols: [
          {date: '01', orderday : 0, note : '', status : 0},
          {date: '02', orderday : 4, note : '99999999', status : 1},
          {date: '06', orderday : 0, note : '', status : 0},
          {date: '07', orderday : 1, note : '88888888', status : 2},
          {date: '08', orderday : 0, note : '', status : 0},
          {date: '09', orderday : 1, note : '77777777', status : 2},
          {date: '10', orderday : 1, note : '77777777', status : 2}]}
        ],
      orderDays: [
        {date: '1', day: '11/01', week_day:'Пүр'},
        {date: '2', day: '11/02', week_day:'Пүр'},
        {date: '3', day: '11/03', week_day:'Пүр'},
        {date: '1', day: '11/04', week_day:'Пүр'},
        {date: '1', day: '11/05', week_day:'Пүр'},
        {date: '1', day: '11/06', week_day:'Пүр'},
        {date: '1', day: '11/07', week_day:'Пүр'},
        {date: '1', day: '11/08', week_day:'Пүр'},
        {date: '1', day: '11/09', week_day:'Пүр'},
        {date: '1', day: '11/10', week_day:'Пүр'}
      ]
    }
  }
}
</script>