<template>
  <x-content>
    <span slot="title">部门调整</span>
    <!-- Main content -->
    <section class="content columns is-multiline">
      <!-- 申请状态为false时显示内容 -->
      <div class="card is-fullwidth column is-8 is-offset-2">
        <header class="card-header">
          <p class="card-header-title">请输入部门名称</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p class="control">
              <input class="input is-success" type="text" placeholder="部门名称" v-model="department.name">
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" v-on:click="addDepartment">添加</a>
          <a class="card-footer-item" v-on:click="$router.go(-1)">取消</a>
        </footer>
      </div>
    </section>
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
      department: {
        name: ""
      }
    };
  },
  methods: {
    addDepartment() {
      const self = this;
      self.axios
        .post("/api/admin/department/add", self.department)
        .then(res => {
          self.$toasted.show(res.data.msg, {
            theme: "outline",
            position: "top-center",
            duration: 5000
          });
          if (res.data.code == 0) {
            self.department.name = "";
          } else {
            self.$router.push("/admin/departments");
          }
        });
    },
  }
};
</script>

<style>
</style>
