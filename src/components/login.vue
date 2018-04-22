<template>
    <div id="login">
        <div class="body"></div>
        <div class="grad"></div>
        <div class="header">
            <div>员工
                <span>管理系统</span>
            </div>
        </div>
        <div class="login">
            <form v-on:submit.prevent="login">
                <input type="text" placeholder="用户名" name="name" v-model="name">
                <br>
                <input type="password" placeholder="密码" name="password" v-model="password">
                <br>
                <input type="submit" value="登录">
                <br>
                <router-link to="/register">新员工注册</router-link>
            </form>
        </div>
    </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    login() {
      const self = this;
      var data = {};
      data.name = self.name;
      data.password = self.password;
      self.axios.post("/api/login", data).then(function(response) {
        if(response.data.code == 1){
          sessionStorage.setItem("user", JSON.stringify(response.data.user))
          self.$router.push('/admin')
        }
      });
    }
  }
};
</script>
<style>
.body {
  position: fixed;
  top: -20px;
  left: -20px;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  background-image: url(/static/images/background.jpg);
  background-size: cover;
  -webkit-filter: blur(8px);
  z-index: 0;
}

.grad {
  position: fixed;
  top: -20px;
  left: -20px;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 1)),
    color-stop(100%, rgba(0, 0, 0, 0.65))
  );
  /* Chrome,Safari4+ */
  z-index: 1;
  opacity: 0.8;
}
/* 标题 */
.header {
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 270px);
  z-index: 2;
}

.header div {
  float: left;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 35px;
  font-weight: 200;
}

.header div span {
  color: #5379fa !important;
}

/* 登录框 */

.login {
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 50px);
  height: 150px;
  width: 350px;
  padding: 10px;
  z-index: 2;
}

.login input[type="text"] {
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
}

.login input[type="password"] {
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
  margin-top: 10px;
}

.login input[type="submit"] {
  width: 260px;
  height: 35px;
  background: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: #a18d6c;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
}

.login input[type="button"]:hover {
  opacity: 0.8;
}

.login input[type="button"]:active {
  opacity: 0.6;
}

.login input[type="text"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="password"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="button"]:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.login a {
  position: absolute;
  left: 200px;
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #c9c6c6;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

.login a:focus {
  outline: none !important;
}

.login a:hover {
  text-decoration: none;
  color: #6a7dfe;
  color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  color: -o-linear-gradient(left, #21d4fd, #b721ff);
  color: -moz-linear-gradient(left, #21d4fd, #b721ff);
  color: linear-gradient(left, #21d4fd, #b721ff);
}
</style>