<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        注册审核
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> 首页</a>
        </li>
        <li class="active">注册审核</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">员工注册审核</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <div v-if="users.length == 0">
                <h3 style="text-align:center;">没有待审核员工</h3>
              </div>
              <table class="table table-bordered" v-else>
                <tbody>
                  <tr>
                    <th style="width: 59px">工牌号</th>
                    <th>姓名</th>
                    <th>部门</th>
                    <th>联系方式</th>
                    <th>状态</th>
                    <th style="width: 20%">操作</th>
                  </tr>
                  <tr v-for="user in users">
                    <td style="text-align:center;">{{user.workId}}</td>
                    <td>{{user.name}}</td>
                    <td>
                      <span v-if="user.department">{{user.department}}</span>
                      <span v-else>无</span>
                    </td>
                    <td>{{user.phone}}</td>
                    <td>{{user.status.register}}</td>
                    <td>
                      <button class="btn btn-success" v-on:click="verify(user.id,'通过')">通过</button>
                      <button class="btn btn-warning" v-on:click="verify(user.id,'未通过')">不通过</button>
                      <button class="btn btn-warning" v-on:click="del(user.id,user.name)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <!-- box-footer -->
            <div class="box-footer clearfix" v-if="pageCount>1">
              <ul class="pagination pagination-sm no-margin pull-right">
                <li v-bind:class="{ 'disabled': page == 1}"><a href="javascript:void(0)" v-on:click="page--,getVerigies()">«</a></li>
                <li v-for="p in pages" v-bind:class="{ 'active': page == p}"><a href="javascript:void(0)" v-on:click="page=p,getVerigies()">{{p}}</a></li>
                <li v-bind:class="{ 'disabled': page == pageCount}"><a href="javascript:void(0)" v-on:click="page++,getVerigies()">»</a></li>
              </ul>
            </div>
            <!-- /.box-footer -->
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
  name: "verify",
  data: function() {
    return {
      users: [],
      page: 1,
      pageCount: 1,
      pages: []
    };
  },
  methods: {
    del(id, name) {
      var self = this;
      self.axios.post("/api/admin/user/delete/" + id).then(({ data }) => {
        self.$toasted.show("删除" + name + "成功！", {
          theme: "outline",
          position: "top-center",
          duration: 5000
        });
        self.getVerigies();
      });
    },
    getVerigies() {
      const self = this;
      self.axios
        .post("/api/admin/verify/register", { page: self.page })
        .then(function({ data }) {
          self.users = data.users;
          self.page = data.page;
          self.pageCount = data.pageCount;
          self.pages = data.pages;
        });
    },
    verify(id, status) {
      const self = this;
      self.axios
        .post("/api/admin/verify/register/" + id + "/" + status)
        .then(function({ data }) {
          self.$toasted.show(data.msg, {
            theme: "outline",
            position: "top-center",
            duration: 3000
          });
          self.getVerigies();
        });
    }
  },
  mounted() {
    const self = this;
    self.getVerigies();
  }
};
</script>

<style>
</style>
