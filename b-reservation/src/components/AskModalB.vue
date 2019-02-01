<template>
  <!-- Modal -->
  <b-modal
    id="askBModal"
    ref="askBModal"
    hide-footer
    title="Өрөө"
    aria-labelledby="exampleModalCenterTitle"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Та захиалга цуцлахдаа итгэлтэй байна уу?</h5>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" data-dismiss="modal" v-on:click="add">Үгүй</button>
                <button type="button" class="btn btn-danger mr-2" data-dismiss="modal" v-on:click="accept">
                    Тийм
                </button>
            </div>
            </div>
        </div>
  </b-modal>
</template>

<script>
export default {
  name: "AskModalB",
  data(){
    return {
      show: false
    }
  },
  mounted(){
    let self = this
    let emitEvent = function(bvEvt) {
            const type = bvEvt.type
            self.$emit(type, bvEvt)
        }
      self.$refs.askBModal.emitEvent = emitEvent.bind(self.$root.$refs.askBModal)
  },
  methods: {
    hideModal() {
      this.$refs.askBModal.hide();
      this.show = false
    },
    showModal() {
      // this.show = true
      // console.log(this.show)
      // console.log(this.$refs.askBModal)
      this.$refs.askBModal.show();
    },
  },
};
</script>