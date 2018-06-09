<template>
  <x-content>
    <span slot="title">我的简历</span>
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header with-border has-text-centered">
              <h3 class="box-title">我的简历</h3>
            </div>
            <div class="box-body no-padding">
              <div class="col-md-6 col-md-push-3 text-center">
                <table class="table is-bordered" v-cloak>
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
  </x-content>
</template>
<script>
import XContent from "../common/XContent";
export default {
  name: "detail",
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
      }
    };
  },
  mounted() {
    const self = this;
    let user = JSON.parse(sessionStorage.getItem("user"));
    self.axios.post("/api/user/detail/" + user.id).then(res => {
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
.red {
  color: red;
}
[v-cloak] {
  display: none;
}
</style>