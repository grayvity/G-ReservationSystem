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
                  <button type="button" class="btn btn-primary btn-fw" v-on:click="createNew" data-toggle="modal" data-target="#entryModal">
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
                  <tr v-for="info in services" v-bind:key="info.id">
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
              <Entry v-bind:info="current_info"/>
              <AskModal @onChanged="modal_value_changed"/>
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
import AskModal from "@/components/AskModal.vue";

export default {
  name: 'Services',
  components: {Entry, AskModal},
  data(){
    return{
      services: [],
      current_info : {},
      dialog_result : false
      // info: {is_active : true}
    }
  },
  created(){
    this.getServiceList();
  },
  methods: {
    async getServiceList(){
      try{
        this.$store.dispatch('set_loading_status', true)
        const res = await fetch("/api/get-service-list", {
          method: "GET"
        });
        const resJson = await res.json();

        // console.log(resJson)

        this.services = resJson.services;

        this.$store.dispatch('set_loading_status', false)
      }catch(err){
        this.$store.dispatch('set_loading_status', false)
        console.log(err)
      }
    },
    setCurrent(info){
      this.current_info = info;
    },
    delete(id){
      console.log('deleting...', this.dialog_result)

    },
    createNew(){
      this.current_info = {}
    },
    modal_value_changed(value){
      if(value){
        
      }
      console.log('hi',value)
    }
  }
}
</script>