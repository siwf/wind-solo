
import {
	API_URL
} from '@/env';
import Auth from '@/permission/index.js';
const BASEURL = API_URL;

async function uploadImage() {
	let authState = 0;
	authState += await new Auth('writePhotosAlbum').check();
	if (authState < 1) return;
	authState += await new Auth('camera').check();
	if (authState < 2) return;
	return new Promise((resolve, reject) => {
		
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				if (res.tempFiles.length > 0) {
					const tempFilePaths = res.tempFiles[0].path
					const size = res.tempFiles[0].size
					if (size < 10485760) {
						uni.showLoading({
							title:'上传中'
						})
						let preUrl = tempFilePaths
						uni.uploadFile({
							url: BASEURL + 'file/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths,
							header: {
								"Content-Type": "multipart/form-data",
								Accept: "application/json",
								"Hfax-Auth-Token": uni.getStorageSync("userToken"),
							},
							name: 'file',
							// formData: {
							// 	'user': 'test'
							// },
							success(res) {
								if (res.statusCode == 500) {
									uni.showToast({
										title: '图片上传失败',
										icon: 'none'
									})
									reject('失败')
								} else {
									uni.showToast({
										title: '图片上传成功',
										icon: 'success'
									})
									if (res.data) {
										let url = JSON.parse(res.data).data.url
										resolve({
											preUrl, // 预览地址
											// imageurl, // 图片地址
											url // 后台返回的文件id
										})
									}

								}
							}
						})
					} else {
						uni.showToast({
							title: '超出限制大小',
							icon: "none"
						})
					}
				} else {
					uni.showToast({
						title: '文件不存在',
						icon: "none"
					})
				}
			}
		})
	})
}

function uploadPdf() {
	return new Promise((resolve, reject) => {
		uni.chooseMessageFile({
			count: 1,
			type: 'file',
			success(res) {
				if (!checkFileExt(res.tempFiles[0])) {
					return
				}
				if (res.tempFiles.length > 0) {
					if (res.tempFiles[0].size < 10485760) {
						uni.showLoading({
							title:'上传中'
						})
						let preName = res.tempFiles[0].name
						let preUrl =  res.tempFiles[0].path
						uni.uploadFile({
							url: BASEURL + 'file/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFiles[0].path,
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data",
								Accept: "application/json",
								"Hfax-Auth-Token": uni.getStorageSync("userToken"),
							},
							// formData: {
							// 	'user': 'test'
							// },
							success(res) {
								if (res.statusCode != 500) {
									uni.showToast({
										title: '文件上传成功',
										icon: 'success'
									})
									if (res.data) {
										let url = JSON.parse(res.data).data.url
										resolve({
											preUrl,
											url // 后台返回的文件Id
										})
									} else {
										reject('失败')
									}

								} else {
									uni.showToast({
										title: '服务器错误',
										icon: 'none'
									})
								}
							}
						})
					} else {
						uni.showToast({
							title: '超出限制大小',
							icon: "none"
						})
						return
					}
				} else {
					uni.showToast({
						title: '文件不存在',
						icon: "none"
					})
				}

			}
		})
	})
}

// 判断文件后缀是否允许
function checkFileExt(file) {
	// 检查是否在允许的后缀中
	let noArrowExt = false;
	// 获取后缀名
	let fileExt = '';
	const reg = /.+\./;
	// 如果是H5，需要从name中判断
	// #ifdef H5
	fileExt = file.name.replace(reg, "").toLowerCase();
	// #endif
	// 非H5，需要从path中读取后缀
	// #ifndef H5
	fileExt = file.path.replace(reg, "").toLowerCase();
	// #endif
	// 使用数组的some方法，只要符合limitType中的一个，就返回true
	noArrowExt = ['pdf'].some(ext => {
		// 转为小写
		return ext.toLowerCase() === fileExt;
	})
	if(!noArrowExt) uni.showToast({	title: `不允许选择${fileExt}格式的文件`,icon: "none" })
	return noArrowExt;
}

module.exports = {
	uploadImage,
	uploadPdf
}
