<template>
  <x-content>
    <span slot="title">修改资料</span>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-body no-padding">
              <div class="col-md-6 col-md-push-3 text-center">
                <table class="table table-bordered" v-cloak>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <td>{{user.name}}</td>
                      <th>角色</th>
                      <td>
                        <select class="input" name="department" v-model="user.isAdmin">
                          <option value="false">普通员工</option>
                          <option value="true">管理员</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>年龄</th>
                      <td><input type="number" class="input" name="age" v-model="user.detail.age"></td>
                      <th>部门</th>
                      <td>
                        <div class="select is-fullwidth">
                          <select name="department" v-model="user.department.default">
                            <option value="">无</option>
                            <option v-for="(d,i) in departments" :key="i" :value="d._id">{{d.name}}</option>
                          </select>
                        </div>
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
                <button class="button is-success" v-on:click="$router.go(-1)">返回</button>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
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
      user: {
        workId: "",
        name: "",
        department: "",
        phone: "",
        isAdmin: "",
        detail: {
          age: "",
          address: "",
          email: "",
          introduce: "",
          sex: ""
        }
      },
      departments: []
    };
  },
  mounted() {
    const self = this;
    self.getDetail();
    self.getDepartments();
  },
  methods: {
    getDetail() {
      const self = this;
      if(self.$route.params.id){
        self.axios.post("/api/user/detail/" + self.$route.params.id).then(res => {
          self.user = res.data.user;
        });
      }
    },
    getDepartments() {
      this.axios.post("/api/admin/department/list").then(res => {
        this.departments = res.data.departments;
      });
    },
    edit: function() {
      const self = this;
      self.axios
        .post("/api/user/edit/" + self.user._id, self.user)
        .then(function({ data }) {
          self.$toasted.show(data.msg, {
            theme: "primary",
            position: "top-center",
            duration: 5000
          });
          self.$router.push("/admin/detail/" + self.user._id);
        });
    }
  },
  watch: {
    $route: "getDetail"
  }
};
</script>
