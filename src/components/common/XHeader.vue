<template>
  <section id="nav-section" class="hero is-primary">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <router-link class="nav-item is-brand" :to="index">
            员工管理系统
          </router-link>
        </div>
        <span id="nav-toggle" class="nav-toggle" :class="{'is-active': status}" @click="status = !status">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div id="nav-menu" class="nav-right nav-menu" :class="{'is-active': status}">
          <router-link class="nav-item" to="/"><figure class="image is-24x24 is-right-5"><img class="is-circle" src="/static/images/avatar.jpg"></figure><span>{{name}}</span></router-link>
          <a class="nav-item" @click="logout()"><span class="icon is-small"><i class="fa fa-power-off"></i></span>注销</a>
        </div>
      </nav>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      status: false,
      name: "xheader",
      index: ""
    };
  },
  methods: {
    toggle() {
      this.status = !this.status;
    },
    logout() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  mounted() {
    var self = this;
    var user = JSON.parse(sessionStorage.getItem("user"));
    self.name = user.name;
    if(user.isAdmin){
      self.index = "/admin"
    }else{
      self.index = "/user"
    }
  }
};
</script>