// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index'
import router from './router'
import axios from 'axios'
import Toasted from 'vue-toasted';
Vue.use(Toasted)
Vue.config.productionTip = false
Vue.prototype.axios= axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: x => x(index)
}).$mount('#app');
