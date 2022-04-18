import {
	API_URL
} from '@/env'
import store from '@/store'
/**
 * 生产随机id
 * @param {*} randomFlag 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
const generateUuid = (randomFlag, min, max) => {
	var str = '',
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	//随机产生
	if (randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for (var i = 0; i < range; i++) {
		var pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos]
	}
	return str;
}
// 需要登陆的，都写到这里，否则就是不需要登陆的接口
const methodsToken = [
	'client/realName/info',
	'client/getMyInfo',
	'client/register/bindInviteCode',
	'logout',
	'client/investCertList',
	'client/realName/recognition',
	'client/realName/submit',
	'client/bankCardList',
	'index/getBankInfo',
	'invest/assetSummary',
	'client/submitClientBankIdentify',
	// 'client/realName/status', // 用户可能在未登录的状态下，所以这个接口免登录
	'client/getBankInfo',
	'client/submitRiskInfo',
	'client/getInvestCertInfo',
	'invest/holdCurrentList',
	'invest/holdHistoryList',
	'client/submitWechatClientInvestCertFirst',
  	'client/getRiskInfo',
	'client/submitWechatClientInvestCertSecond',
	'client/changePassword/enterOldPassword',
	'client/changePassword/submitNewPassword',
	'client/getClientAge'
];
/**
 * 统一接口请求封装
 * @param {*} url 
 * @param {*} data 
 * @param {*} hideLoading 
 * @param {*} method 
 * @returns 
 */
const post = (url, data, hideLoading, method = 'POST') => {
	//请求头header信息
	var postDataHeader = {
		transId: generateUuid(false, 32),
		timeStamp: new Date().getTime(),
		ip: '0.0.0.0'
	};
	//请求头body信息
	var postDataBody = data;
	// 判断token是否存在
	return new Promise((resolve, reject) => {
		if (methodsToken.indexOf(url) >= 0) {
			// 获取用户token
			let userToken = uni.getStorageSync("userToken");
			if (!userToken) {
				uni.navigateTo({
					url: '/pages/public/login'
				})
				reject()
				return false;
			} else {
				//将tokenId置于请求头信息
				postDataHeader['Hfax-Auth-Token'] = userToken;
			}
		}
		var postData = {
			header: postDataHeader,
			body: postDataBody
		}
		//如果调用接口不明确指明不显示loading
		if (!hideLoading) {
			uni.showLoading({
				//title: '加载中'
			});
		}
		console.log('请求发送-----------', url, postData.header, method, postData.body ? postData.body : {} )

		uni.request({
			url: API_URL + url,
			data: postData.body,
			header: postData.header,
			method: method || 'POST',
			success: (response) => {
				if (!hideLoading) {
					uni.hideLoading();
				}
				if (response.statusCode === 200) {
					// debugger
					const result = response.data
					if (result.code !== '0') {
						// 登录信息过期
						if (result.code === '510000') {
							uni.removeStorageSync('userToken')
							uni.showToast({
								title: result.msg,
								icon: 'none',
								duration: 1000,
								complete: function () {
									setTimeout(function () {
										uni.hideToast();
										store.commit('logOut')
										uni.navigateTo({
											url: '/pages/public/login'
										})
									}, 500)
								}
							});
						}
					}
					resolve(response.data)
				} else {
					// 不等于200 
					reject(response)
				}
			},
			complete: (e) => {
				console.log('请求响应-----------', API_URL +　url, e.data)
				uni.hideLoading();
			},
			fail: (error) => {
				uni.hideLoading();
				if (error && error.response) {
					showError(error.response);
				}
				reject(error)
			},
		});
	})

}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function () {
			setTimeout(function () {
				uni.hideToast();
			}, 1000);
		}
	});
	return errorMsg
}

// 文件上传
export const uploadFiles = (callback) => {
	uni.chooseImage({
		success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			const uploadTask = uni.uploadFile({
				url: API_URL + 'api.html', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				fileType: 'image',
				name: 'file',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					'method': 'images.upload',
					'upfile': tempFilePaths[0]
				},
				success: (uploadFileRes) => {
					callback(JSON.parse(uploadFileRes.data));
				},
				fail: (error) => {
					if (error && error.response) {
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function () {
						uni.hideLoading();
					}, 250);
				}
			});
			// 					uploadTask.onProgressUpdate((res) => {
			//             console.log('上传进度' + res.progress);
			//             console.log('已经上传的数据长度' + res.totalBytesSent);
			//             console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			//
			//             // 测试条件，取消上传任务。
			//             if (res.progress > 50) {
			//                 uploadTask.abort();
			//             }
			// 					});
		}
	});
}

// 上传图片
export const uploadImage = (num, callback) => {
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: API_URL + 'uploadMediaFile',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'files',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function () {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}

/**
 * 
 * @param {*} 注册相关接口
 * @param {*} callback 
 * @param {*} hideLoading 
 * @returns 
 */

// 注册第一步：输入手机号
export const enterMobile = (data, hideLoading) => post('client/register/enterMobile', data, hideLoading);
// 注册第二步：提交滑块 验证通过后发送短信
export const verifyJigsaw = (data, hideLoading) => post('client/register/verifyJigsaw', data, hideLoading);
// 注册第三步：提交短信验证码， 验证码通过后返回token
export const verifySms = (data, hideLoading) => post('client/register/verifySms', data, hideLoading);
// 注册第四步：输入登录密码，提交注册
export const register = (data, hideLoading) => post('client/register/doRegister', data, hideLoading);
// 绑定理财师
export const bindInviteCode = (data, hideLoading) => post('client/register/bindInviteCode', data, hideLoading);

// 忘记密码第1步: 输入手机号
export const forgeEnterMobile = (data, hideLoading) => post('client/forget/enterMobile', data, hideLoading);
// 忘记密码第2步 提交滑块，验证通过后发送短信
export const forgetVerifyJigsaw = (data, hideLoading) => post('client/forget/verifyJigsaw', data, hideLoading);
// 忘记密码第3步: 提交短信验证码, 验证码通过后返回token
export const forgetVerifySms = (data, hideLoading) => post('client/forget/verifySms', data, hideLoading);
// 忘记密码第4步: 如果已经实名认证需要提交身份证号码
export const forgetVerifyCertNo = (data, hideLoading) => post('client/forget/verifyCertNo', data, hideLoading);
// 忘记密码第5步：提交新密码
export const updatePassword = (data, hideLoading) => post('client/forget/updatePassword', data, hideLoading);

// 修改密码第一步：输入原密码
export const enterOldPassword = (data, hideLoading) => post('client/changePassword/enterOldPassword', data, hideLoading);
// 修改密码第二部：输入新密码
export const submitNewPassword = (data, hideLoading) => post('client/changePassword/submitNewPassword', data, hideLoading);


/**
 * 
 * @param {*} data 登录
 * @param {*} callback 
 * @param {*} hideLoading 
 * @returns 
 */
export const login = (data, hideLoading) => post('login', data, hideLoading);
// 用户主动登出
export const logout = (data, hideLoading) => post('logout', data, hideLoading);

// 获取客户实名认证信息(全)
export const info = (data, hideLoading) => post('client/realName/info', data, hideLoading, 'GET');
// 查询投资者认证信息
export const getInvestCertInfo = (data, hideLoading) => post('client/getInvestCertInfo', data, hideLoading, 'GET');

// 获取客户投资者认证信息列表
export const investCertList = (data, hideLoading) => post('client/investCertList', data, hideLoading, 'GET');

// 获取客户投资者认证信息
// export const getInvestCerInfo = (data, hideLoading) => post('client/getInvestCertInfo', data, hideLoading, 'GET');
// 获取用户个人信息
export const getMyInfo = (data, hideLoading) => post('client/getMyInfo', data, hideLoading, 'GET')
// 对身份证照片进行ocr认证
export const recognition = (data, hideLoading) => post('client/realName/recognition', data, hideLoading);
// 提交实名认证信息
export const realnameSubmit = (data, hideLoading) => post('client/realName/submit', data, hideLoading);


/**
 *  字典数据相关
 * @param {*} data 
 * @param {*} hideLoading 
 * @returns 
 */
// 获取职业信息字典
export const positionList = (data, hideLoading) => post('index/positionList', data, hideLoading, 'GET');
// 获取省市树状结构
export const cityTree = (data, hideLoading) => post('index/cityTree', data, true, 'GET');
// 加载基础字典
export const loadDictMap = (data, hideLoading) => post('index/loadDictMap', data, hideLoading, 'GET');
// 获取银行卡列表
export const bankList = (data, hideLoading) => post('index/bankList', data, true, 'GET');
// 当前持仓列表
export const holdCurrentList = (data, hideLoading) => post('invest/holdCurrentList', data, hideLoading, 'GET');
//历史持仓列表
export const holdHistoryList = (data, hideLoading) => post('invest/holdHistoryList', data, hideLoading, 'GET');
// 客户总资产信息
export const assetSummary = (data, hideLoading) => post('invest/assetSummary', data, hideLoading, 'GET');
// 实名认证-用户的实名认证状态
export const  realNameStatus = (data, hideLoading) => post('client/realName/status', data, hideLoading);


/**
 * 银行卡相关接口
 * @param {*} data 
 * @param {*} hideLoading 
 * @returns 
 */

// 我的银行卡
export const bankCardList = (data, hideLoading) => post('client/bankCardList', data, hideLoading, 'GET');
// 根据银行卡号获取银行卡信息
export const getBankInfo = (data, hideLoading) => post('client/getBankInfo', data, hideLoading, 'GET');
// 提交银行卡并进行认证
export const submitClientBankIdentify = (data, hideLoading) => post('client/submitClientBankIdentify', data, hideLoading)

/**
 * 风险评测相关接口
 * @param {*} data 
 * @param {*} hideLoading 
 * @returns 
 */

// 提交我的风险评测信息
export const submitRiskInfo = (data, hideLoading) => post('client/submitRiskInfo', data, hideLoading)
// 获取客户实名认证信息(全)
export const realNameInfo = (data, hideLoading) => post('client/realName/info', data, hideLoading, 'GET')
// 获取我的风险评测信息
export const getRiskInfo = (data, hideLoading) => post('client/getRiskInfo', data, hideLoading, 'GET')

/**
 * 投资者认证信息提交
 * @param {*} data 
 * @param {*} hideLoading 
 * @returns 
 */
export const submitWechatClientInvestCertFirst = (data, hideLoading) => post('client/submitWechatClientInvestCertFirst', data, hideLoading)
export const submitWechatClientInvestCertSecond = (data, hideLoading) => post('client/submitWechatClientInvestCertSecond', data, hideLoading);

/**
 * 校验年龄
 */
export const checkAge = (data, hideLoading) => post('client/getClientAge', data, true, 'GET');
