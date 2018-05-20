<template>
  <header class="main-header">
    <!-- Logo -->
    <a href="javascript:volid(0);" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>员</b>工</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>员工</b>管理系统</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"><span class="sr-only">导航</span></a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/static/images/avatar.jpg" class="user-image" alt="用户头像">
              <span class="hidden-xs">{{name}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- Menu Body -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat" v-on:click="logout">注销</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  data: function() {
    return {
      name: ""
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  mounted() {
    var self = this;
    var user = JSON.parse(sessionStorage.getItem("user"));
    self.name = user.name;
  }
};
</script>
<style>
</style>
