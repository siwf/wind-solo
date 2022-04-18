<!--
 * @Description: 首页轮播图组件
 * @Autor: siwenfeng
 * @Date: 2021-10-13 17:15:35
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 10:56:56
-->
<template>
  <view class="f-home-swiper u-flex-col u-m-b-24 u-p-b-58">
    <view class="f-swiper-bottom"></view>
    <view class="f-swiper-wrap">
      <u-swiper :list="list" :height="224" indicator-pos="bottomRight" border-radius="16"></u-swiper>
    </view>
  </view>
</template>

<script>
import {
	IMG_URL
} from '@/env'
export default {
  data() {
    return {
      list: [
        {
          image: IMG_URL + "banner.jpg",
        },
        {
          image: IMG_URL + "banner.jpg",
        },
        {
          image: IMG_URL + "banner.jpg",
        },
      ],
    };
  },
};
</script>


<style scoped lang="scss">
.f-home-swiper  {
    position: relative;
}
.f-swiper-bottom {
  height: 190rpx;
  background: $page-bgColor-dark;
}
.f-swiper-wrap {
    position: absolute;
    top: 36rpx;
    z-index: 11;
    width: 100%;
    padding: 0 32rpx;
}
</style>
