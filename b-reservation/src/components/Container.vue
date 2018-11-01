<template>
    <div class="container-scroller">
        <Navbar/>
        <div class="container-fluid page-body-wrapper">
            <SideBar/> 
            <div class="main-panel">
                <router-view></router-view>
                <Footer/>
            </div>     
        </div>  
    </div>
</template>


<script>

import Navbar from "@/components/Navbar.vue";
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'Container', 
  components: {Navbar, SideBar, Footer},
}
</script>