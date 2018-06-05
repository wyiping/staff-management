<template>
  <x-content>
    <span slot="title">部门调整</span>
    <!-- Main content -->
    <section class="content columns is-multiline">
      <!-- 申请状态为true时显示内容 -->
      <div class="card is-fullwidth column is-6 is-offset-3" v-if="user.status">
        <header class="card-header">
          <p class="card-header-title">您的申请正在审核中</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>
              您正在申请调入{{user.new_department.name}}部门，请耐心等待管理员审核。
            </p>
          </div>
        </div>
      </div>
      <!-- 申请状态为false时显示内容 -->
      <div class="card is-fullwidth column is-6 is-offset-3" v-else>
        <header class="card-header">
          <p class="card-header-title">请选择新部门：</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p class="control">
              <span class="select is-fullwidth">
                <select v-model="user.new_department">
                  <option value="" selected>无</option>
                  <option v-for="(d,i) in departments" :key="i" :value="d._id">{{d.name}}</option>
                </select>
              </span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" v-on:click="apply">申请</a>
          <a class="card-footer-item">取消</a>
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
      departments:[],
      user: {
        id: "",
        department: "",
        status: "",
        new_department: ""
      }
    };
  },
  methods: {
    apply() {
      const self = this;
      self.axios
        .post("/api/user/department/change", {
          new: self.user.new_department,
          uid: self.user.id
        })
        .then(({ data }) => {
          self.$toasted.show(data.msg, {
            theme: "outline",
            position: "top-center",
            duration: 5000
          });
          if(data.code){
            self.getStatus()
          }
        });
    },
    getStatus() {
      this.axios
        .post("/api/user/department/status/" + this.$route.params.id)
        .then(({ data }) => {
          this.user = data.user
        });
    },
    getDepartments(){
      this.axios.post("/api/user/department/list").then(({ data }) => {
        this.departments = data.departments;
      });
    }
  },
  mounted() {
    this.getDepartments()
    this.getStatus()
  }
};
</script>

<style>
</style>
