<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                        <input type="text" class="form-control" id="type" placeholder="Төрөл">
                    </div>
                    <div class="form-group">
                        <label for="type">Нэр</label>
                        <input type="text" class="form-control" id="type" placeholder="Нэр">
                    </div>
                    <div class="form-group">
                        <label for="type">Тайлбар</label>
                        <input type="text" class="form-control" id="type" placeholder="Тайлбар">
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">₮</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                    </div>
                    <div class="form-check form-check-flat">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" checked>Идэвхитэй
                            <i class="input-helper"></i>
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" data-dismiss="modal">Болих</button>
                <button type="submit" class="btn btn-success mr-2">Хадгалах</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Services',
  data(){
    return{
      info: {}
    }
  },
  created(){
    getServiceList();
  },
  methods: {
    async save(){
        try{
            const res = await fetch("/api/v1/save-service", {
                method: "POST"
            });
            const resJson = await res.json();
        }catch(err){

        }
     

      
    }
  }
}

</script>