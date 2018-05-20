<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        个人简历
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> 首页</a>
        </li>
        <li class="active">个人简历</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border text-center">
              <h3 class="box-title">我的简历</h3>
              <div class="box-tools pull-right">
                <router-link to="/user/edit" class="btn btn-info" title="修改资料">
                  <i class="fa fa-edit"></i>修改资料
                </router-link>
                <button class="btn btn-info" title="修改部门" v-on:click="showModal"><i class="fa fa-edit"></i>调换部门</button>
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
                      <td>{{user.detail.age}}</td>
                      <th>部门</th>
                      <td >
                        <span v-if="user.department.default != null">{{user.department.default.name}}</span>
                        <span v-else>无</span>
                        <span class="red" v-if="user.status.department == true">({{user.department.new.name}})</span>
                      </td>
                    </tr>
                    <tr>
                      <th>邮箱</th>
                      <td>{{user.detail.email}}</td>
                      <th>手机号</th>
                      <td>{{user.phone}}</td>
                    </tr>
                    <tr>
                      <th>住址</th>
                      <td colspan="3">{{user.detail.address}}</td>
                    </tr>
                    <tr>
                      <th>个人简介</th>
                      <td colspan="3">{{user.detail.introduce}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->

    <!-- modal -->
    <div class="modal fade" id="change" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">调整部门</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <select name="department" class="form-control" v-model="new_department">
                      <option value="">无</option>
                      <option v-for="d in departments" :value="d._id">{{d.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" v-on:click="apply">申请</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data: function() {
    return {
      departments: [],
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
      },
      new_department: ""
    };
  },
  methods: {
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
          $("#change").modal("hide");
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
      $("#change").modal("show");
    }
  },
  mounted() {
    const self = this;
    self.axios.post("/api/user/detail/" + self.$route.params.id).then(res => {
      self.user = res.data.user;
    });
  }
};
</script>
<style scoped>
th {
  text-align: center;
  width: 20%;
}
.red{
  color: red;
}
[v-cloak] {
  display: none;
}
</style>