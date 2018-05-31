<template>
  <x-content>
    <span slot="title">个人资料</span>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
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
                      <td>
                        <span v-if="user.department.default != null">{{user.department.default.name}}</span>
                        <span v-else>无</span>
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
              <router-link :to="'/admin/edit/'+user._id" class="button is-success" title="修改">
                <i class="fa fa-edit"></i>修改
              </router-link>
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
  components: {
    XContent
  },
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
  methods: {
    getDetail() {
      const self = this;
      if(self.$route.params.id){
        self.axios.post("/api/user/detail/" + self.$route.params.id).then(res => {
          self.user = res.data.user;
        });
      }
    }
  },
  mounted() {
    this.getDetail();
  },
  watch:{
    "$route":"getDetail"
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