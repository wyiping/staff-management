<template>
    <div class="wrapper skin-blue">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-wrapper">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <footer class="main-footer">
			<div class="pull-right hidden-xs">
				<b>Version</b> 2.4.0
			</div>
			<strong>Copyright &copy; 2018
				<a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights reserved.
		</footer>
    </div>
</template>

<script>
import "@/assets/css/bootstrap.css";
import "@/assets/css/AdminLTE.css";
import "@/assets/css/all-skins.css";
import "@/assets/css/font-awesome.css";
import "@/assets/js/jquery.js";
import "@/assets/js/bootstrap.js";
import "@/assets/js/AdminLTE.js";
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  components: {
    vHead,
    vSidebar
  }
};
</script>
