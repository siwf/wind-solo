<!--
 * @Description: 我的页面入口
 * @Autor: siwenfeng
 * @Date: 2021-10-12 16:29:22
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 11:39:27
-->
<template>
  <view>
    <f-my-baseinfo ></f-my-baseinfo>
    <view class="u-p-x-32">
      <f-my-cell />
    </view>
    <uni-bottom-footer />
  </view>
</template>

<script>
import FMyBaseinfo from './components/f-my-baseinfo.vue'
import FMyCell from './components/f-my-cell.vue'
import { getToken } from '@/config/util'
export default {
  components: {
    FMyBaseinfo,
    FMyCell
  },
  data() {
    return {}
  },
  onShow() {
    getToken() && this.$store.dispatch("GetInfo").then().catch(err => {})
  }
}
</script>
