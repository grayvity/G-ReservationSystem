<template>
    <div>
        <!-- {{get_is_logged}} -->
        <Home v-if='get_is_logged'/>
        <Login v-else/>
    </div>    
</template>

<script>
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";

export default {
  name: 'PageManager',
  components: {Home, Login},
  computed:{
    get_is_logged(){
        return this.$store.getters.get_is_logged == 1;
    }
  },
  methods:{
      change_path(){
          return <Login/>
      }
  }
}
</script>