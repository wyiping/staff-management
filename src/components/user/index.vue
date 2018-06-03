<template>
  <x-content>
    <span slot="title"><span class="icon is-middle"><i class="fa fa-home is-right-5"></i></span>首页</span>
    <div slot="menu" class="tabs is-boxed" style="margin:10px 20px 0;">
      <ul class="is-left">
        <li :class="{'is-active':index===0}" @click="change(0)"><a>介绍</a></li>
      </ul>
    </div>
    <div class="tabs-content-container">
      <div class="fade" v-show="index===0">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box notification is-info" v-on:click="linkTo('/user/changeD')">
            <p class="title">部门更换申请</p>
            <p class="subtitle">通过</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box notification is-warning" v-on:click="linkTo('/user/changeR')">
            <p class="title">管理员申请</p>
            <p class="subtitle">正在审核</p>
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