<template>  
  <div class="content-wrapper">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <h4 class="card-title">Үйлчилгээний жагсаалт</h4>
                </div>
                <div class="col-md-6" style="text-align:right;">
                  <button type="button" class="btn btn-primary btn-fw" data-toggle="modal" data-target="#exampleModalCenter">
                    <i class="fa fa-plus"></i>нэмэх
                  </button>
                </div>
              </div>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>
                      Төрөл
                    </th>
                    <th>
                      Нэр
                    </th>
                    <th>
                      Тайлбар
                    </th>
                    <th>
                      Үнэ
                    </th>
                    <th/>
                    <th/>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="info in services">
                    <td class="font-weight-medium">
                      1
                    </td>
                    <td>
                      {{info.type}}
                    </td>
                    <td>{{info.name}}</td>
                    <td>
                      {{info.description}}
                    </td>
                    <td>
                        {{info.price}}
                    </td>
                    <td class="min">
                      <i v-if="info.is_active" class="fa fa-check-circle-o" style="color:green"></i>
                      <i v-else class="fa fa-eye-slash" style="color:yellow"></i>
                    </td>
                    <td class="min">
                      <a href="javascript:;" data-toggle="modal" data-target="#exampleModalCenter">
                        <i class="fa fa-edit"></i>
                      </a>
                    </td>
                    <td class="min">
                      <i class="fa fa-trash-o"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Entry/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <!-- content-wrapper ends -->
</template>

<script>

import Entry from "@/entry/ServiceEntry.vue";

export default {
  name: 'Services',
  components: {Entry},
  data(){
    return{
      services: []
    }
  },
  created(){
    this.getServiceList();
  },
  methods: {
    async getServiceList(){
      const res = await fetch("/api/get-service-list", {
        method: "GET"
      });
      const resJson = await res.json();
      console.log(resJson)

      this.services = resJson.services;
    }
  }
}
</script>