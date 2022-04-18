const env = 'sit'// 测试
// const env = 'pre' // 准生产
// const env = 'prd' // 生产


const base_url_qa = 'https://qa4wealth-wechat-api.hfax.com/' //后台根域名
const img_url_qa = 'https://cdn.nwm-wechat.hfax.com/wechat/'//全局网络图片地址变量，css背景图片地址变量在uni.scss

const base_url_pre = 'https://prewealth-wechat-api.hfax.com/'
const img_url_pre = 'https://cdn.nwm-wechat.hfax.com/wechat/'


const base_url_prd = 'https://nwm-wechat.hfax.com/' //后台根域名
const img_url_prd = 'https://cdn.nwm-wechat.hfax.com/wechat/'//全局网络图片地址变量，css背景图片地址变量在uni.scss


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

API_URL = `${BASE_URL}wealth-wechat-api/`

export {
    API_URL,
    BASE_URL,
    IMG_URL,
}