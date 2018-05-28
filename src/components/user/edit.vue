<template>
  <x-content>
    <span slot="title">修改资料</span>
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border text-center">
              <h3 class="box-title">修改资料</h3>
              <div class="box-tools pull-right">
                <button class="button is-primary" v-on:click="showModal"><i class="fa fa-edit"></i>调换部门</button>
              </div>
            </div>
            <div class="box-body no-padding">
              <div class="col-md-6 col-md-push-3 text-center">
                <table class="table table-bordered" v-cloak>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <td>{{user.name}}</td>
                      <th>工牌号</th>
                      <td>{{user.workId}}</td>
                    </tr>
                    <tr>
                      <th>年龄</th>
                      <td><input type="number" class="input" name="age" v-model="user.detail.age"></td>
                      <th>部门</th>
                      <td >
                        <span v-if="user.department.default != null">{{user.department.default.name}}</span>
                        <span v-else>无</span>
                        <span v-if="user.status.department == true">({{user.department.new.name}})</span>
                      </td>
                    </tr>
                    <tr>
                      <th>邮箱</th>
                      <td><input type="email" class="input" name="email" v-model="user.detail.email"></td>
                      <th>手机号</th>
                      <td><input type="text" class="input" name="phone" v-model="user.phone"></td>
                    </tr>
                    <tr>
                      <th>住址</th>
                      <td colspan="3"><input type="text" class="input" id="address" name="address" v-model="user.detail.address"></td>
                    </tr>
                    <tr>
                      <th>个人简介</th>
                      <td colspan="3"><textarea id="introduce" class="textarea" rows="3" name="introduce" v-model="user.detail.introduce"></textarea></td>
                    </tr>
                  </tbody>
                </table>
                <button v-on:click="edit" class="button is-success">修改</button>
                <router-link to="/user/detail">
                  <button class="button is-success">返回</button>
                </router-link>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
    <!-- modal -->
    <div class="">
    <div class="modal" id="change">
      <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p class="modal-card-title">修改部门</p>
          <button class="delete" v-on:click="closeModal" aria-label="close"></button>
        </header>
        <div class="modal-card-body">
          <div class="select">
          <select name="department" v-model="new_department">
            <option value="">无</option>
            <option v-for="(d,i) in departments" :key="i" :value="d._id">{{d.name}}</option>
          </select>
          </div>
        </div>
        <footer class="modal-card-foot">
          <button class="button is-success" v-on:click="apply">申请</button>
          <button class="button" v-on:click="closeModal">取消</button>
        </footer>
      </div>
    </div><!-- /.modal -->
    </div>
  </x-content>
</template>
<script>
import XContent from "../common/XContent";
export default {
  components: {
    XContent
  },
  data: function() {
    return {
      departments: [],
      new_department: "",
      user: {
        workId: "",
        name: "",
        department: "",
        phone: "",
        detail: {
          age: "",
          address: "",
          email: "",
          introduce: "",
          sex: ""
        },
        status: {
          defaule: "",
          new: ""
        }
      }
    };
  },
  mounted() {
    const self = this;
    self.axios
      .post("/api/user/detail/" + JSON.parse(sessionStorage.getItem("user")).id)
      .then(res => {
        self.user = res.data.user;
      });
  },
  methods: {
    edit: function() {
      const self = this;
      this.axios
        .post("/api/user/edit/" + self.user._id, self.user)
        .then(function({ data }) {
          self.$toasted.show(data.msg, {
            theme: "primary",
            position: "top-center",
            duration: 5000
          });
          self.$router.push("/user/detail");
        });
    },
    apply() {
      const self = this;
      self.axios
        .post("/api/user/department/change", {
          new: self.new_department,
          uid: self.user._id
        })
        .then(({ data }) => {
          self.$toasted.show(data.msg, {
            theme: "outline",
            position: "top-center",
            duration: 5000
          });
          document.getElementById("change").className = "modal"
        });
    },
    showModal() {
      const self = this;
      if (self.user.department.default != null) {
        self.new_department = self.user.department.default._id;
      }
      self.axios.post("/api/admin/department/list").then(({ data }) => {
        self.departments = data.departments;
      });
      document.getElementById("change").className = "modal is-active"
    },
    closeModal(){
      document.getElementById("change").className = "modal"
    }
  }
};
</script>
<style scoped>
.text-center {
  text-align: center;
}
</style>

