<template>
    <!-- Modal -->
    <div class="modal fade" id="entryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Үйлчилгээ бүртгэл</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="forms-sample">
                    <div class="form-group">
                        <label for="type">Төрөл</label>
                        <input type="text" class="form-control" id="type" v-model="info.type" placeholder="Төрөл">
                    </div>
                    <div class="form-group">
                        <label for="type">Нэр</label>
                        <input type="text" class="form-control" id="name" v-model="info.name" placeholder="Нэр">
                    </div>
                    <div class="form-group">
                        <label for="type">Тайлбар</label>
                        <input type="text" class="form-control" id="description" v-model="info.description" placeholder="Тайлбар">
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">₮</span>
                        </div>
                        <input type="number" value="" min="0" step="100" data-number-to-fixed="2" data-number-stepfactor="100" class="form-control currency" v-model="info.price"/>
                    </div>
                    <div class="form-check form-check-flat">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" checked v-model="info.is_active">Идэвхитэй
                            <i class="input-helper"></i>
                        </label>
                    </div>
                    
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" data-dismiss="modal">Болих</button>
                <button type="button" class="btn btn-success mr-2" data-dismiss="modal" v-on:click="save">
                    <i class="fa fa-save"></i>
                    Хадгалах
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
  name: 'Services',
  props: ['info'],
  
  created(){
       
    console.log('entry created!')
  },
  methods: {
      async checkControl(){
        if (!this.info.type || this.info.type.length == 0){
            this.$notify({
                title: 'Анхаар',
                text: 'Талбар бүрэн бөглөнө үү.',
                type: 'warn'
            });    
            return false;
        }
        else if (!this.info.name || this.info.name.length == 0){
            this.$notify({
                title: 'Анхаар',
                text: 'Талбар бүрэн бөглөнө үү.',
                type: 'warn'
            });    
            return false;
        }
        else if (!this.info.price || this.info.price.length == 0 || this.info.price <= 0){
            this.$notify({
                title: 'Анхаар',
                text: 'Талбар бүрэн бөглөнө үү.',
                type: 'warn'
            });    
            return false;
        }
        return true;
    },
    async save(){
        try{
            console.log('Saving');
            let isValidate = await this.checkControl();
            console.log('isValid: ', isValidate)
            
            if(!isValidate){ return; }
            this.$store.dispatch('set_loading_status', true)

            const res = await fetch("/api/save-service", {
                method: "POST",
                body: JSON.stringify(this.info),
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            const resJson = await res.json();
            console.log(resJson)
            this.$notify({
                title: 'Амжилттай',
                text: 'Амжилттай хадгалагдлаа',
                type: 'success'
            });
            this.$emit("onCompleted")
            

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
    }
    
  }
}

</script>