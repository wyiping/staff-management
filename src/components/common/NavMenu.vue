<template>
  <section class=menu>
    <div class="panel-block">
      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img class="is-rounded" src="/static/images/avatar.jpg">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{user.name}}</strong>
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <a><i class="fa fa-info-circle" aria-hidden="true"></i></a>
        </div>
      </article>
    </div>
    <aside class="menu">
      <div class="menu-container" v-for="(items, x) in menus" :key="x">
        <p class="menu-label"><span class="icon is-small"><i :class="'fa fa-'+items.icon"></i></span><span v-text="items.title"></span></p>
        <ul class="menu-list">
          <li v-for="(item, y) in items.sub" :key="y">
            <router-link v-if="!item.sub" :to="item.url"><span class="icon is-small"><i :class="'fa fa-'+item.icon"></i></span><span v-text="item.title"></span></router-link>
            <a v-if="!!item.sub" :class="{'menu-toggle':(x+'.'+y)===index}" @click="toggle(x+'.'+y)"><span class="icon is-small"><i :class="'fa fa-'+item.icon"></i></span><span v-text="item.title"></span><span class="icon is-small is-angle"><i class="fa fa-angle-down"></i></span></a>
            <div v-if="!!item.sub" class="menu-subcontainer" :style="{height: (x+'.'+y)===index ? (item.sub.length * 30 + 10) + 'px':'0'}">
            <ul>
              <li v-for="(sub,i) in item.sub" :key="i">
                <router-link :to="sub.url"><span class="icon is-small"><i :class="'fa fa-'+(sub.icon?sub.icon:'caret-right')"></i></span><span v-text="sub.title"></span></router-link>
              </li>    
            </ul>
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <a class="panel-block" @click="logout()"><span class="icon is-small"><i class="fa fa-power-off"></i></span><span>注销</span></a>
  </section>
  </template>
<script>
export default {
  data() {
    return {
      name: "nav-menu",
      index: "",
      user: "",
      menus: [],
      userMenus: [
        {
          title: "系统",
          icon: "cube",
          sub: [
            { title: "首页", icon: "home", url: "/user/" },
            { title: "我的资料", url: "/user/detail", icon: "user" }
          ]
        },
        {
          title: "功能",
          icon: "th",
          sub: [{ title: "员工列表", url: "/user/users", icon: "list-ol" }]
        },
        {
          title: "设置",
          icon: "cogs",
          sub: [
            { title: "修改资料", url: "/user/edit", icon: "edit" },
            { title: "申请部门调整", url: "/user/changeD", icon: "building" },
            { title: "申请管理员", url: "/user/changeR", icon: "key" }
          ]
        }
      ],
      adminMenus: [
        {
          title: "个人",
          icon: "address-book",
          sub: [
            { title: "首页", icon: "home", url: "/admin/" },
            { title: "我的资料", url: "/user/detail", icon: "user" },
            { title: "修改资料", url: "/admin/edit", icon: "edit" }
          ]
        },
        {
          title: "员工管理",
          icon: "users",
          sub: [
            { title: "员工列表", url: "/admin/users", icon: "list-ol" },
            {
              title: "注册审核",
              url: "/admin/registerVerify",
              icon: "registered"
            },
            { title: "角色审核", url: "/admin/roleVerify", icon: "user-plus" }
          ]
        },
        {
          title: "部门管理",
          icon: "building",
          sub: [
            { title: "部门列表", url: "/admin/departments", icon: "list-ol" },
            {
              title: "添加部门",
              url: "/admin/addDepartments",
              icon: "plus-square"
            },
            {
              title: "部门审核",
              url: "/admin/departmentVerify",
              icon: "codepen"
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggle(index) {
      this.index = this.index === index ? "" : index;
    },
    logout() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  mounted() {
    var self = this;
    let user = JSON.parse(sessionStorage.getItem("user"));
    self.user = user;
    if (user.isAdmin) {
      self.adminMenus[0].sub[2].url = "/admin/edit/" + user.id;
      self.menus = self.adminMenus;
    } else {
      self.userMenus[2].sub[0].url = "/user/edit/" + user.id;
      self.userMenus[2].sub[1].url = "/user/changeD/" + user.id;
      self.userMenus[2].sub[2].url = "/user/changeR/" + user.id;
      self.menus = self.userMenus;
    }
  }
};
</script>
<style>
#menu-toggle-switch {
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ccc;
  padding: 0 3px;
  right: -18px;
  z-index: -1;
}
section.menu {
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  bottom: 0;
  background-color: #fafafa;
  box-shadow: 1px 0 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 10;
}
aside.menu {
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
section.menu .panel-block {
  display: block;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 20px;
  background-color: #eee;
  border-radius: 0;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  border-bottom: none;
}
section.menu .panel-block:first-child {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
}
aside.menu .menu-container {
  margin-bottom: 20px;
}
aside.menu .menu-label {
  font-weight: 700;
}
aside.menu .menu-label .icon {
  vertical-align: bottom;
  margin-right: 6px;
}
aside.menu a {
  position: relative;
  line-height: 20px;
}
aside.menu li ul {
  margin: 5px 0 5px 18px;
}
aside.menu .menu-subcontainer {
  overflow: hidden;
  transition: all 0.3s;
}
section.menu a .icon {
  vertical-align: baseline;
  margin-right: 5px;
}
aside.menu .icon.is-angle {
  position: absolute;
  margin-right: 0;
  right: 10px;
  transition: transform 0.3s ease;
}
aside.menu .menu-toggle .icon.is-angle {
  transform: rotate(180deg);
}
</style>