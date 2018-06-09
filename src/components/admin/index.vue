<template>
  <x-content>
    <span slot="title"><span class="icon is-middle"><i class="fa fa-home is-right-5"></i></span>首页</span>
    <div class="has-text-centered">
      <h2>
        <strong>欢迎来到员工管理系统</strong>
      </h2>
    </div>
    <div class="box no-shadow">
      <p class="title">一个简单的员工管理系统</p>
      <p class="subtitle">轻松管理员工信息</p>
    </div>

    <h2>
        <strong>功能</strong>
      </h2>
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-warning" v-on:click="linkTo('/admin/users')">
          <p class="title">管理员工</p>
          <p class="subtitle">&nbsp;</p>
        </article>
      </div>
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-success" v-on:click="linkTo('/admin/registerVerify')">
          <p class="title">注册审核</p>
          <p class="subtitle"></p>
        </article>
      </div>
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-info" v-on:click="linkTo('/admin/departmentVerify')">
          <p class="title">部门审核</p>
          <p class="subtitle"></p>
        </article>
      </div>
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-primary" v-on:click="linkTo('/admin/roleVerify')">
          <p class="title">角色审核</p>
          <p class="subtitle"></p>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-info" v-on:click="linkTo('/user/detail')">
          <p class="title">查看信息</p>
          <p class="subtitle">&nbsp;</p>
        </article>
      </div>
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-primary" v-on:click="linkTo('/admin/edit/'+id)">
          <p class="title">修改资料</p>
          <p class="subtitle"></p>
        </article>
      </div>
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-warning" v-on:click="linkTo('/admin/departments')">
          <p class="title">查看部门</p>
          <p class="subtitle">&nbsp;</p>
        </article>
      </div>
      <div class="tile is-parent is-3">
        <article class="tile is-child box notification is-success" v-on:click="linkTo('/admin/addDepartments')">
          <p class="title">添加部门</p>
          <p class="subtitle"></p>
        </article>
      </div>
    </div>
  </x-content>
</template>
<script>
import XContent from "../common/XContent";
export default {
  components: {
    XContent
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    }
  },
  computed:{
    id(){
      return JSON.parse(sessionStorage.getItem("user")).id
    }
  }
};
</script>
<style scoped>
.box {
  cursor: pointer;
}
h2 {
  margin-bottom: 20px;
}
</style>