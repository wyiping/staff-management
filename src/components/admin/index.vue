<template>
  <x-content>
    <span slot="title"><span class="icon is-middle"><i class="fa fa-home is-right-5"></i></span>首页</span>
    <div slot="menu" class="tabs is-boxed" style="margin:10px 20px 0;">
      <ul class="is-left">
        <li :class="{'is-active':index===0}" @click="change(0)"><a>工作台</a></li>
      </ul>
    </div>
    <div class="tabs-content-container">
      <div class="fade" v-show="index===0">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box notification is-warning" v-on:click="linkTo('/admin/users')">
            <p class="title">注册员工数</p>
            <p class="subtitle">累计0人</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box notification is-success" v-on:click="linkTo('/admin/registerVerify')">
            <p class="title">申请员工数</p>
            <p class="subtitle">累计0人</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box notification is-info" v-on:click="linkTo('/admin/departmentVerify')">
            <p class="title">部门申请数</p>
            <p class="subtitle">累计0人</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box notification is-primary" v-on:click="linkTo('/admin/roleVerify')">
            <p class="title">管理申请数</p>
            <p class="subtitle">累计0人</p>
          </article>
        </div>
      </div>
      </div>
    </div>
  </x-content>
</template>
<script>
import XContent from "../common/XContent";
export default {
  components: {
    XContent
  },
  data(){
    return {
      index:0
    }
  },
  methods:{
    change(index){
      this.index = index
    },
    linkTo(path){
      this.$router.push(path);
    }
  }
};
</script>
<style scoped>
.box{
  cursor: pointer;
}
</style>