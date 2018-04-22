<template>
    <div id="register">
		<div class="body"></div>
        <div class="grad"></div>
		<form class="register" v-on:submit.prevent="register">
			<router-link to="/login">  返回</router-link>	
			<h1>新员工注册</h1>

			<fieldset>
				<legend><span class="number">1</span>基本信息</legend>
				<label for="name">姓名:</label>
				<input type="text" id="name" name="name" v-model="user.name">
				<label for="password">密码:</label>
				<input type="password" id="password" name="password" v-model="user.password"><br>
				<label for="department">部门:</label>
				<select id="department" name="department" v-model="user.department">
					<optgroup label="Web">
						<option value="frontend_developer">Front-End Developer</option>
						<option value="php_developor">PHP Developer</option>
						<option value="python_developer">Python Developer</option>
						<option value="rails_developer"> Rails Developer</option>
						<option value="web_designer">Web Designer</option>
						<option value="WordPress_developer">WordPress Developer</option>
					</optgroup>
					<optgroup label="Mobile">
						<option value="Android_developer">Androild Developer</option>
						<option value="iOS_developer">iOS Developer</option>
						<option value="mobile_designer">Mobile Designer</option>
					</optgroup>
					<optgroup label="Business">
						<option value="business_owner">Business Owner</option>
						<option value="freelancer">Freelancer</option>
					</optgroup>
					<optgroup label="Other">
						<option value="secretary">Secretary</option>
						<option value="maintenance">Maintenance</option>
					</optgroup>
				</select>
				</fieldset>

			<fieldset>
				<legend><span class="number">2</span>个人简历</legend>
				<label for="age">年龄:</label>
				<input type="number" name="age" id="age" v-model="user.detail.age">
				<label for="address">地址:</label>
				<input type="text" id="address" name="address" v-model="user.detail.address"><br>
				<label for="phone">手机:</label>
				<input type="text" id="phone" name="phone" v-model="user.detail.phone">
				<label for="mail">Email:</label>
				<input type="email" id="mail" name="email" v-model="user.detail.email"><br>
				<label>性别:</label>
				<input type="radio" id="male" value="男" name="sex" v-model="user.detail.sex"><label for="male" class="light">男</label>
				<input type="radio" id="female" value="女" name="sex" v-model="user.detail.sex"><label for="female" class="light">女</label><br>
				<label for="introduce">简介:</label><br>
				<textarea id="introduce" rows="5" name="introduce" v-model="user.detail.introduce"></textarea>
			</fieldset>
			<button  type="submit">注册</button>
		</form>
    </div>
</template>
<script>
export default {
  name: "register",
  data: function() {
    return {
       user:{
          workId: '',
          name: '',
          department: '',
          detail:{
              age: '',
              address: '',
              email: '',
              introduce: '',
              phone: '',
              sex: ''
          }
       }
    };
  },
  methods: {
    register() {
      var self = this
      self.axios.post("/api/register", self.user).then(function(response) {
        if(response.data.code == 1){
          self.$router.push('/login');
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
.register {
  position: relative;
  /* max-width: 200px; */
  top: 10px;
  left: calc(50% - 260px);
  padding: 10px 20px;
  background: #f4f7f8;
  color: #c9c6c6;
  border-radius: 8px;
  z-index: 3;
}

.register h1 {
  margin: 0 0 30px 0;
  text-align: center;
}

.register input[type="text"],
.register input[type="number"],
.register input[type="email"],
.register input[type="password"],
.register textarea,
.register select {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  height: auto;
  margin: 0 5px 0 5px;
  outline: 0;
  padding: 5px;
  width: 150px;
  background-color: #e8eeef;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}
.register textarea {
  width: 90%;
}
.register input[type="radio"],
.register input[type="checkbox"] {
  margin: 0 4px 8px 0;
}

.register select {
  padding: 6px;
  height: 32px;
  border-radius: 2px;
}

.register button {
  padding: 19px 39px 18px 39px;
  color: #fff;
  background-color: #4bc970;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #3ac162;
  border-width: 1px 1px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  margin-bottom: 10px;
}

.register fieldset {
  margin-bottom: 30px;
  border: none;
}

.register legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}

.register label {
  /* display: block; */
  font: 1rem sans-serif;
  margin-bottom: 8px;
}

.register label.light {
  font-weight: 300;
  display: inline;
}

.number {
  background-color: #5fcf80;
  color: #fff;
  height: 30px;
  width: 30px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 4px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 100%;
}

@media screen and (min-width: 480px) {
  .register {
    max-width: 480px;
  }
}
</style>
