/*
 * @Description: 
 * @Autor: siwenfeng
 * @Date: 2021-10-29 14:16:06
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-12 09:35:41
 */
import { noPassByName } from '@/config/util'
const getters = {
    hasLogin: state => state.user.hasLogin,
    userInfo: state => state.user.userInfo,
    clientName: state => noPassByName(state.user.userInfo.clientName)
  }
  export default getters