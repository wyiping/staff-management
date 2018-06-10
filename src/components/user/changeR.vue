<template>
  <x-content>
    <span slot="title">申请管理员</span>
    <!-- Main content -->
    <section class="content columns is-multiline">
      <!-- 申请状态为true时显示内容 -->
      <div class="card is-fullwidth column is-6 is-offset-3" v-show="user.status">
        <header class="card-header">
          <p class="card-header-title">您的申请正在审核中</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>
              您正在申请成为管理员，请耐心等待管理员审核。
            </p>
          </div>
        </div>
      </div>
      <!-- 申请状态为false时显示内容 -->
      <div class="card is-fullwidth column is-6 is-offset-3" v-show="!user.status">
        <header class="card-header">
          <p class="card-header-title text-center">您是否准备申请管理员？</p>
        </header>
        <footer class="card-footer">
          <a class="card-footer-item" v-on:click="apply">申请</a>
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
      user: {
        id: "",
        status: ""
      }
    };
  },
  methods: {
    apply() {
      const self = this;
      self.axios
        .post("/api/user/role/change/"+self.user.id)
        .then(({ data }) => {
          self.$toasted.show(data.msg, {
            theme: "outline",
            position: "top-center",
            duration: 5000
          });
          if (data.code) {
            self.getStatus();
          }
        });
    },
    getStatus() {
      this.axios
        .post("/api/user/role/status/" + this.$route.params.id)
        .then(({ data }) => {
          this.user = data.user;
        });
    }
  },
  beforeMount: function() {
    this.getStatus();
  }
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>
