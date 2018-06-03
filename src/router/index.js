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
			path:'/user',
			component:home,
			children:[
				{path:'',component: resolve => require(['../components/user/index'], resolve)},
				{path:'detail',component: resolve => require(['../components/user/detail'], resolve)},
				{path:'edit',component: resolve => require(['../components/user/edit'], resolve)},
				{path:'users',component:resolve => require(['../components/user/list'], resolve)}
			]
		},
		{
			path:'/admin',
			component:home,
			children:[
				{path:'',component: resolve => require(['../components/admin/index'], resolve)},
				{path:'detail/:id',component: resolve => require(['../components/admin/detail'], resolve)},
				{path:'edit/:id',component: resolve => require(['../components/admin/edit'], resolve)},
				{name:'users',path:'users',component:resolve => require(['../components/admin/list'], resolve)},
				{path:'departments',component:resolve => require(['../components/admin/department'], resolve)},
				{path:'departmentVerify',component:resolve => require(['../components/admin/departmentVerify.vue'], resolve)},
				{path:'registerVerify',component:resolve => require(['../components/admin/registerVerify'], resolve)}
			]
		}
	]
})
