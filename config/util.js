
import * as request from '@/config/api'
//验证登录密码
export function validatePassword(password) {
    // const reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/
    const reg = /(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/
    return reg.test(password)
}
// 删除中文和中文符号
export function validatePasswordDel(str) {
    return str.toString().replace(/[\u4e00-\u9fa5]|[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig,'')
}
// 银行卡号只能是8-20位的数字
export function validateBankCard(str) {
    const reg = /^[0-9]{8,20}$/
    return reg.test(str);
}
// //验证短信验证格式
// const validateVerificationCode = (password) => {
// 	return password.match(/^[0-9]{6}$/) != null;
// }
const isWeiXinBrowser = () => {
    // #ifdef H5
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
    // #endif

    return false
}

// 去除空格
const trim = (str, is_global) => {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global && is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};
// 验证手机号
export function validateMobileNo(str) {
    // 支持166及199等手机号
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return reg.test(trim(str, "g"));
}
// 手机号脱敏
export function mobileEncrypt(str) {
    const reg = /(\d{3})\d*(\d{4})/
    return str.replace(reg, '$1****$2');
}
// 邮箱校验
export function validateEamil(str) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(str)
}
// 身份证号验证
export function validateCard(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(str);

}
// 身份证姓名验证 只能是汉字和特殊字符
export function validateCardName(text) {
    const Reg = /^[\u4e00-\u9fa5a-zA-Z·•]{2,30}$/;
    const test = Reg.test(text);
    if (test) {
        if (
            text[0] !== "·" &&
            text[0] !== "•" &&
            text[text.length - 1] !== "·" &&
            text[text.length - 1] !== "•"
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function showToast(message) {
    uni.showToast({
        title: message,
        icon: "none",
    });
}
// 字典数据初始化
//funckey 为 positionList 获取职业信息字典
// cityTree 获取省市树状结构
// loadDictMap 基础字典数据
// bankList 银行卡列表
/**
 * 
 * @param {*} funckey utils下面定义的函数名称
 */
export function dictCacheInit(funckey) {

    return new Promise((resolve, reject) => {
        // 如果一直存在storage字典更新了 接口不会请求
        // const data = getStorageCache(funckey);
        // if (data) {
        //     resolve(data)
        // } else {
            (request[funckey])().then(res => {
                if (res.code === '0') {
                    setStorage(funckey, res.data)
                    resolve(res.data)
                } else {
                    showToast(res.msg)
                }
            }).catch(err => {
                reject(err)
            })
        // }
    })

}

// 姓名脱敏
export function noPassByName(str){
    if(null != str && str != undefined){
      return new Array(str.length).join("*")+str.substr(str.length-1, 1) ;
    } else {
      return "";
    }
    
}

/**
 * 图片预览
 */
export function previewImage(urls) {
    uni.previewImage({
      urls: [urls],
      current: 0,
      success: () => {},
      fail: () => {
        uni.showToast({
          title: "预览图片失败",
          icon: "none",
        });
      },
    });
}
// 分转元
export const regFenToYuan = (fen) =>{
    var num = fen;
    num = fen*0.01;
    num += '';
    var reg = num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
    num = num.replace(reg,'$1');
    num = toDecimal2(num)
    return num
}
// 强制保留两位小数
export const toDecimal2 = (x) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
}
// 金钱格式化
export const fmoney = (s, n = 2) => {
    s = regFenToYuan(s)
/*
    * 参数说明：
    * s：要格式化的数字
    * n：保留几位小数
    * */
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
 export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = [...arguments];
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        const callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
      }
      else {
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait);
      }
    }
  }
 /**
  * 同步清除token，同步是为了避免我的页面显示未实名后，又显示未登录
  */
export function removeToken() {
    uni.removeStorageSync('userToken')
}
/**
 * 同步缓存token
 * @param {} tokenId 
 */
export function setToken(tokenId) {
    uni.setStorageSync('userToken', tokenId);
}
/**
 * 同步settoken
 * @returns 
 */
export function getToken() {
    return uni.getStorageSync("userToken")
}

/**
 * 
 */
export function setStorage(key, data, sync = false) {
    sync ? uni.setStorage({ key,  data  }) : uni.setStorageSync(key, data)
}
/**
 * 同步
 * @param {*} key 
 * @returns 
 */
export function getStorage(key) {
    return uni.getStorageSync(key)
}
export function removeStorage(key) {
    uni.removeStorage({key})
}

export async function getUserAge() {
    const res = await request['checkAge']();
    let age = null
    if (res.code === '0') {
        age = res.data.age;
    } else {
        showToast(res.msg)
    }
    return age;
}
export default {
    isWeiXinBrowser,
    mobileEncrypt,
    validateEamil,
    dictCacheInit,
    fmoney,
    noPassByName,
    validateCard,
    previewImage,
    validatePasswordDel,
    validateMobileNo,
    validatePassword,
    debounce,
    setToken,
    removeToken,
    getToken,
    setStorage,
    getStorage,
    removeStorage,
    validateBankCard,
    getUserAge
}
