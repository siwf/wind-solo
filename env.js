const env = 'sit'// 测试
// const env = 'pre' // 准生产
// const env = 'prd' // 生产


const base_url_qa = '' //后台根域名
const img_url_qa = '/static/image/home/'//全局网络图片地址变量，css背景图片地址变量在uni.scss

const base_url_pre = ''
const img_url_pre = '/static/image/home/'


const base_url_prd = '' //后台根域名
const img_url_prd = '/static/image/home/'//全局网络图片地址变量，css背景图片地址变量在uni.scss


let API_URL = ''
let BASE_URL = ''
let IMG_URL = ''


if (env === 'sit') {
    BASE_URL = base_url_qa
    IMG_URL = img_url_qa
} else if (env === 'prd') {
    BASE_URL = base_url_prd
    IMG_URL = img_url_prd
} else if (env === 'pre') {
    BASE_URL = base_url_pre
    IMG_URL = img_url_pre
}

API_URL = `${BASE_URL}siwenfeng-wechat-api/`

export {
    API_URL,
    BASE_URL,
    IMG_URL,
}