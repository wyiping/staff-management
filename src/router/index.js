import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/common/Home'
Vue.use(Router)

export default new Router({
	routes: [
		{
            path: '/',
            redirect: '/login'
        },
		{
			path: '/login',
			component: resolve => require(['../components/login'], resolve)
		},
		{
			path: '/register',
			component: resolve => require(['../components/register'], resolve)
		},
		{
			path:'/admin',
			component:home,
			children:[
				{path:'',component: resolve => require(['../components/page/index'], resolve)},
				{path:'detail/:id',component: resolve => require(['../components/page/detail'], resolve)},
				{path:'user_edit',component: resolve => require(['../components/page/user_edit'], resolve)},
				{path:'list',component:resolve => require(['../components/page/list'], resolve)}
			]
		}
	]
})
