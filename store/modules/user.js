/*
 * @Description: 
 * @Autor: siwenfeng
 * @Date: 2021-10-29 14:10:05
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-30 16:58:03
 */
import { logout, getMyInfo, realNameStatus } from '@/config/api'
import { getToken, setToken, removeToken  } from '@/config/util';


const user = {
    state: {
        token: getToken(),
        hasLogin: false, // 是否已经登录
        userInfo: {},
    },
    mutations: {
        login(state, token) {
            state.hasLogin = true;
            state.token = token
            setToken(token);
            // state.userInfo = userinfo;
            // uni.setStorage({//缓存用户登陆状态
            //     key: 'userInfo',
            //     data: userinfo
            // })
            // console.log(state.userInfo);
        },
        logOut(state) {
            state.hasLogin = false;
            state.userInfo = {};
            state.token = ''
            // uni.removeStorage({
            //     key: 'userInfo'
            // })
            removeToken()
        },
        // 更新用户信息
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
            // uni.setStorage({//缓存用户登陆状态
            //     key: 'userInfo',
            //     data: userinfo
            // })
        }
    },

    actions: {
        LogOut({ commit }) {
            // debugger
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    logOut(commit)
                    resolve()
                }).catch(err => {
                    logOut(commit)
                    reject(err)
                })
            })
        },
        // 获取用户信息并更新
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getMyInfo({}, true).then(res => {
                    commit('login', getToken())
                    commit('SET_USER_INFO', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 未登录状态下实名认证状态
        RealNameStatus({ commit }, param = {}) {
            return new Promise((resolve, reject) => {
                realNameStatus(param).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
export const logOut = (commit) => {
    commit('logOut')
  }
export default user
