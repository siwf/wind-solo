/*
 * @Description: 统一路由拦截
 * @Autor: siwenfeng
 * @Date: 2021-10-12 17:36:12
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-17 11:00:14
 */
import { createRouter } from 'uni-simple-router';
import { getToken } from '@/config/util'
import store from '@/store'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	// 暴力解锁
	detectBeforeLock: (router, to, navType) => {
		router.$lockStatus = false;
	},
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	const tokenId = getToken()
	if (tokenId) {
		next()
	} else {
		// 不在免登录名单
		if (to.meta && to.meta.auth) {
			store.commit('logOut')
			next({ path: '/pages/public/login' })
		} else {
		//  免登录
			next()
		}
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router
}