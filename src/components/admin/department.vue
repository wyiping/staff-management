<template>
  <x-content>
    <span slot="title">部门管理</span>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <div class="box-tools pull-right">
                  <button class="button is-info" title="修改" v-on:click="showModal">添加部门</button>
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
                    <th style="width:20%;">查看</th>
                  </tr>
                  <tr v-for="d in departments">
                    <td>{{d.id}}</td>
                    <td>{{d.name}}</td>
                    <td>
                      <router-link class="button is-success" :to="{name:'users',params:{department:d._id}}">查看员工</router-link>
                      <button class="button is-warning" v-on:click="del(d._id)">删除部门</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <!-- box-footer -->
            <div class="box-footer clearfix" v-if="pageCount>1">
              <ul class="pagination pagination-sm no-margin pull-right">
                <li v-bind:class="{ 'disabled': page == 1}"><a href="javascript:void(0)" v-on:click="page--,getDepartments()">«</a></li>
                <li v-for="p in pages" v-bind:class="{ 'active': page == p}"><a href="javascript:void(0)" v-on:click="page=p,getDepartments()">{{p}}</a></li>
                <li v-bind:class="{ 'disabled': page == pageCount}"><a href="javascript:void(0)" v-on:click="page++,getDepartments()">»</a></li>
              </ul>
            </div>
            <!-- /.box-footer -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
    <!-- modal -->
    <div class="modal" id="addDepartModal" style="text-align:center;">
      <div class="modal-background"></div>
      <div class="modal-content">
          <div class="modal-content">
            <header class="modal-card-head">
              <p class="modal-card-title">添加部门</p>
              <button class="delete" v-on:click="closeModal" aria-label="close"></button>
            </header>
            <div class="modal-card-body">
              <div class="control is-horizontal">
                <div class="control-label">
                  <span class="label">部门名称</span>
                </div>
                <div class="control">
                  <input type="text" class="inpu" id="name" placeholder="名称" v-model="department.name">
                </div>
              </div>
            </div>
            <footer class="modal-card-foot">
              <button class="button is-success" v-on:click="addDepartment">添加</button>
              <button class="button" v-on:click="closeModal">取消</button>
            </footer>
          </div><!-- /.modal-content -->
      </div>
    </div><!-- /.modal -->
  </x-content>
</template>
<script>
import XContent from "../common/XContent";
export default {
  components: {
    XContent
  },
  name: "department",
  data: function() {
    return {
      departments: [],
      department: {
        name: ""
      },
      page: 1,
      pageCount: 1,
      pages: []
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
            document.getElementById("addDepartModal").className = "modal";
            self.getDepartments();
          }
        });
    },
    del(id) {
      var self = this;
      self.axios.post("/api/admin/department/delete/" + id).then(({ data }) => {
        self.$toasted.show(data.msg, {
          theme: "outline",
          position: "top-center",
          duration: 3000
        });
        self.getDepartments();
      });
    },
    getDepartments() {
      var self = this;
      self.axios
        .post("/api/admin/department/list", { page: self.page })
        .then(({ data }) => {
          self.departments = data.departments;
          self.page = data.page;
          self.pageCount = data.pageCount;
          self.pages = data.pages;
        });
    },
    showModal() {
      document.getElementById("addDepartModal").className = "modal is-active";
    },
    closeModal() {
      document.getElementById("addDepartModal").className = "modal";
    }
  }
};
</script>

<style>
.modal-card-foot > button {
  margin: 0 auto;
}
</style>
