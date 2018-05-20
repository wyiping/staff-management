<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/static/images/avatar.jpg" class="img-circle" alt="用户头像">
        </div>
        <div class="pull-left info">
          <p>{{user.name}}</p>
          <a href="#">
          <i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- sidebar menu: : style can be found in sidebar.less -->

      <div v-if="user.isAdmin">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">导航</li>
          <li>
            <router-link :to="'/admin/detail/' + user.id">
              <i class="fa fa-user-md text-aqua"></i>
              <span>我的信息</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/users">
              <i class="fa fa-search text-aqua"></i>
              <span>员工列表</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/departments">
              <i class="fa fa-building text-aqua"></i>
              <span>部门管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/registerVerify">
              <i class="fa fa-id-badge text-aqua"></i>
              <span>注册审核</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/departmentVerify">
              <i class="fa fa-id-badge text-aqua"></i>
              <span>更换部门审核</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">导航</li>
          <li>
            <router-link :to="'/user/detail/' + user.id">
              <i class="fa fa-user-md text-aqua"></i>
              <span>我的信息</span>
            </router-link>
          </li>
          <li>
            <router-link to="/user/users">
              <i class="fa fa-search text-aqua"></i>
              <span>员工列表</span>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  data: function() {
    return {
      user: {}
    };
  },
  mounted() {
    var self = this;
    let user = JSON.parse(sessionStorage.getItem("user"));
    self.user = user;
  }
};
</script>
<style scoped>
</style>
