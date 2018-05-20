<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                员工列表
                <small>Control panel</small>
            </h1>
            <ol class="breadcrumb">
                <li>
                    <a href="#"><i class="fa fa-dashboard"></i> 首页</a>
                </li>
                <li class="active">员工列表</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-info">
                        <div class="box-header with-border col-md-push-1">
                            <div class="col-md-3">
                                <div class="input-group">
                                    <span class="input-group-addon">工牌号</span>
                                    <input type="text" class="form-control" placeholder="工牌号" v-model="workId">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <span class="input-group-addon">姓名</span>
                                    <input type="text" class="form-control" placeholder="姓名" v-model="name">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <span class="input-group-addon">手机</span>
                                    <input type="text" class="form-control" placeholder="手机" v-model="phone">
                                </div>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-block btn-info" v-on:click="getSearch">查询</button>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-body table-responsive no-padding">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th style="width: 59px">工牌号</th>
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
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      workId: "",
      name: "",
      phone: "",
      error: "",
      users:[]
    };
  },
  mounted() {
    const self = this;
    self.axios.post("/api/user/list").then(res => {
      self.users = res.data.users;
    });
  },
  methods: {
    getSearch() {
      const self = this;
      self.axios.post("/api/user/list",
        {
            workId:self.workId,
            name:self.name,
            phone:self.phone
        }).then(function({data}) {
            self.users = data.users;
            
        })
        .catch(function(error) {
            self.error = "ERROR!" + error;
            })
    }
  }
};
</script>
<style scoped>

</style>
