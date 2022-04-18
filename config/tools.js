/*
 * @Description: 
 * @Autor: siwenfeng
 * @Date: 2021-10-26 18:10:45
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-10-27 09:11:54
 */
import {
	router
} from '@/router'
export default {

	/**
	 * 跳转再封装,主要是为了兼容外链。
	 * @param {String} path - 跳转路径
	 * @param {isTabbar} isTabbar - 是否是底部导航
	 */
	routerTo(path, isTabbar, replace = false) {
		if (path) {
			// 是否跳转外部链接
			if (~path.indexOf('http') || ~path.indexOf('www')) {
				// #ifdef H5
				window.location = path;
				// #endif
				// #ifndef  H5
                if (!replace) {
                    router.push({
                        path: '/pages/content/webView',
                        query: {
                            'webviewPath': path
                        }
                    })
                } else {
                    router.replace({
                        path: '/pages/content/webView',
                        query: {
                            'webviewPath': path
                        }
                    })
                }
				// #endif
				return false
			}
			if (isTabbar) {
				router.replaceAll(path)
			} else {
				path.includes('/pages/index') && !path.includes('/pages/index/view') ? router.pushTab(path) : router
					.push(path)
			}

		} else {
			console.log(`%cerr:没有填写跳转路径`, 'color:green;background:yellow');
		}
	}
}
