<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        修改资料
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> 首页</a>
        </li>
        <li class="active">修改资料</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border text-center">
              <h3 class="box-title">修改资料</h3>
            </div>
            <div class="box-body no-padding">
              <div class="col-md-6 col-md-push-3 text-center">
                <table class="table table-bordered" v-cloak>
                  <tbody>
                    <tr>
                      <th>姓名</th>
                      <td>{{user.name}}</td>
                      <th>角色</th>
                      <td>
                        <select name="department" v-model="user.isAdmin">
                          <option value="false">普通员工</option>
                          <option value="true">管理员</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>年龄</th>
                      <td><input type="number" name="age" v-model="user.detail.age"></td>
                      <th>部门</th>
                      <td>
                        <select name="department" v-model="user.department">
                          <option value="">无</option>
                          <option v-for="d in departments" :value="d._id">{{d.name}}</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>邮箱</th>
                      <td><input type="email" name="email" v-model="user.detail.email"></td>
                      <th>手机号</th>
                      <td><input type="text" name="phone" v-model="user.phone"></td>
                    </tr>
                    <tr>
                      <th>住址</th>
                      <td colspan="3"><input type="text" id="address" name="address" v-model="user.detail.address"></td>
                    </tr>
                    <tr>
                      <th>个人简介</th>
                      <td colspan="3"><textarea id="introduce" rows="3" name="introduce" v-model="user.detail.introduce"></textarea></td>
                    </tr>
                  </tbody>
                </table>
                <button v-on:click="edit" class="btn btn-info">修改</button>
                <router-link :to="'/admin/detail/' + user._id">
                  <button class="btn btn-info">返回</button>
                </router-link>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      user: {
        workId: "",
        name: "",
        department: "",
        phone: "",
        isAdmin:'',
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
    self.axios.post("/api/admin/detail/" + self.$route.params.id).then(res => {
      self.user = res.data.user;
    });
    self.getDepartments();
  },
  methods: {
    getDepartments() {
      this.axios.post("/api/admin/department/list").then(res => {
        this.departments = res.data.departments;
      });
    },
    edit: function() {
      const self = this;
      self.axios
        .post("/api/user/edit/" + self.user._id, self.user)
        .then(function(response) {
          self.$toasted.show(response.data.msg, {
            theme: "primary",
            position: "top-center",
            duration: 5000
          });
          self.$router.push("/admin/detail/" + self.user._id);
        });
    }
  }
};
</script>
