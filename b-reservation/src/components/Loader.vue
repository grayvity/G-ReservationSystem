<style>
.loaderBg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  opacity: 0.7;
  background-color: #fff;
  z-index: 999;
  text-align: center;
}

.override {
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 1000;
}

.lds-ellipsis {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #00e4d0;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
<template>
    
    <div v-if="get_is_loading" class="loaderBg">
        <div class="lds-ellipsis override"><div></div><div></div><div></div><div></div></div>
    </div>
    
</template>


<script>
export default {
  name: 'Loader', 
  computed:{
      get_is_loading(){
          return this.$store.getters.get_is_loading;
      }
  }
}
</script>
