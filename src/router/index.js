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
			path: '/user',
			component: home,
			children: [
				{ path: '', component: resolve => require(['../components/user/index'], resolve) },
				{ path: 'detail', component: resolve => require(['../components/user/detail'], resolve) },
				{ path: 'edit/:id', component: resolve => require(['../components/user/edit'], resolve) },
				{ path: 'users', component: resolve => require(['../components/user/list'], resolve) },
				{ path: 'changeR/:id', component: resolve => require(['../components/user/changeR'], resolve) },
				{ path: 'changeD/:id', component: resolve => require(['../components/user/changeD'], resolve) }
			],
			beforeEnter: (to, from, next) => {
				if(sessionStorage.getItem("user")){
					next()
				}else{
					next(from)
				}
			}
		},
		{
			path: '/admin',
			component: home,
			children: [
				{ path: '', component: resolve => require(['../components/admin/index'], resolve) },
				{ path: 'detail/:id', component: resolve => require(['../components/admin/detail'], resolve) },
				{ path: 'edit/:id', component: resolve => require(['../components/admin/edit'], resolve) },
				{ name: 'users', path: 'users', component: resolve => require(['../components/admin/list'], resolve) },
				{ path: 'departments', component: resolve => require(['../components/admin/department'], resolve) },
				{ path: 'addDepartments', component: resolve => require(['../components/admin/addDepartment'], resolve) },
				{ path: 'departmentVerify', component: resolve => require(['../components/admin/departmentVerify.vue'], resolve) },
				{ path: 'registerVerify', component: resolve => require(['../components/admin/registerVerify'], resolve) },
				{ path: 'roleVerify', component: resolve => require(['../components/admin/roleVerify'], resolve) }
			],
			beforeEnter: (to, from, next) => {
				if(sessionStorage.getItem("user")){
					if(JSON.parse(sessionStorage.getItem("user")).isAdmin){
						next()
					}else{
						next(from)
					}
				}else{
					next(from)
				}
			}
		},
		{
			path: '/404',
			component: home,
			children: [
				{ path: '', component: resolve => require(['../components/common/404'], resolve) }
			]
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
})
