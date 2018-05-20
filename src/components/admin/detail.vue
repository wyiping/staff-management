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
                    <a href="#"><i class="fa fa-dashboard"></i> 首页</a>
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
                            <h3 class="box-title">{{user.name}}的简历</h3>
                            <div class="box-tools pull-right">
                                <router-link :to="'/admin/edit/'+user._id" class="btn btn-info" title="修改"><i class="fa fa-edit"></i></router-link>
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
                                            <td v-if="user.department != null">{{user.department.name}}</td>
                                            <td v-else>无</td>
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
    </div>
</template>
<script>
export default {
  name: "detail",
  data: function() {
    return {
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
        }
      }
    };
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
[v-cloak] {
  display: none;
}
</style>
