<template>
  <x-content>
    <span slot="title">管理员申请审核</span>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">员工管理员申请审核</h3>
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
                    <th style="width: 20%">操作</th>
                  </tr>
                  <tr v-for="user in users" :key="user.name">
                    <td style="text-align:center;">{{user.workId}}</td>
                    <td>{{user.name}}</td>
                    <td>
                      <span v-if="user.department">{{user.department}}</span>
                      <span v-else>无</span>
                    </td>
                    <td>{{user.phone}}</td>
                    <td>
                      <button class="button is-success" v-on:click="verify(user.id,true)">通过</button>
                      <button class="button is-warning" v-on:click="verify(user.id,false)">不通过</button>
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
                <li v-for="p in pages" v-bind:class="{ 'active': page == p}" :key="p"><a href="javascript:void(0)" v-on:click="page=p,getVerigies()">{{p}}</a></li>
                <li v-bind:class="{ 'disabled': page == pageCount}"><a href="javascript:void(0)" v-on:click="page++,getVerigies()">»</a></li>
              </ul>
            </div>
            <!-- /.box-footer -->
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
    getVerigies() {
      const self = this;
      self.axios
        .post("/api/admin/verify/role", { page: self.page })
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
        .post("/api/admin/verify/role/" + id + "/" + status)
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
    this.getVerigies();
  }
};
</script>

<style>
</style>
