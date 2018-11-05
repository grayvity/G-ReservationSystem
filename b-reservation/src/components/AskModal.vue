<template>
     <div class="modal fade" id="askmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Та устгахдаа итгэлтэй байна уу?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" data-dismiss="modal" v-on:click="decline">Үгүй</button>
                <button type="button" class="btn btn-danger mr-2" data-dismiss="modal" v-on:click="accept">
                    Тийм
                </button>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'AskModal',
  methods: {
      accept(){
          this.$emit("onChanged", true) ;
      },
      decline(){
          this.$emit("onChanged", false) ;
      }
  }
}
</script>
