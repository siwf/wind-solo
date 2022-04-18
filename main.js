import Vue from 'vue'
import store from './store'
import App from './App'
import util from './config/util'
import w_md5 from "./config/md5.js"
import tools from '@/config/tools'
import * as request from './config/api'
import { router } from './router'  //路径换成自己的

// 挂载变量
import { IMG_URL, BASE_URL } from './env.js';
import uView from "uview-ui"; 
// import share from '@/mixins/share'

Vue.use(uView);
Vue.use(router)
// Vue.mixin(share)

const msg = (title, duration=2000, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
// const json = type=>{
// 	//模拟异步请求数据
// 	return new Promise(resolve=>{
// 		setTimeout(()=>{
// 			resolve(Json[type]);
// 		}, 500)
// 	})
// }
// 上几个页面
const prePage = (prePageLen = 2)=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - prePageLen];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
// 往回退几个页面
const prePageDelta = (delta = 1) => {
    uni.navigateBack({ delta })
}
// 跳转到我的页面
const repalceAllUser = () => {
	router.replaceAll('/pages/user/user')
}

Vue.config.productionTip = false
// 挂载工具函数
Vue.prototype.$md5 = w_md5;
Vue.prototype.$tools = tools;
Vue.prototype.$IMG_URL = IMG_URL;
Vue.prototype.$BASE_URL = BASE_URL;
Vue.prototype.$store = store;
Vue.prototype.$api = { msg, prePage, util, request, prePageDelta, repalceAllUser };


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()