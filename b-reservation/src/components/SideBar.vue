<template>
  <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" v-bind:to="{ name: 'dashboard'}">
              <i class="menu-icon fa fa-tachometer"></i>
              <span class="menu-title">Хяналт</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-bind:to="{ name: 'orders'}">
              <i class="menu-icon mdi mdi-table"></i>
              <span class="menu-title">Захиалга</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i class="menu-icon mdi mdi-content-copy"></i>
              <span class="menu-title">Бүртгэл</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                  <router-link class="nav-link" v-bind:to="{ name: 'rooms'}">
                    <i class="menu-icon fa fa-home"></i>
                    <span class="menu-title">Гэр / байшин</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" v-bind:to="{ name: 'room_categories'}">
                    <i class="menu-icon fa fa-home"></i>
                    <span class="menu-title">Гэр бүлэг</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" v-bind:to="{ name: 'services'}">
                    <i class="menu-icon fa fa-money"></i>
                    <span class="menu-title">Үйлчилгээ</span>
                  </router-link>
                  <!-- <a class="nav-link" href="java">Үйлчилгээ</a> -->
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-bind:to="{ name: 'orders'}">
              <i class="menu-icon fa fa-bar-chart-o"></i>
              <span class="menu-title">Тайлан</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- partial -->
</template>

<script>
export default {
  name: 'SideBar', 
}
</script>