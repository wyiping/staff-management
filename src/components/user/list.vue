<template>
  <x-content>
    <span slot="title">员工列表</span>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="control is-horizontal">
              <div class="control-label">
                  <span class="label">工牌号</span>
              </div>
              <div class="input-group">
                <input type="text" class="input" placeholder="工牌号" v-model="workId">
              </div>
              <div class="control-label">
                <span class="label">姓名</span>
              </div>
              <div class="input-group">
                <input type="text" class="input" placeholder="姓名" v-model="name">
              </div>
              <div class="control-label">
                  <span class="label">手机</span>
              </div>
              <div class="input-group">
                <input type="text" class="input" placeholder="手机" v-model="phone">
              </div>
              <div class="col-md-1">
                <button type="button" class="button" v-on:click="getSearch">查询</button>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="box-body table-responsive no-padding">
              <div v-if="users.length == 0">
                <h3 style="text-align:center;">没有查询结果</h3>
              </div>
              <table class="table table-bordered" v-else>
                <tbody>
                  <tr>
                    <th style="width: 80px">工牌号</th>
                    <th>姓名</th>
                    <th>部门</th>
                    <th>联系方式</th>
                  </tr>
                  <tr v-for="user in users">
                    <td style="text-align:center;">{{user.workId}}</td>
                    <td>{{user.name}}</td>
                    <td v-if="user.department != null">{{user.department}}</td>
                    <td v-else>无</td>
                    <td>{{user.phone}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <!-- box-footer -->
            <div class="box-footer clearfix" v-if="pageCount>1">
              <ul class="pagination pagination-sm no-margin pull-right">
                <li v-bind:class="{ 'disabled': page == 1}"><a href="javascript:void(0)" v-on:click="page--,getSearch()">«</a></li>
                <li v-for="p in pages" v-bind:class="{ 'active': page == p}"><a href="javascript:void(0)" v-on:click="page=p,getSearch()">{{p}}</a></li>
                <li v-bind:class="{ 'disabled': page == pageCount}"><a href="javascript:void(0)" v-on:click="page++,getSearch()">»</a></li>
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
  name: "login",
  components: {
    XContent
  },
  data: function() {
    return {
      workId: "",
      name: "",
      phone: "",
      error: "",
      users: [],
      page: 1,
      pageCount: 1,
      pages: []
    };
  },
  methods: {
    getSearch() {
      const self = this;
      self.axios
        .post("/api/user/list", {
          workId: self.workId,
          name: self.name,
          phone: self.phone,
          page: self.page
        })
        .then(function({ data }) {
          self.users = data.users;
          self.page = data.page;
          self.pageCount = data.pageCount;
          self.pages = data.pages;
        })
        .catch(function(error) {
          self.error = "ERROR!" + error;
        });
    }
  },
  beforeMount: function() {
    this.getSearch();
  },
  activated: function() {
    this.getSearch();
  }
};
</script>
<style scoped>
</style>