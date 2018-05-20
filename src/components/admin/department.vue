<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        部门管理
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> 首页</a>
        </li>
        <li class="active">部门管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">查看部门</h3>
              <div class="box-tools pull-right">
                  <button class="btn btn-info" title="修改" v-on:click="showModal">添加部门</button>
              </div>
            </div>
            <div class="box-body table-responsive no-padding">
              <div v-if="departments.length == 0">
                <h3 style="text-align:center;">部门为空，请先添加部门</h3>
              </div>
              <table class="table table-bordered" v-else>
                <tbody>
                  <tr>
                    <th>id</th>
                    <th>部门名称</th>
                    <th>查看</th>
                  </tr>
                  <tr v-for="d in departments">
                    <td>{{d.id}}</td>
                    <td>{{d.name}}</td>
                    <td class="icon">
                      <router-link :to="{name:'users',params:{department:d._id}}">查看员工</router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
    <!-- modal -->
    <div class="modal fade" id="add" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">添加部门</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="name">部门名称</label>
                    <input type="text" class="form-control" id="name" placeholder="名称" v-model="department.name">
                  </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" v-on:click="addDepartment">添加</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
export default {
  name: "department",
  data: function() {
    return {
      departments: [],
      department: {
        name: ""
      }
    };
  },
  mounted() {
    this.getDepartments();
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
            $("#add").modal("hide");
            self.getDepartments();
          }
        });
    },
    getDepartments() {
      this.axios.post("/api/admin/department/list").then(res => {
        this.departments = res.data.departments;
      });
    },
    showModal() {
      $("#add").modal("show");
    }
  }
};
</script>

<style>
</style>
