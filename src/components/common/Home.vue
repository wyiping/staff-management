<template>
  <section id="app-container">
    <x-header></x-header>
    <section class="page">
      <nav-menu></nav-menu>
      <div class="page-container">
        <transition name="fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </section>
  </section>
</template>
<script>
import "@/assets/css/font-awesome.css";
import "@/assets/css/bulma.css";
// vuex全局数据
import store from "../../store";
import XHeader from "./XHeader";
import NavMenu from "./NavMenu";
export default {
  store: store,
  components: {
    XHeader,
    NavMenu
  }
};
</script>
<style>
@media screen and (min-width: 769px) {
  .modal-content,
  .modal-card {
    margin: inherit;
  }
}
html,
body {
  background-color: #fff;
  font-family: Helvetica Neue, Helvetica, "Hiragino Sans GB", "Microsoft YaHei",
    "微软雅黑", Arial, sans-serif;
  overflow: hidden;
}
#app-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
section.page {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  margin: 0;
}
section.page-content,
.fade {
  opacity: 1;
  transition: opacity 300ms;
}

a .icon {
  vertical-align: baseline;
  margin-right: 5px;
}
#nav-section{
    background-color: rgb(0,151,129) !important;
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
}
#nav-section .nav{
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.page-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #fff;
}
.page-content {
  position: absolute;
  left: 220px;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  transition: all 0.3s;
}
.inner-header,
.inner-content {
  padding: 20px;
}
</style>