<!--
 * @Description: 首页入口
 * @Autor: siwenfeng
 * @Date: 2021-10-12 16:29:22
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 11:02:55
-->
<template>
  <view class="">
    <!-- <view class="f-navbar-bg"></view> -->
    <u-no-network @retry="init"></u-no-network>
    <template v-if="isConnected && isRefresh">
      <uni-top-navbar>
      <view class="f-nav-title u-p-l-32">温风点火</view>
    </uni-top-navbar>
    <f-home-swiper />
    <view class="u-p-x-32 u-p-t-24">
      <uni-notice-bar :list="noticeList" />
      <f-home-list />
    </view>
    </template>
    <uni-bottom-footer />
  </view>
</template>

<script>
import FHomeList from "./components/f-home-list.vue";
import FHomeSwiper from "./components/f-home-swiper";
import share from '@/mixins/share'
export default {
  mixins: [share],
  components: {
    FHomeSwiper,
    FHomeList,
  },
  data() {
    return {
      isRefresh: true,
      isConnected: true, // 是否有网
      noticeList: ["欢迎来到温风点火影院！"],
    };
  },
  onLoad(e) {
    console.log(e);
  },
  onShow() {
    uni.onNetworkStatusChange((res) => {
      this.isConnected = res.isConnected;
    });
    uni.getNetworkType({
      success: (res) => {
        res.networkType == "none"
          ? (this.isConnected = false)
          : (this.isConnected = true);
      },
    });
  },
  methods: {
    		// 初始化
		init() {
			this.isRefresh = false;
			// return 
      // Promise.all([this.getTemplate()]).then(() => {
				uni.stopPullDownRefresh();
				this.isRefresh = true;
			// });
		}
  }
};
</script>

<style scoped lang="scss">
// .f-navbar-bg {
//   height: 322rpx;
//   background: #3C276F;
//   position: absolute;
//   width: 100%;
// }
.f-nav-title {
  text-align: left;
  width: 100%;
  height: 44rpx;
  line-height: 44rpx;
  font-size: $font-lg;
  font-weight: 600;
  color: $font-color-warning;
}
</style>